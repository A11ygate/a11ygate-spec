# A11yGate™ Revocation Policy
_Version: 0.1 · Source: A11yGate Big Builds Volume III §IV_
_Status: Active from A11yGate Standard v0.1 publication_

## Purpose

Revocation is the deliberate withdrawal of an A11yGate seal, registry record, or conformance claim. Distinct from expiration (passive, time-based) and dispute resolution (responsive, post-challenge).

## Trigger Conditions

| Trigger | Initiated by | Severity |
|---|---|---|
| Material misrepresentation in audit | Maintainer | High |
| Co-signer key compromise affecting the audit | Maintainer | High |
| Audit subject's surface materially diverged without renewal | Maintainer | Medium |
| Audit subject's surface taken offline | Maintainer | Low (auto-flag, not revoke) |
| Audit subject requests withdrawal | Audit subject | Variable |
| Sustained dispute resulting in overturn | Per dispute outcome | Variable |
| Auditor revoked from Recognized Co-Signers list | Maintainer | Low–Medium |

## Revocation Procedure

1. Revocation Notice filed in spec repo with rationale and supporting evidence.
2. 7-day public comment period (30 days for material-misrepresentation triggers).
3. Maintainer issues final Revocation Decision.
4. PAR record `gate_state` updated to `revoked`. The record stays at its URL with a prominent banner: *"This record was revoked on [date]. Reason: [category]. See revocation notice [link]."*
5. The badge SVG becomes a visually distinct "revoked" badge — and remains servable. Embedding sites cannot suppress the change.
6. Registry search results display revoked records with a `[REVOKED]` prefix.

## What Revocation Does Not Mean

Revocation is not a moral judgment. A revoked record may be revoked because:
- The subject removed their site from the public web (no fault)
- The auditor's tooling had a flaw discovered post-audit (auditor fault)
- An adverse legal action requires withdrawal (legal)

The revocation reason category is published; specific rationale may be redacted for legal-confidentiality cases.

## Right of Reply

The audit subject and the auditor each have a right to reply to a revocation, published alongside the revocation notice. Replies are limited to 500 words, plain-text, and may cite evidence. Replies do not modify the revocation but are part of the public record.

## Re-Audit After Revocation

- **Material misrepresentation:** 90-day wait minimum; new audit at L2+ with named co-signer required.
- **Non-fault (offline, legal, voluntary withdrawal):** new audit may be requested immediately.

## Cryptographic Revocation Chain

Revoked PARs are added to the **Revocation Status List** at:

```
https://a11ygate.org/v1/status/sealforge-revocation-v1
```

Format: W3C VC 2.0 Bitstring Status List 2021-compatible JSON. Bit set to `1` = revoked; `0` = current. Gzipped, base64-encoded. Scales to >100M entries before requiring sharding. Signed by the same GPG key that signs Standard release tags.

## Reinstatement

A revoked record may be reinstated if the trigger is materially resolved:
1. Reinstatement Request filed in spec repo.
2. Maintainer review (14 days).
3. If approved: **new PAR** issued superseding the revoked record. Original revoked record remains at its URL with a "reinstated by [new PAR link]" notice.

Reinstatement does not erase the revocation. It moves the audit forward.

---
_A11yGate™ · Access Is The Gate. · Ellari Ventures LLC_
