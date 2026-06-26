# irion-contracts-canton

The Irion BNPL protocol as **Daml templates** for **Canton Network**. Migrated
from the Stellar/Soroban + Circom-ZK build (preserved at the `stellar-final` git
tag); see [`../CANTON_MIGRATION.md`](../CANTON_MIGRATION.md) for the full scope.

## What it is

A "Buy Now, Pay Never" BNPL + lend/borrow protocol:

- **Lending pool** — suppliers deposit USDC, receive yield-bearing shares
  (ERC-4626-style, with the donation-attack guard ported).
- **BNPL** — collateral is locked, the merchant is paid up front from the pool,
  the borrower repays (or yield does — "pay never").
- **Private credit** — a trusted issuer **signs** a `CreditAttestation`; Canton's
  sub-transaction privacy keeps the borrower's financials visible only to the
  borrower and the protocol. **This replaces the Stellar Groth16/BN254 ZK proof
  entirely** — no circuit, no verifier, no prover.
- **Unsecured market** — borrow with no collateral, gated on an attested
  `score >= 600`.

## Layout

```
model/        irion-model package — the templates
  daml/Irion/{Token,Config,Credit,Pool,Bnpl,Types}.daml
model-tests/  irion-model-tests package — Daml Script tests
scripts/e2e.mjs   full end-to-end flow over the JSON Ledger API (no Daml Script)
codegen-ts/   generated TypeScript bindings (dpm codegen-js)
```

| Module | Templates |
|---|---|
| `Irion.Token` | `Token` (USDC holding: transfer / split / merge) |
| `Irion.Config` | `ProtocolConfig` (params + trusted issuer party) |
| `Irion.Credit` | `CreditProfile`, `CreditAttestation` (the ZK replacement) |
| `Irion.Pool` | `LendingPool`, `PoolShare`, `SupplyRequest`, `WithdrawRequest` |
| `Irion.Bnpl` | `Loan`, `MerchantPayment`, `BnplRequest`, `UnsecuredRequest` |

## Build & test

```bash
dpm build --all              # compile both packages to DARs
cd model-tests && dpm test   # 9 Daml Script tests

# run the scenarios / e2e against a real Canton ledger:
dpm sandbox &                # Canton on :6865 (gRPC) / :6864 (JSON)
dpm script --dar model-tests/.daml/dist/irion-model-tests-1.0.0.dar \
  --all --skip-script-name Test.Irion.Bnpl:test_default_seizes_collateral \
  --ledger-host localhost --ledger-port 6865 --upload-dar true --wall-clock-time
node scripts/e2e.mjs         # full flow over the JSON Ledger API
```

All 9 tests pass; 8 scenarios + the JSON-API e2e are verified on a live Canton
ledger. `test_default_seizes_collateral` uses `passTime`, so it needs a
static-time ledger (it passes under `dpm test`).

## Notes

- **Authority model:** a `Loan` is co-signed by `operator` + `borrower`, so a
  loan choice carries the operator's authority to update the operator-signed
  pool/profile. User actions that touch protocol contracts are operator-mediated
  (the backend co-submits) — the cn-quickstart pattern.
- **Custody:** the operator custodies pooled USDC as `Token` holdings; the
  `LendingPool` is the operator-signed internal ledger (same abstraction the
  Soroban contract used).
