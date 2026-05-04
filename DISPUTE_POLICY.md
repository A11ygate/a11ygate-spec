# A11yGate™ Dispute Policy
_Version: 0.1 · Source: A11yGate Big Builds Volume III §III_
_Status: Active from A11yGate Standard v0.1 publication_

## Purpose

This policy specifies how challenges to A11yGate audits, the A11yGate Standard, and individual registry records are submitted, reviewed, and resolved. Without a documented dispute policy, "challenge welcome" is rhetoric. With one, it is a process.

## Scope

This policy applies to disputes against:

1. **An audit conformance claim** — a registered party disputes that an audit accurately reflects the subject's conformance.
2. **A Standard requirement** — any party disputes the methodology, threshold, or framing of a normative requirement.
3. **A registry record** — a party disputes the publication, accuracy, or scope statement of a record.
4. **A co-sign attestation** — a party disputes that a co-signer's attestation is valid.

This policy does not apply to: brand-mark trademark disputes, commercial pricing complaints, or out-of-scope feature requests.

## Eligibility to File

- **Audit-claim disputes:** the audit subject, the auditor, the co-signer, or any party with documented evidence of material misstatement.
- **Standard-requirement disputes:** any party. Anonymous filings accepted for Standard-only disputes.
- **Registry-record disputes:** the registered entity or any party with documented evidence.
- **Co-sign disputes:** any party with documented evidence.

## Filing Procedure

Canonical submission channel:
```
GitHub issue at github.com/A11ygate/a11ygate-spec
Labels: "dispute" + type sub-label
```

Required content:
1. Type of dispute (audit-claim | standard-requirement | record | co-sign)
2. Specific item disputed (PAR ID, requirement reference §X.Y, etc.)
3. Evidence for the dispute
4. Requested resolution
5. Filer identification (full name, organization if applicable) — OR documented basis for anonymity (Standard-requirement disputes only)

Acknowledgment: 5 business days. Each dispute receives a dispute ID (AGD-NNNN).

## Review Procedure

| Dispute type | Reviewer | Timeline | Outcome |
|---|---|---|---|
| Audit-claim | Maintainer + 1 independent Recognized Co-Signer | 30 days | Sustain / Modify / Overturn |
| Standard-requirement | Maintainer + public comment (14 days) | 60 days | Accept / Reject / Defer |
| Registry record | Maintainer | 14 days | Sustain / Modify / Withdraw |
| Co-sign | Maintainer + co-signer + original auditor | 21 days | Sustain / Modify / Revoke |

The independent reviewer for audit-claim disputes cannot have any prior commercial relationship with the audit subject or auditor.

## Outcomes and Public Record

All dispute outcomes are published in:
- `disputes/` directory of `a11ygate-spec` repo
- `/disputes` page on a11ygate.org
- Linked from the disputed PAR or requirement page

A sustained dispute that modifies or overturns a record creates a **superseding record** — the original stays at its URL with a "modified per dispute resolution AGD-XXX" notice and link to the new record. **Records are never deleted.**

## Appeals

A filer dissatisfied with a Maintainer decision may appeal once. Reviewed by the **Dispute Review Panel**:

```
Composition:
  - 1 Maintainer representative
  - 2 Recognized Co-Signers (rotated; not on original review)
  - 1 Independent Subject Matter Expert

Panel decisions are final.
```

## Dispute Timeline — Expiry Pause Rule

A dispute pauses the underlying record's expiry clock during review. If a record would have expired during review, it remains in `under_dispute` status until resolution.

## Frivolous-Filing Protection

Three or more disputes resolved in Sustain (A11yGate) favor from the same party within 12 months:
1. Required pre-filing review by Maintainer before subsequent disputes are processed.
2. Public listing in `disputes/frivolous-filings.md` with rationale.

The procedural threshold is intentionally high. A11yGate would rather process a real dispute than chill legitimate challenges.

## Bootstrap Acknowledgment (first 12 months)

The Recognized Co-Signers Registry will not have sufficient membership to staff the Panel as specified during the first 12 months. During this period:

- Audit-claim and registry-record disputes: Maintainer review with public comment open 14 days.
- For the first 5 disputes: 30-day public comment (extended) with explicit invitation for named external commentary.
- Appeals: ad-hoc panel with at least one external party documented.
- All bootstrap-period resolutions flagged as such; re-reviewable when the standing Panel forms.

Documented limits are stronger than papered-over limits.

---
_A11yGate™ · Access Is The Gate. · Ellari Ventures LLC_
