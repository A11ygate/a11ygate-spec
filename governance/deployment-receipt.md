# A11yGate.org Deployment Receipt

## Deployment

| Field | Value |
|---|---|
| Date | 2026-05-04 |
| Worker | a11ygate-web |
| Version | cea12735-d6dd-4081-8b53-eb8f88ee94b0 |
| Brand Book | v2.0 |
| Deployed by | Ellari |
| Commit SHA | (next deploy) |

## Route Check

| Route | Status |
|---|---|
| / | ✅ Public authority homepage |
| /standard | ✅ Standard summary + GitHub |
| /proof | ✅ PAR explainer |
| /registry | ✅ Lookup interface |
| /glossary | ✅ 15 public terms |
| /install | ✅ CLI onboarding |
| /reference-font | ✅ TRS explainer |
| /manual-review | ✅ Human review boundary |
| /governance | ✅ Decision logs + doctrine |
| /contact | ✅ Professional inquiry |
| /par/:id | ✅ 302 → sealforge.io/r/:id |
| /health | ✅ Minimal JSON only |

## Forbidden Content Check

| Term | Status |
|---|---|
| ELEOS Reality Engine | ✅ ABSENT |
| Console v1.2.1 | ✅ ABSENT |
| D1 tables | ✅ ABSENT |
| RAW ENDPOINT | ✅ ABSENT |
| mirrorprotocol.ai | ✅ ABSENT |

## Required Content Check

| Term | Status |
|---|---|
| A11yGate | ✅ PRESENT |
| Access Is The Gate | ✅ PRESENT |
| accessibility proof infrastructure | ✅ PRESENT |
| Proof-of-Accessibility Record | ✅ PRESENT |
| SealForge | ✅ PRESENT |
| Ellari Ventures LLC | ✅ PRESENT |

## Security Headers Check

| Header | Status |
|---|---|
| Strict-Transport-Security | ✅ Present |
| X-Content-Type-Options | ✅ Present |
| X-Frame-Options | ✅ Present |
| Content-Security-Policy | ✅ Present |
| Referrer-Policy | ✅ Present |
| Permissions-Policy | ✅ Present |

## Domain Routing Check

| Domain | Status |
|---|---|
| a11ygate.com → a11ygate.org | ✅ 301 |
| a11ygate.io → a11ygate.org/install | ✅ 301 |
| www.a11ygate.org → a11ygate.org | ✅ 301 |

## Pending

- [ ] CF Custom domains detached from a11ygate-site Pages project
- [ ] CF Custom domains attached to a11ygate-web Worker
- [ ] contact@a11ygate.org email routing configured
- [ ] VERIFY_DOMAIN env var on sealforge-api

## Public Authority Surface Verified: YES (pending domain wiring)
