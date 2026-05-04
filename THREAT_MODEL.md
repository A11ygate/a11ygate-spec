# A11yGate™ Threat Model v0.1
_Version: 0.1 · Published: 2026-05-04 · Next review: 2026-08-04_
_Source: A11yGate Big Builds Volume III §V_
_License: CC BY 4.0_

## Purpose

Adversarial perspective on what could undermine A11yGate's credibility, infrastructure, or standards-body legitimacy. Threats are mapped to mitigations; mitigations are mapped to existing or proposed defenses.

A standards body that has not threat-modeled its own attack surface is one bad day away from losing its standing. **Publishing the threat model is itself a credibility move.**

Note: This document is high-level. Specific implementation details (rate-limit thresholds, secret rotation cadence, cron timing) are in private ops notes, not here.

---

## Threat Inventory

### T1 — Forged PAR Records

**Scenario:** Attacker claims their site is A11yGate-Verified with a fake badge and fake PAR ID.

**Mitigations:**
- Badge endpoint returns "not found" badge for unknown PAR IDs.
- Registry is canonical: badge resolves to `a11ygate.org/registry/:par_id`.
- Cross-check via `/.well-known/a11ygate.json` if present.
- CLI: `a11ygate verify <url>` resolves the full chain (badge → registry → seal → SealForge).

**Severity:** High. **Residual risk after mitigations:** Low.

---

### T2 — Forged Co-Sign Attestations

**Scenario:** Attacker claims an audit was co-signed by a Recognized Co-Signer who did not sign it.

**Mitigations:**
- Co-sign statements are PGP-signed YAML or WebAuthn-attested.
- Recognized Co-Signer profiles list every public co-sign in the co-signers/ directory.
- Cross-reference between auditor claim and co-signer profile detects forgeries automatically.

**Severity:** High. **Residual risk:** Low.

---

### T3 — Standards Capture

**Scenario:** A large platform vendor proposes "improvements" that shape the Standard around their own compliance posture.

**Mitigations:**
- Standard is CC BY 4.0 — no exclusive licensing leverage.
- Maintainer is Ellari Ventures LLC, not a corporate platform vendor.
- All Standard amendments require 30-day public comment with published responses.
- Post-L5 (when adoption reaches material scale): Standards Steward Council convened — balanced representation across accessibility advocates, auditors, audit subjects, and Maintainer. No single party holds majority.

**Severity:** Medium (low now, rises with adoption). **Residual risk:** Low–Medium.

---

### T4 — Embrace and Extend Fork

**Scenario:** Another party publishes "A11yGate-Compatible Standard" with different requirements while maintaining surface compatibility.

**Mitigations:**
- "A11yGate Standard™" is a registered mark of Ellari Ventures LLC.
- Discovery protocol `version` field includes `a11ygate.v1` — a fork cannot truthfully advertise this.
- Compliance test suite (`a11ygate-tests` repo): programmatic check that an audit conforms to the Standard's normative methodology.
- Public divergence registry: any party may file a "divergence claim" documenting differences.

**Severity:** Medium. **Residual risk:** Low.

---

### T5 — Coordinated Reputation Attack

**Scenario:** Coordinated downvoting, dismissive HN comments, fake negative reviews before credibility is established.

**Mitigations:**
- The Standard is the artifact. Reputation attacks against rhetoric do not change the Standard's contents.
- Self-audit, calibration study, dispute policy, revocation policy — every one is a citable artifact that survives noise.
- **No defensive engagement in attack threads.** Maintainer responds to substantive criticism only, with reference to specific Standard sections. Never engages tone or character attacks.
- Continued cadence of public artifacts accumulates evidence faster than attacks can erode it.

**Severity:** Medium. **Residual risk:** Low–Medium.

---

### T6 — DNS or Registrar Compromise

**Scenario:** Attacker takes a11ygate.org via registrar compromise.

