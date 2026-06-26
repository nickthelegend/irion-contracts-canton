// End-to-end Irion flow driven entirely over the Canton JSON Ledger API (v2).
// This is the real external-client path (what the frontend/backend use) — NOT
// Daml Script. It allocates parties, then runs the full protocol: supply →
// onboard → BNPL purchase → merchant paid up front → repay → release collateral
// → issuer attestation (the ZK replacement) → unsecured borrow.
//
//   node scripts/e2e.mjs            # against dpm sandbox JSON API on :6864
//
// Requires the irion-model DAR already uploaded to the ledger.

const API = process.env.IRION_API ?? 'http://localhost:6864';
const USER = process.env.IRION_USER ?? 'irion-e2e';
const PKG = '#irion-model';
const T = (mod, ent) => `${PKG}:${mod}:${ent}`;

const TID = {
  Token: T('Irion.Token', 'Token'),
  ProtocolConfig: T('Irion.Config', 'ProtocolConfig'),
  LendingPool: T('Irion.Pool', 'LendingPool'),
  SupplyRequest: T('Irion.Pool', 'SupplyRequest'),
  CreditProfile: T('Irion.Credit', 'CreditProfile'),
  CreditAttestation: T('Irion.Credit', 'CreditAttestation'),
  BnplRequest: T('Irion.Bnpl', 'BnplRequest'),
  UnsecuredRequest: T('Irion.Bnpl', 'UnsecuredRequest'),
  Loan: T('Irion.Bnpl', 'Loan'),
};

let nonce = 0;
const RUN = Date.now().toString(36);
const freshId = (p) => `${p}-${Date.now()}-${nonce++}`;

async function jpost(path, body) {
  const r = await fetch(API + path, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body),
  });
  const text = await r.text();
  let json; try { json = text ? JSON.parse(text) : {}; } catch { json = text; }
  if (!r.ok) {
    console.error(`POST ${path} -> ${r.status}`);
    console.error(typeof json === 'string' ? json : JSON.stringify(json, null, 2));
    throw new Error(`request to ${path} failed`);
  }
  return json;
}

const allocate = async (hint) =>
  (await jpost('/v2/parties', { partyIdHint: `${hint}${RUN}` })).partyDetails.party;

async function submit(actAs, commands, readAs = []) {
  const body = { commandId: freshId('cmd'), userId: USER, actAs, readAs, commands };
  return jpost('/v2/commands/submit-and-wait-for-transaction-tree', body);
}

const createCmd = (templateId, createArguments) => ({ CreateCommand: { templateId, createArguments } });
const exerciseCmd = (templateId, contractId, choice, choiceArgument = {}) =>
  ({ ExerciseCommand: { templateId, contractId, choice, choiceArgument } });

const createdEvents = (tx) =>
  Object.values(tx.transactionTree?.eventsById ?? {}).map((e) => e.CreatedTreeEvent?.value).filter(Boolean);

// contract ids consumed (archived) within this same transaction — e.g. the
// transient holding produced by a split and immediately transferred away.
const archivedIds = (tx) =>
  new Set(Object.values(tx.transactionTree?.eventsById ?? {})
    .map((e) => e.ExercisedTreeEvent?.value)
    .filter((v) => v && v.consuming)
    .map((v) => v.contractId));

// find the (first) STILL-LIVE contract of `entity` created in `tx` matching `pred(args)`
function created(tx, entity, pred = () => true) {
  const gone = archivedIds(tx);
  const c = createdEvents(tx).find((e) =>
    e.templateId.endsWith(':' + entity) && !gone.has(e.contractId) && pred(e.createArgument));
  if (!c) throw new Error(`expected a live created ${entity} in tx ${tx.transactionTree?.updateId}`);
  return c; // { contractId, createArgument, templateId }
}

async function mint(issuer, owner, amount) {
  const tx = await submit([issuer], [createCmd(TID.Token, { issuer, owner, amount })]);
  return created(tx, 'Token', (a) => a.owner === owner).contractId;
}
async function transfer(owner, tokenCid, newOwner) {
  const tx = await submit([owner], [exerciseCmd(TID.Token, tokenCid, 'Token_Transfer', { newOwner })]);
  return created(tx, 'Token', (a) => a.owner === newOwner).contractId;
}

const ok = (s) => console.log(`  ✓ ${s}`);

