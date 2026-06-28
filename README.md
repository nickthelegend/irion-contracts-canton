<div align="center">

# irion-contracts-canton

### The Daml protocol behind Irion — _Buy Now, Pay Never._

**Private consumer credit + B2B neobank infrastructure on the [Canton Network](https://www.canton.network/).**

</div>

---

## What it is

This repo is **the on-ledger core** of [Irion](https://github.com/nickthelegend): a private
"Buy Now, Pay Never" BNPL + lend/borrow + private-credit protocol, written as
[Daml](https://www.digitalasset.com/developers) smart contracts for the Canton Network.

It is the protocol that **every other repo runs against.** The consumer app, the merchant +
neobank console, the Meridian reference neobank, and the B2B API all ultimately submit
transactions to these templates — there is no second ledger and nothing in the money path is
faked. The contracts implement:

- **Lending pool** — suppliers deposit a stablecoin and receive yield-bearing shares
  (ERC-4626-style, with the classic donation-attack guard).
- **BNPL** — collateral is locked, the merchant is paid up front out of the pool, and the
  borrower repays over time (or yield does — _"pay never"_).
- **Private credit** — a trusted issuer **signs** a credit attestation; Canton's per-party
  visibility keeps the borrower's financials private to the borrower and the operator. **This
  replaces a zero-knowledge proof entirely** — no circuit, no verifier, no prover.
- **Unsecured market** — borrow with no collateral, gated on an attested credit score.
- **Multi-currency by issuer party** — USDC / EURC / GBPC are distinct token *issuers*, so
  multi-currency, FX, and payroll need **no template change**.

## Privacy by construction

Irion does not bolt privacy on; it inherits it from Canton.

> A Daml contract is visible **only to its signatory and observer parties.** The synchronizer
> that orders transactions sees only encrypted commitments — never the contract contents,
> balances, or counterparties.

Concretely, a `CreditProfile` is signed by the `operator` and observed only by the `borrower`,
so a borrower's score, limit, and repayment history are invisible to everyone else on the
network — including the validators that sequence the transaction. This is what lets Irion offer
**real financial privacy without ZK machinery**: the ledger model itself is the privacy layer.

## The protocol — five modules

All templates live under [`model/daml/Irion/`](model/daml/Irion).

| Module | Key templates & choices | Privacy note |
|---|---|---|
| **`Token.daml`** | `Token` (IOU-pattern holding) · `Token_Transfer`, `Token_Split`, `Token_Merge` | Signatory **issuer**, observer **owner**. **Currency = issuer party**, so USDC/EURC/GBPC are distinct issuers — multi-currency with no template change. |
| **`Pool.daml`** | `LendingPool`, `PoolShare`, `SupplyRequest` (`_Accept`/`_Reject`), `WithdrawRequest` (`_Accept`), `Pool_InjectYield` | Share/NAV yield accounting with an ERC-4626-style donation guard. The pool is the operator-signed internal ledger of pooled liquidity. |
| **`Bnpl.daml`** | `Loan` (`_Pay`/`_ReleaseCollateral`/`_Default`), `BnplRequest`, `UnsecuredRequest`, `MerchantPayment` | `UnsecuredRequest` is **score-gated** at the unsecured credit gate. A `Loan` is co-signed by `operator` + `borrower`. |
| **`Credit.daml`** | `CreditProfile`, `CreditAttestation` (`Attestation_Apply`) | The **ZK replacement.** `CreditProfile` is signatory `operator`, observer `borrower` — **private**. `CreditAttestation` is replay-guarded and trusted-issuer-checked. |
| **`Config.daml`** | `ProtocolConfig` (`Config_Update`) | Protocol parameters: interest rates, credit gates, minimum pool liquidity, and the trusted-issuer party. |

The Daml Script suite in [`model-tests/`](model-tests) covers **happy + adversarial** paths:
token lifecycle; the full BNPL lifecycle; an unsecured draw gated on score; a default that seizes
collateral; an attestation lifting a credit limit; an **untrusted issuer being rejected**;
supply / withdraw with yield; the **donation-attack guard**; and a rejected supply that refunds
the supplier.

## Building & testing

You need **`dpm`** (Daml Package Manager, SDK **3.5.1**) and **JDK 17**.

```bash
# Compile both packages to DARs
dpm build --all

# Run the Daml Script test suite (happy + adversarial)
cd model-tests && dpm test

# Or run the scenarios + end-to-end flow against a real Canton ledger:
dpm sandbox &        # Canton — gRPC on :6865, JSON Ledger API on :6864
node scripts/e2e.mjs # full BNPL/supply/credit flow over the JSON Ledger API
```

> [!NOTE]
> **The DAR is pre-built and checked in.** `irion-model-1.0.0.dar` (and the test DAR) are
> committed under `*/.daml/dist/`, already uploaded to the ledger, so **running the Irion stack
> needs no Daml compiler at all** — `dpm` is only required to *rebuild* the contracts after a
> source change.

### How the apps consume it

Apps don't bundle the DAR — they reference contracts **by package name** against the version
uploaded to the ledger:

```
#irion-model:Irion.Bnpl:UnsecuredRequest
#irion-model:Irion.Token:Token
```

The operator party and other bootstrapped state live in the consuming repos' ledger state, and
the [B2B API](https://github.com/nickthelegend/irion-b2b-api) holds the operator party and
mediates all submissions. This **package-name + pre-built-DAR** pattern is the standard Canton
hackathon approach — the same shape the winning
[`cn-hackathon-darkpools`](https://github.com/digital-asset) reference ships with
(`#dark-pool:DarkPool:DarkPool` + a bootstrap file, no build required to run).

## Project layout

```
model/                          irion-model package — the protocol templates
  daml/Irion/
    Token.daml                  IOU-pattern multi-currency token
    Pool.daml                   lending pool, shares, supply/withdraw, yield
    Bnpl.daml                   loans, BNPL + unsecured requests, merchant payment
    Credit.daml                 private credit profile + signed attestations
    Config.daml                 protocol parameters
  .daml/dist/irion-model-1.0.0.dar          ← pre-built, uploaded to the ledger

model-tests/                    irion-model-tests package — Daml Script tests
  daml/Test/Irion/{Token,Credit,Pool,Bnpl}.daml
  .daml/dist/irion-model-tests-1.0.0.dar

scripts/e2e.mjs                 end-to-end flow over the JSON Ledger API
codegen-ts/                     generated TypeScript bindings (dpm codegen)
multi-package.yaml              builds both packages (SDK 3.5.1)
```

## Where this fits

`irion-contracts-canton` is the foundation of the Irion monorepo. Companion repos:

- **[irion-b2b-api](https://github.com/nickthelegend)** — the REST API over this ledger
  (consumer wallet + passkey B2B treasury / FX / payroll / lending); holds the operator party.
- **Consumer, merchant, neobank, storefront, and SDK frontends** — all submit through the
  B2B API to these templates.

---

<div align="center">
<sub>Part of <b>Irion</b> · private credit + B2B neobank infrastructure on the Canton Network.</sub>
</div>
