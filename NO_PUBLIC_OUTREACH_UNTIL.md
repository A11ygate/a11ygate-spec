# No Public Outreach Until
_Version: 0.1 · Status: Enforced gate_

Do not publish external announcements, outreach posts, or press mentions until every item below is confirmed.

## Infrastructure

- [ ] Custom domains live — a11ygate.org resolves to a11ygate-web Worker
- [ ] All redirect domains verified — a11ygate.com, a11ygate.io, www variants
- [ ] Canonical smoke test passed — 39/39 or current full count, 0 failures
- [ ] Registry lookup functional — /registry?id= → /par/:id works
- [ ] Contact email active — contact@a11ygate.org routes to monitored inbox
- [ ] SealForge email active — hello@sealforge.io routes to monitored inbox

## Security and hygiene

- [ ] No exposed secrets in any public artifact (session briefs, GitHub, Notion public pages)
- [ ] gitleaks CI passing on a11ygate-spec main branch
- [ ] Session briefs reviewed — no raw DB IDs, API keys, or internal routes in shareable docs
- [ ] Public brief template in use — separate from private ops brief

## Content and compliance

- [ ] Spec pack committed — SEAL_SPEC, REGISTRY_SPEC, MONITORING_SPEC, PUBLICATION_POLICY, REGISTERED_VS_VERIFIED
- [ ] Founding records labeled — `founding_status = founding_self_audited`, not presented as independent third-party certification
- [ ] FOUNDING_RECORDS_POLICY.md in repo
- [ ] /policies layer committed — 8 policy documents
- [ ] Public status page does not expose internals
- [ ] REGISTERED_VS_VERIFIED callout visible on /registry
- [ ] No silent exceptions callout on /governance
- [ ] Claims policy at /claims-policy

## A11yGate self-audit

- [ ] a11ygate.org passes its own A11yGate Standard scan before public release
- [ ] Self-scan gate state is published honestly (conditional_pass is acceptable)
- [ ] Self-scan exceptions are named and owned

## Gate

**If any item above is unchecked: no outreach. No exceptions.**

The L5 milestone (first external transaction) is gated by this checklist.
A partial launch is not a launch. It is a liability surface.
