# A11y Gate v1.2 — Changelog

_Entity owner: Ellari Ventures LLC_
_Spec canonical home: A11ygate/a11ygate-spec_
_Staged: 2026-05-03_

---

## v1.2 (2026-03-26)
- Promoted the whitepaper into a canonical binder edition
- Added scope / non-scope, state logic, evidence bundle, governance, limitations, and roadmap sections
- Expanded the manifest schema for provenance, review state, waivers, metrics, and toolchain versions
- Added example report and summary JSON files
- Added CI workflow example, Notion fields, manual-review checklist, and receipt blocks
- Added release manifest, checksums, citation metadata, and license file
- Rebuilt OSF and SSRN submission packs around the updated canonical binder
- Gate states: pass | conditional_pass | fail | waived | expired (replaces pass/partial/fail)
- DB migration: gate_state + expiry_at + remediation_due + parent_par_id (supersedes chain) — 2026-05-03

## v1.1 (baseline)
- Draft addendum, submission-pack outline, build artifacts, and template lock

## Irreversible Recursion Trail
Every version of this spec is a sealed artifact. Changes require a new version tag.
No version may be silently modified after tagging.
