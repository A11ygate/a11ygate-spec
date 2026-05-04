# A11yGate Verification Policy
_Version: 0.1 · Status: Canonical_

## Purpose

Define when and how A11yGate may issue, withhold, or upgrade a verification seal.
This policy governs the gap between self-attestation (Registered) and verified status (Verified).

## Verification Tiers

| Tier | Name | Evidence Required | Who Conducts |
|---|---|---|---|
| L1 | Self-attested | Automated scan results | Organization |
| L2 | Expert reviewed | Automated + manual review, co-signed | A11yGate reviewer |
| L4 | Continuously monitored | L2 baseline + drift detection | A11yGate systems |

## Conditions for Seal Issuance

A seal may be issued when:

1. Scope is explicitly defined (included paths, excluded paths, artifact type)
2. Evidence is documented at the stated level (L1, L2, or L4)
3. Gate state is assigned (pass, conditional_pass, fail, waived, or expired)
4. All B0 barriers are resolved or have accepted BX exceptions with owner + expiry
5. All BX exceptions include owner, reason, and expiration or remediation date
6. Standard map is recorded (WCAG version, ADA Title II, Section 508, A11yGate Standard)
7. Expiration date is set
8. SealForge reference is obtained if L2 or higher

## Conditions for Seal Withholding

A seal must not be issued when:

- B0 (Access Blocker) is present and unresolved without an accepted BX exception
- Scope is undefined or vague ("entire site" without path specification)
- Evidence level is misrepresented (claiming L2 for L1 scan-only results)
- Required fields are incomplete

## Verification Language

Use: "Verified within stated scope as of [date]."
Never: "ADA compliant," "fully accessible," "lawsuit-proof," "guaranteed accessible."

## Self-Verification Rule

A11yGate.org must pass its own standard before accepting external registrations.
Current status: AG-SEAL-20260504-0001, conditional_pass, founding_self_audited.
Target status: founding_cosigned — when an external expert co-signs the record.
