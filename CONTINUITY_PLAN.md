# A11yGate™ Continuity Plan
_Version: 0.1-draft · Drafted: 2026-05-04_
_Status: DRAFT — becomes operative with A11yGate Standard v1.0 release_
_Owner: Ellari Ventures LLC_

## Purpose

This plan addresses the continuity risk of A11yGate operating as a standards body under a single-member LLC. It specifies what happens to the Standard, the registry, the infrastructure, and the spec repo if the current Maintainer is unavailable.

## Normal Operations

**Current Maintainer:** Ellari Ventures LLC  
**Day-to-day contact:** workspace.ops@proton.me  
**Emergency contact:** (designated below)

## Trigger Conditions

This plan activates under any of the following:
- Maintainer unavailable for ≥ 90 days without prior arrangement
- Voluntary withdrawal by the Maintainer with less than 90 days notice
- Legal dissolution of Ellari Ventures LLC
- Force majeure rendering the Maintainer unable to perform duties

## Phase 1: Notification (Days 1–30)

1. Known contacts (Recognized Co-Signers, registered organizations, GitHub watchers) receive a public notice via:
   - GitHub issue at `github.com/A11ygate/a11ygate-spec` with label `continuity`
   - `a11ygate.org` banner (if infrastructure still accessible)
   - Note at OSF pre-registration records

2. The notice states:
   - Maintainer status
   - Expected return date (if known)
   - Continuity Working Group convening date

## Phase 2: Continuity Working Group (Days 30–90)

The **Continuity Working Group (CWG)** is convened:

**Composition:**
- All Recognized Co-Signers (up to 5 seats)
- Up to 3 named external advisors (accessibility standards community)
- 1 seat reserved for a registered organization representative

**CWG authority:**
- Publish status updates
- Issue emergency maintenance to the Standard (critical fixes only, no new requirements)
- Elect an Interim Maintainer for 12 months

**CWG cannot:**
- Issue new PAR records independently
- Revoke existing records without the Dispute Policy procedure
- Transfer ownership of domains or infrastructure

## Phase 3: Interim Maintainership (Months 3–15)

The Interim Maintainer is elected by the CWG. Authority:
- Full Maintainer privileges for 12 months
- May issue PARs, process disputes, publish Standard versions
- Must convene a permanent maintainership election before term ends

## Permanent Transition

After 12 months of Interim Maintainership, a permanent Maintainer is elected by open call within the Recognized Co-Signers Registry and registered organizations. Election documented publicly.

## Infrastructure Escrow

The following credentials are placed in third-party legal escrow with documented release conditions:

| Asset | Description | Release condition |
|---|---|---|
| Cloudflare account access | API token scoped to a11ygate.org zone | Phase 2 trigger |
| GitHub org admin | Backup org owner token | Phase 2 trigger |
| Domain registrar | a11ygate.org + .com + .io | Phase 2 trigger |
| D1 database access | sigwell-ops read/write | Phase 2 trigger |

**Escrow provider:** (legal counsel — to be designated by 2026-08-04)  
**Release conditions:** Written request from any 2 of: (a) CWG majority, (b) designated emergency contact, (c) legal order.

## Standard Continuity

A11yGate Standard is licensed CC BY 4.0. If A11yGate ceases to operate:
- Any party may maintain and publish new versions with attribution
- The spec repo (public, full history) enables reconstruction
- Calibration study data and analysis code are archived at OSF and Software Heritage

The Standard is designed to outlive its original maintainer.

## Registry Record Continuity

In the event of infrastructure failure exceeding 30 days:
1. Registry records are published as a static JSON archive to OSF
2. SealForge anchors remain verifiable independently
3. Any party may host a read-only mirror of the public registry

## Operative Date

This plan becomes operative with A11yGate Standard v1.0 release. In the pre-v1.0 period, the bootstrap dispute procedures apply equivalently to any continuity event.

---
_A11yGate™ · Access Is The Gate. · Ellari Ventures LLC_
