# A11yGate Founding Records Policy
_Version: 0.1 · Status: Canonical_

## Purpose

Founding records establish the initial registry model using A11yGate-owned or affiliated properties.
They are operational seeds — not independent third-party certifications.
This distinction must be publicly visible on every founding record display.

## Founding Record Statuses

| Status | Meaning |
|---|---|
| `founding_registered` | A record exists for a founding property |
| `founding_self_audited` | A11yGate performed an internal scoped review |
| `founding_cosigned` | An external reviewer or authorized expert co-signed the record |

## Required Public Label

> A founding self-audit is not independent third-party certification.
> This record was reviewed by A11yGate for its own property.

This label must appear wherever a founding record is displayed publicly.

## Required Fields

Every founding record must include:

- property (URL and scope)
- owner (Ellari Ventures LLC)
- review scope (what was tested, what was excluded)
- evidence level (L1 — automated/self-attested)
- gate state (current status)
- exceptions (each with owner, reason, and expiry or remediation date)
- expiration date
- SealForge reference (if sealed)
- public/private evidence status

## Progression Path

```
founding_registered
  → founding_self_audited (A11yGate completes internal review)
    → founding_cosigned (external expert co-signs the record)
```

The goal is `founding_cosigned`. That is when the founding records become
independent evidence — not before.

## Current Status

| Property | Founding Status | Gate State |
|---|---|---|
| a11ygate.org | founding_self_audited | conditional_pass |
| sealforge.io | founding_registered | pending |

## Integrity Rule

A11yGate cannot credibly certify others if it misrepresents its own records.
`conditional_pass` published honestly is stronger than `pass` claimed without evidence.
