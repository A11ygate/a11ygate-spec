# Registered vs Verified — Non-Negotiable Distinction
_Version: 0.1_
_Status: Canonical — this distinction prevents A11yGate from becoming a pay-to-play badge farm_

---

## The Distinction

### Registered

Registered means an organization has created an A11yGate record.
It may include self-attestation, planned remediation, or pending review.
**Registered does not mean A11yGate verified the property.**

Registered records:
- may be created by the organization
- may include self-attested claims
- are subject to spot check and upgrade
- are not eligible for the A11yGate Verified™ seal

### Verified

Verified means A11yGate completed a scoped review and assigned a gate state.
Verified records always include:
- scope definition
- review date
- standard map
- evidence level (L2 or higher)
- expiration date
- exception count
- SealForge reference

---

## Visual Distinction (Required)

| Status | Badge color | Label | Additional indicator |
|---|---|---|---|
| `registered` | Gray | "REGISTERED" | "Self-attested or pending review" |
| `verified` | Gold / green | "VERIFIED" | "A11yGate-reviewed" |
| `conditional` | Amber | "VERIFIED" | "With conditions — see record" |
| `expired` | Gray / amber | "EXPIRED" | Renewal date |
| `revoked` | Red | "REVOKED" | Reason code |
| `under_review` | Blue | "UNDER REVIEW" | — |

The registry page must explain this distinction. The badge colors enforce it visually.
The `evidence_level` field enforces it in data.

---

## Pricing Implication

Track 1 — A11yGate Verified (L2): A11yGate conducts the audit.
Track 2 — A11yGate Registered (L1): Organization submits own evidence.

Track 2 cannot claim the same seal as Track 1.
This distinction protects the value of Track 1.

---

## Registry Display Rule

The public registry must show:
```
[Entity name]  [VERIFIED by A11yGate]  [WCAG 2.2 AA]  [Reviewed 2026-05-04]  [Expires 2026-11-04]
[Entity name]  [REGISTERED — Self-attested]  [Pending review]
```

Never display registered and verified records in the same visual tier.

---

## Why This Matters

A11yGate's credibility depends on one thing: the seal means something.
The moment "Registered" and "Verified" look the same, A11yGate becomes a badge shop.
The moment anyone can pay $500 and get a checkmark that looks identical to a $9,500 L2 audit,
the entire registry is compromised.

This distinction is the moat.