**Mitigations:**
- DNSSEC enabled at registrar.
- Registrar account 2FA via hardware key.
- DNS CAA record restricts certificate issuance to known CAs.
- Registrar lock + 2-account approval for DNS changes.
- Out-of-band verification: in event of compromise, signed advisory published at GitHub releases and OSF. `/.well-known/security.txt` references the alternative path.

**Severity:** High. **Residual risk:** Low.

---

### T7 — Repository Compromise

**Scenario:** Attacker gains write access to `A11ygate/a11ygate-spec` and rewrites Standard or policies.

**Mitigations:**
- Branch protection on `main`. Required PR review.
- GPG-signed release tags. Cosigned `Release_Manifest.json`.
- `Release_Manifest.json` includes SHA-256 of every file; independent verifiers can clone and verify.
- Standards mirror: quarterly snapshots to OSF and Software Heritage.

**Severity:** High. **Residual risk:** Low.

---

### T8 — Public Scanner Abuse

**Scenario:** `/scan?url=X` endpoint abused for DoS or data exfiltration (scanning internal corporate URLs).

**Mitigations:**
- Bounded fetch: 5s timeout, 64KB cap.
- CF rate limiting per IP.
- URL allowlist: target must be publicly resolvable; must not be in RFC 1918/4193 ranges.
- Rate limit per scanned URL: same target cannot be re-scanned faster than once per 5 minutes from any source.
- CAPTCHA or session token for >10 scans per session (CLI authenticated users exempt).
- `scan_audit_log` D1 table: every scan logged with source and target.

**Severity:** Medium. **Residual risk:** Low.

---

### T9 — Schema Poisoning

**Scenario:** Malicious site hosts `/.well-known/a11ygate.json` with adversarial content exploiting JSON parser bugs.

**Mitigations:**
- `additionalProperties: false` on all objects in the schema.
- `maxLength` on every string field.
- Regex patterns on identifier fields.
- Structural depth bounded by schema definition.
- Enums on every state field.
- Per-source isolation: scan results from potentially poisoned files rendered in sandboxed iframe.

**Severity:** Low. **Residual risk:** Very low.

---

### T10 — Long-Term Standards Body Continuity

**Scenario:** Ellari Ventures LLC faces continuity risk as a single-member entity.

**Mitigations:**
- Standard is CC BY 4.0; any party can maintain it.
- Spec repo is public; full history reconstructable.
- `CONTINUITY_PLAN.md` (drafted with v1.0 release): designates successor maintainer protocol. If Maintainer unavailable for ≥ 90 days, a Continuity Working Group convenes — Recognized Co-Signers + named external advisors — to (a) publish notice, (b) elect Interim Maintainer for 12 months, (c) call for permanent maintainership.
- **Escrow:** spec repo deploy keys, registrar credentials, and CF account credentials in third-party legal escrow with documented release conditions.

**Severity:** Medium long-term. **Residual risk:** Low (v1.0+).

---

## Threat Summary

| ID | Threat | Severity | Mitigation status | Residual risk |
|---|---|---|---|---|
| T1 | Forged PAR | High | Mitigated | Low |
| T2 | Forged co-sign | High | Mitigated | Low |
| T3 | Standards capture | Medium | Mitigated; revisit at scale | Low–Medium |
| T4 | Embrace-and-extend | Medium | Mitigated | Low |
| T5 | Reputation attack | Medium | Structural resilience | Low–Medium |
| T6 | DNS/registrar | High | Mitigated | Low |
| T7 | Repo compromise | High | Mitigated | Low |
| T8 | Scanner abuse | Medium | Mitigated | Low |
| T9 | Schema poisoning | Low | Mitigated | Very low |
| T10 | Continuity | Medium long-term | Continuity Plan | Low (v1.0+) |

**Threat model reviewed quarterly. Next review: 2026-08-04.**

---
_A11yGate™ · Access Is The Gate. · Ellari Ventures LLC_
