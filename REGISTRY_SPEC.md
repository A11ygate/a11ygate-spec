# A11yGate Registry™ Specification
_Version: 0.1_
_Status: Canonical_

---

## Purpose

The A11yGate Registry is the public and private record layer for accessibility
proof records. A registry record may be public, private, or summary-only.

The registry is the moat. Audits are service revenue. The registry is infrastructure.

---

## Record Visibility

| Visibility | What is shown |
|---|---|
| `public` | Organization name, property URL, scope summary, gate state, evidence level, seal ID, SealForge reference, review date, expiration date, supersedes chain, exception count, public summary |
| `summary_only` | Gate state and expiration only — no scope detail |
| `private` | Not shown in public registry |

Private evidence is retained but not automatically published.

---

## Public Registry Record Fields

- organization name and entity type
- property reviewed (URL or identifier)
- artifact type
- review scope summary
- standard map
- gate state
- evidence level
- seal ID
- SealForge verification reference
- review date
- expiration date
- supersedes chain (prior seal ID, if applicable)
- exception count
- public summary (controlled language)
- current public status

---

## Private Evidence

Private evidence may include:
- screenshots and screen recordings
- DOM notes and keyboard path logs
- reviewer identity and assistive technology notes
- source artifacts
- client-provided documents
- full barrier queue
- remediation history and retest results
- dispute documentation

Private evidence is retained for the record period and accessible to authorized parties only.

---

## Registry Statuses

| Status | Meaning |
|---|---|
| `registered` | Record exists — may be self-attested, pending review, or planned |
| `verified` | A11yGate completed a scoped review and assigned a gate state |
| `conditional` | Passed with documented limitations and a remediation plan |
| `under_review` | Active verification or dispute review in progress |
| `expired` | Record lapsed without renewal |
| `revoked` | Seal withdrawn — see revocation reason code |
| `blocked` | B0 barrier — seal not issuable at this time |

---

## Registered vs Verified

`Registered` means an organization has created an A11yGate record.
It may include self-attestation, planned remediation, or pending review.
**Registered does not mean A11yGate verified the property.**

`Verified` means A11yGate completed a scoped review and assigned a gate state,
backed by documented evidence.

This distinction must be visible in the public registry and on all badges.

---

## Supersedes Chain

When a record is revised (e.g. renewal, re-audit, scope update):
- The new record references the prior record via `supersedes` field
- The prior record remains visible as `superseded`
- The full chain is queryable
- No record is silently deleted

---

## Renewal

Default validity by evidence level:

| Level | Default validity |
|---|---|
| L1 registered/self-attested | 12 months |
| L2 verified/manual review | 6–12 months |
| L4 continuous monitoring | Active while monitoring is current |

Renewal reminder: 60 days before expiration.
Renewal required: before `expiration_date`.

---

## Random Audit Policy

A11yGate may randomly audit registered and verified properties.

Default cadence: 15% of active records per quarter.

Deterministic selection algorithm (published):
```
quarter_seed = YYYY-QN
selection_hash = SHA256(registry_id + quarter_seed)
Sort all active records by selection_hash.
Select the top 15%.
```

This methodology is published and reproducible. It prevents accusations
of selective auditing.

---

## Dispute Process

1. Organization submits evidence within 30 days of status change
2. Record marked `under_review` during dispute
3. A11yGate reviews submitted evidence within 30 days
4. Result: status confirmed, updated, or removed
5. Dispute notes appended to registry record (not evidence)

---

## Founding Member Designation

First cohort of registered organizations receive:
- `founding_member: true` flag in registry
- Indicator on public registry page
- Named in A11yGate annual report
- Priority renewal scheduling

Founding records: AG-REG-20260504-0001 (a11ygate.org), AG-REG-20260504-0002 (sealforge.io)
