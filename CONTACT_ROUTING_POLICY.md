# A11yGate Contact Routing Policy
_Version: 0.1 · Status: Canonical_

## Public Contact Routes

| Address | Purpose | Routes to |
|---|---|---|
| contact@a11ygate.org | Standards, pilots, proof records, procurement | ops@proton.me |
| hello@sealforge.io | Verification infrastructure, SealForge API | ops@proton.me |

## Routing Rule

All public contact emails must route to a monitored inbox before being displayed on any public page.
An email address that bounces or is unmonitored must not be displayed publicly.

## Email Security Requirements

Every public domain must have:
- SPF record configured and passing
- DKIM signing configured
- DMARC policy (minimum `p=quarantine`)
- No open relay or catch-all without monitoring

## Failure Rule

If public contact routing is not active: remove the email address from the public surface.
**No dead emails. Ever.**

## Current Status

| Domain | SPF | DKIM | DMARC | Routing Active |
|---|---|---|---|---|
| a11ygate.org | Pending CF Email Routing setup | Pending | Pending | ❌ |
| sealforge.io | Pending | Pending | Pending | ❌ |

## Required Before Launch

Contact routing must be verified active before any public outreach.
See NO_PUBLIC_OUTREACH_UNTIL.md.