async function main() {
  console.log(`Irion end-to-end over the Canton JSON Ledger API @ ${API}\n`);

  console.log('1. allocate parties');
  const operator = await allocate('operator');
  const usdcIssuer = await allocate('usdcissuer');
  const creditIssuer = await allocate('creditissuer');
  const supplier = await allocate('supplier');
  const borrower = await allocate('borrower');
  const merchant = await allocate('merchant');
  ok(`operator / usdcIssuer / creditIssuer / supplier / borrower / merchant`);

  console.log('2. operator publishes config + opens the pool');
  const config = {
    usdcIssuer, creditIssuer,
    borrowInterestRate: '0.05', uncollatPremiumRate: '0.05',
    starterLimit: '50.0', maxCreditLimit: '100000.0',
    repayRewardRate: '0.10', minScoreUncollat: '600', minimumLiquidity: '1.0',
  };
  const configCid = created(await submit([operator], [createCmd(TID.ProtocolConfig, { operator, config })]), 'ProtocolConfig').contractId;
  let poolCid = created(await submit([operator], [createCmd(TID.LendingPool, {
    operator, usdcIssuer, totalShares: '0.0', available: '0.0', totalBorrowed: '0.0', minimumLiquidity: '1.0',
  })]), 'LendingPool').contractId;
  ok('ProtocolConfig + LendingPool created');

  console.log('3. supplier deposits 1000 USDC');
  const supTok = await mint(usdcIssuer, supplier, '1000.0');
  const escrowCid = await transfer(supplier, supTok, operator);          // into operator custody
  const supReq = created(await submit([supplier], [createCmd(TID.SupplyRequest, { operator, supplier, usdcIssuer, amount: '1000.0', escrowCid })]), 'SupplyRequest').contractId;
  const supTx = await submit([operator], [exerciseCmd(TID.SupplyRequest, supReq, 'SupplyRequest_Accept', { poolCid })]);
  poolCid = created(supTx, 'LendingPool').contractId;
  let operatorUsdc = escrowCid; // operator now custodies the 1000 USDC holding
  ok(`supplier got ${created(supTx, 'PoolShare').createArgument.shares} shares (1.0 locked as donation guard)`);

  console.log('4. operator onboards the borrower (starter line 50)');
  let profileCid = created(await submit([operator], [createCmd(TID.CreditProfile, {
    operator, borrower, creditLimit: '50.0', outstanding: '0.0', repaidTotal: '0.0', repayments: '0', score: '0',
  })]), 'CreditProfile').contractId;
  ok('CreditProfile opened');

  console.log('5. borrower opens a BNPL purchase: 40 financed, 50 collateral');
  const collatTok = await mint(usdcIssuer, borrower, '50.0');
  const collatEscrow = await transfer(borrower, collatTok, operator);
  const bnplReq = created(await submit([borrower], [createCmd(TID.BnplRequest, {
    operator, borrower, merchant, amount: '40.0', collateral: '50.0', collateralEscrowCid: collatEscrow, termSeconds: '86400',
  })]), 'BnplRequest').contractId;
  const bnplTx = await submit([operator], [exerciseCmd(TID.BnplRequest, bnplReq, 'BnplRequest_Accept', { poolCid, profileCid, configCid, merchantFundTokenCid: operatorUsdc })]);
  poolCid = created(bnplTx, 'LendingPool').contractId;
  profileCid = created(bnplTx, 'CreditProfile').contractId;
  const loanCid = created(bnplTx, 'Loan').contractId;
  const merchantPaid = created(bnplTx, 'Token', (a) => a.owner === merchant);
  operatorUsdc = created(bnplTx, 'Token', (a) => a.owner === operator).contractId; // 960 remainder
  ok(`merchant paid ${merchantPaid.createArgument.amount} USDC up front; loan owes ${created(bnplTx, 'Loan').createArgument.outstanding}`);

  console.log('6. borrower repays in full, reclaims collateral');
  const repayTok = await mint(usdcIssuer, borrower, '42.0');
  const repayTx = await submit([borrower, operator], [exerciseCmd(TID.Loan, loanCid, 'Loan_Pay', { payer: borrower, payTokenCid: repayTok, amount: '42.0', poolCid, profileCid, configCid })]);
  poolCid = created(repayTx, 'LendingPool').contractId;
  profileCid = created(repayTx, 'CreditProfile').contractId;
  const repaidLoan = created(repayTx, 'Loan');
  const relTx = await submit([borrower, operator], [exerciseCmd(TID.Loan, repaidLoan.contractId, 'Loan_ReleaseCollateral')]);
  const collatBack = created(relTx, 'Token', (a) => a.owner === borrower);
  ok(`loan ${repaidLoan.createArgument.status}; ${collatBack.createArgument.amount} collateral returned; credit line now ${created(repayTx, 'CreditProfile').createArgument.creditLimit}`);

  console.log('7. trusted issuer attests the borrower (the ZK replacement)');
  const attCid = created(await submit([creditIssuer], [createCmd(TID.CreditAttestation, { creditIssuer, operator, borrower, approvedLimit: '3800.0', score: '790' })]), 'CreditAttestation').contractId;
  const applyTx = await submit([operator], [exerciseCmd(TID.CreditAttestation, attCid, 'Attestation_Apply', { configCid, profileCid })]);
  profileCid = created(applyTx, 'CreditProfile').contractId;
  ok(`score lifted to ${created(applyTx, 'CreditProfile').createArgument.score}, limit ${created(applyTx, 'CreditProfile').createArgument.creditLimit}`);

  console.log('8. borrower draws UNSECURED credit (now that score >= 600)');
  const unsReq = created(await submit([borrower], [createCmd(TID.UnsecuredRequest, { operator, borrower, amount: '30.0', termSeconds: '86400' })]), 'UnsecuredRequest').contractId;
  const unsTx = await submit([operator], [exerciseCmd(TID.UnsecuredRequest, unsReq, 'UnsecuredRequest_Accept', { poolCid, profileCid, configCid, disburseTokenCid: operatorUsdc })]);
  const poolEv = created(unsTx, 'LendingPool');
  const profileEv = created(unsTx, 'CreditProfile');
  const borrowerCash = created(unsTx, 'Token', (a) => a.owner === borrower);
  ok(`borrower received ${borrowerCash.createArgument.amount} USDC unsecured; loan owes ${created(unsTx, 'Loan').createArgument.outstanding}`);

  console.log('\n=== final on-ledger state ===');
  const p = poolEv.createArgument, pr = profileEv.createArgument;
  console.log(`pool    : available=${p.available}  borrowed=${p.totalBorrowed}  shares=${p.totalShares}`);
  console.log(`profile : limit=${pr.creditLimit}  score=${pr.score}  outstanding=${pr.outstanding}  repayments=${pr.repayments}`);
  console.log(`merchant got ${merchantPaid.createArgument.amount} | borrower reclaimed ${collatBack.createArgument.amount} collateral + drew ${borrowerCash.createArgument.amount} unsecured`);
  console.log('\nEND-TO-END OK ✓  (every step was a real JSON Ledger API submission)');
}

main().catch((e) => { console.error('\nFAILED:', e.message); process.exit(1); });
