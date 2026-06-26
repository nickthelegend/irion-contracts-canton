# irion-contracts-canton

**The Irion protocol as Daml templates for the Canton Network — the on-ledger core of the BNPL + B2B stack.**

Migrated from the Stellar/Soroban + Circom-ZK build (preserved at the `stellar-final` git tag); see
[`../CANTON_MIGRATION.md`](../CANTON_MIGRATION.md) for the full scope.

## What it is

A "Buy Now, Pay Never" BNPL + lend/borrow + private-credit protocol. Every product surface in the
monorepo (consumer app, merchant console, Meridian neobank, the B2B API) ultimately submits to these
templates.

- **Lending pool** — suppliers deposit a stablecoin, receive yield-bearing shares (ERC-4626-style,
  with the donation-attack guard ported).
- **BNPL** — collateral is locked, the merchant is paid up front from the pool, the borrower repays
  (or yield does — "pay never").
- **Private credit** — a trusted issuer **signs** a `CreditAttestation`; Canton's sub-transaction
  privacy keeps the borrower's financials visible only to the borrower and the operator. **This
  replaces the Stellar Groth16/BN254 ZK proof entirely** — no circuit, no verifier, no prover.
- **Unsecured market** — borrow with no collateral, gated on an attested `score >= 600`.
- **Multi-currency by issuer party** — USDC/EURC/GBPC are distinct `Token` issuers; no template
  change is needed for multi-currency (the B2B API uses this for FX + payroll).

## Templates

| Module | Templates | Key choices |
|---|---|---|
| `Irion.Token` | `Token` (IOU-pattern stablecoin holding; currency = issuer party) | `Token_Transfer`, `Token_Split`, `Token_Merge` |
| `Irion.Config` | `ProtocolConfig` (params + trusted-issuer party) | — |
| `Irion.Credit` | `CreditProfile` (sig operator, obs borrower — private), `CreditAttestation` (replay-guarded, trusted-issuer-checked) | the ZK replacement |
| `Irion.Pool` | `LendingPool`, `PoolShare`, `SupplyRequest`, `WithdrawRequest` | `SupplyRequest_Accept/_Reject`; share/NAV yield + donation guard |
| `Irion.Bnpl` | `Loan`, `MerchantPayment`, `BnplRequest`, `UnsecuredRequest` | `Loan_Pay`, `Loan_ReleaseCollateral`, `Loan_Default` |
| `Irion.Types` | shared types | — |

## Layout

```
model/                 irion-model package — the templates
  daml/Irion/{Token,Config,Credit,Pool,Bnpl,Types}.daml
model-tests/           irion-model-tests package — Daml Script tests (Token/Credit/Pool/Bnpl)
scripts/e2e.mjs        full end-to-end flow over the JSON Ledger API (no Daml Script)
codegen-ts/            generated TypeScript bindings (dpm codegen-js)
multi-package.yaml     builds both packages (sdk-version 3.5.1)
```

## Prerequisites

- **`dpm`** (Daml Package Manager / SDK 3.5.1) and **JDK 17**.
- A `.dar` for each package is already built and checked into `*/​.daml/dist/`
  (`irion-model-1.0.0.dar`, `irion-model-tests-1.0.0.dar`), so the protocol can be uploaded to a
  ledger without rebuilding.

> **Note:** `dpm` is **not** on `PATH` on the current build machine, so the DAR can't be rebuilt
> here — anything that needs a *new* Daml choice is blocked until a rebuild is possible. Multi-currency,
> FX and payroll were built **without** a template change (separate issuer parties + batch transfers).

## Build & test

```bash
dpm build --all              # compile both packages to DARs
cd model-tests && dpm test   # the Daml Script suite

# run the scenarios / e2e against a real Canton ledger:
dpm sandbox &                # Canton on :6865 (gRPC) / :6864 (JSON)
dpm script --dar model-tests/.daml/dist/irion-model-tests-1.0.0.dar \
  --all --skip-script-name Test.Irion.Bnpl:test_default_seizes_collateral \
  --ledger-host localhost --ledger-port 6865 --upload-dar true --wall-clock-time
node scripts/e2e.mjs         # full flow over the JSON Ledger API
```

The Daml Script tests cover **happy + adversarial** paths — token lifecycle; BNPL lifecycle; unsecured
draw gated on score; default seizes collateral; an attestation lifting credit; an **untrusted issuer
rejected**; supply/withdraw with yield; the **donation-attack guard**; and a rejected supply refunding.
All pass; the scenarios + JSON-API e2e are verified on a live Canton ledger.
`test_default_seizes_collateral` uses `passTime`, so it needs a static-time ledger (it passes under
`dpm test`).

## Notes

- **Authority model:** a `Loan` is co-signed by `operator` + `borrower`, so a loan choice carries the
  operator's authority to update the operator-signed pool/profile. User actions that touch protocol
  contracts are operator-mediated (the backend co-submits) — the cn-quickstart pattern.
- **Custody:** the operator custodies pooled stablecoin as `Token` holdings; the `LendingPool` is the
  operator-signed internal ledger (same abstraction the Soroban contract used).
- **Privacy by construction:** a Daml contract is visible only to its signatory + observer parties;
  the synchronizer that orders txns sees only encrypted commitments.
