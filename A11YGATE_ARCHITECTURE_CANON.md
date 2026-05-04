# A11yGate™ Architecture Canon
_Version: 0.1 · Source: v1.2 Canonical Binder + Brand Book v3 + Release Hardening_
_Status: Constitutional — changes require decision log entry_

This document is the single source of truth for:
- How A11yGate relates to SealForge
- What a PAR is vs what a SealForge envelope is
- Registered vs Verified
- Claims policy
- The monitoring model

---

## 1. Two-Layer Architecture

```
A11yGate                         SealForge
──────────────────                ────────────────
Creates proof structure           Seals proof artifacts
Assigns gate states               Anchors SHA-256 of canonical record
Maintains registry                Issues verifiable credential
Manages waivers/exceptions        Provides cryptographic verification
Runs cron monitoring              Hosts transport envelope
```

**Rule:** A11yGate is the accessibility layer. SealForge is the verification layer.
They are distinct products that integrate, not the same product with two names.

---

## 2. PAR™ vs SealForge Envelope

```
PAR™ (Proof-of-Accessibility Record)      mprv:a11y_status (SealForge envelope)
────────────────────────────────────       ──────────────────────────────────────
Canonical record                           Transport wrapper
Human-readable                             Machine-readable
Lives in a11ygate_par_registry (D1)        Lives in SealForge / wallet ecosystems
Identified by AG-REG-YYYY-NNNN            Identified by sealforge.io/r/:id
schema: audit-report.schema.json v1.2     schema: SealForge transport v1.0
```

**Rule:** The PAR is the source of truth. The SealForge envelope seals a SHA-256 of the PAR.
If they conflict, the PAR canonical record wins.
JSON field: always include `"canonical_schema_version": "1.2"` in every PAR.

---

## 3. Registered vs Verified

| Status | Meaning | Who creates it |
|---|---|---|
| `registered` | Record exists. May be self-attested. | Organization or A11yGate |
| `verified` | A11yGate completed scoped review + gate state | A11yGate only |

**Registered does not mean Verified.**
This distinction must be visible everywhere a registry record is shown.

---

## 4. Gate States

```
pass | conditional_pass | fail | waived | expired
```

**No silent waivers.** Every `waived` record requires:
- `waiver_owner` (named individual or role)
- `waiver_reason` (plain English)
- One of: `expiry_at` or `remediation_due`

The cron downgrades stale waivers to `expired` automatically.

---

## 5. Claims Policy

Approved:
- "Verified within stated scope as of [date]."
- "Reviewed against [standard] — current as of [date]."
- "A11yGate Verified™ — scope-defined."

Never:
- "This website is accessible."
- "ADA compliant." / "Fully compliant." / "Guaranteed accessible."
- "Lawsuit-proof." / "ADA-proof."

---

## 6. Monitoring Model

```
L1 — Automated: scan-based, no human co-sign
L2 — Manual: automated + expert review, co-sign required
L4 — Continuous: L1 or L2 + scheduled drift detection
```

Cron schedule:
- Mon 6am UTC: expiry scan
- 1st of month: 15% random spot check (deterministic SHA256 selection)
- Quarterly: published report draft

---

## 7. Founding Records Policy

Founding records (a11ygate.org, sealforge.io) are self-issued.
`founding_self_audited` ≠ independent third-party certification.
Public badge must show founding status explicitly.
Path to independence: `founding_cosigned` via external expert co-sign.
