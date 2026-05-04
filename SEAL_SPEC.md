# A11yGate™ Seal Specification
_Version: 0.1_
_Status: Canonical — locked at this version_
_Source: Brand Book v2.0 · BRAND_SPEC.md v2.0_

---

## Purpose

An A11yGate seal is a **scoped verification marker**.

It does not mean a site is universally accessible.
It does not guarantee legal compliance.
It does not replace WCAG, ADA Title II, Section 508, PDF/UA, EN 301 549, or legal review.

It means: a defined artifact was reviewed against a defined scope on a defined date
and assigned a gate state with documented evidence.

---

## Approved Seal Language

Use:
- "Verified within stated scope as of [review date]."
- "See registry record for scope, standard map, exceptions, and review status."
- "Reviewed against [standard] — current as of [date]."

Never use:
- "This website is accessible."
- "This website is ADA compliant."
- "This website is fully compliant."
- "Guaranteed accessible."
- "Lawsuit-proof."
- "ADA-proof."

---

## Required Seal Fields

Every issued seal must record:

| Field | Required | Notes |
|---|---|---|
| entity_name | ✓ | Legal or public name of the organization |
| tested_property | ✓ | Specific URL, app, or document set |
| artifact_type | ✓ | website, web_app, mobile_app, document, api, ai_interface |
| scope | ✓ | Explicit list of included and excluded paths/flows |
| standard_map | ✓ | WCAG version, ADA Title II, Section 508, EN 301 549, A11yGate Standard version |
| review_date | ✓ | ISO 8601 date |
| expiration_date | ✓ | ISO 8601 date |
| verification_id | ✓ | AG-SEAL-YYYY-NNNN format |
| gate_state | ✓ | See §Gate States |
| evidence_level | ✓ | L1, L2, or L4 |
| exception_count | ✓ | Integer — 0 is acceptable and encouraged |
| registry_url | ✓ | a11ygate.org/par/:id |
| sealforge_reference | ✓ | sealforge.io/r/:id — cryptographic proof reference |
| supersedes | — | Prior seal ID, if this is a renewal or revision |

---

## Seal Statuses

| Status | Meaning | Badge color |
|---|---|---|
| `verified` | Passed defined scope — no outstanding B0/B1 barriers | Gold / green |
| `conditional` | Passed core access — non-blocking issues remain with documented plan | Amber |
| `registered` | Record exists — may be self-attested or pending review | Gray |
| `under_review` | Active verification in progress | Blue |
| `expired` | Review period ended — renewal required | Gray / amber |
| `revoked` | Seal withdrawn — see revocation reason code | Red |
| `blocked` | Critical B0 barrier — seal not issuable at this time | Red |

---

## Revocation Reason Codes

| Code | Meaning |
|---|---|
| `expired` | Review period lapsed without renewal |
| `unresolved_drift` | Material regression detected, not remediated |
| `scope_misrepresentation` | Seal claimed for scope not actually reviewed |
| `failed_spot_check` | Random audit found B0/B1 barriers |
| `client_requested_removal` | Organization requested record removal |
| `evidence_invalidated` | Supporting evidence found to be incorrect or fraudulent |

---

## Badge Display Rules

1. Every public badge **must link to the registry record**
2. Badges must **visually distinguish** verified, conditional, registered, expired, revoked, and blocked states
3. No badge may imply universal accessibility
4. Badge must display **last checked date** alongside expiration
5. Expired and revoked badges must use `Cache-Control: no-store`
6. Verified / conditional badges: `Cache-Control: max-age=3600`
7. Registered badges: `Cache-Control: max-age=3600`

---

## Evidence Levels

| Level | Name | What it means |
|---|---|---|
| L1 | Automated / self-attested | Scan-based evidence; no human review co-sign |
| L2 | Manual / expert reviewed | Automated + human review; expert co-sign required |
| L4 | Continuous monitoring | L1 or L2 + scheduled drift detection; badge status updates automatically |

---

## Badge Cache Policy

```javascript
const BADGE_CACHE = {
  verified:     'public, max-age=3600',
  conditional:  'public, max-age=3600',
  registered:   'public, max-age=3600',
  under_review: 'public, max-age=600',
  expired:      'no-store',
  revoked:      'no-store',
  blocked:      'no-store',
};
```

---

## Self-Seal Requirement

A11yGate.org must hold a valid seal before accepting external registrations.
Current status: AG-SEAL-20260504-0001 — conditional_pass.
Exception: inline CSS (style-src unsafe-inline). Owner: Ellari Ventures LLC.
