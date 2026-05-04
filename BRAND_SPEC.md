# BRAND_SPEC.md — A11yGate™ Brand Authority Document
_Version: 2.0_
_Source: Brand Book v1.0 (2026-05-04)_
_Entity owner: Ellari Ventures LLC_
_Status: LOCKED — update version on any change_

---

## §0 Canon

**Canonical brand name:** A11yGate™
**Pronunciation:** "Ally Gate"
**Canonical tagline:** Access Is The Gate.
**Canonical one-liner:** A11yGate™ verifies whether digital systems are accessible enough to trust.
**Category:** Accessibility Standards Body + Verification Layer + Deployment Gateway
**Parent ecosystem:** ELLARI / EMET Stack™ / ELEOS Standards Layer
**Legacy line:** "Proof, not promises." — still valid for SealForge context

---

## §1 Strategic Position

A11yGate™ is the accessibility gate for governed systems.

It is not a generic accessibility checklist brand. It is a standards-and-verification layer
that asks one brutal question:

> *Can this system be used by the people it claims to serve — under real conditions,
> real constraints, and real institutional pressure?*

A11yGate exists to make accessibility **operational, testable, and publicly accountable.**

**What A11yGate is NOT:**
- A checklist blog
- A generic overlay widget
- A one-time audit shop
- A "we care about accessibility" badge
- A compliance theater machine

**What A11yGate IS:**
- A gatekeeping layer
- A standards map
- A proof registry
- A remediation workflow
- A trust seal
- A procurement instrument
- A governed accessibility authority

---

## §2 Voice + Tone

**Voice formula:** Plain English + Standards Authority + Operational Proof

**Approved copy patterns:**
- "Accessibility is not complete until it survives use."
- "Passing a scan is not the same as serving a person."
- "A system that excludes users creates risk before anyone files a complaint."
- "A11yGate verifies access, records evidence, and tracks remediation."
- "Accessibility must be maintained, not announced."

**Claim language — use:**
- "Mapped to…" / "Tested against…" / "Reviewed for…"
- "Verified within scope…" / "Remediation tracked…"
- "Evidence retained…" / "Seal issued for defined criteria…"

**Claim language — avoid:**
- "Fully compliant" / "ADA-proof" / "Lawsuit-proof"
- "Guaranteed accessible" / "AI-powered accessibility revolution"
- "Instant compliance" / "Works for everyone"

**Tone:** Precise · Protective · Institutional · Uncompromising · Calm · Credible · Plainspoken

**Emotional register:**
A locked courthouse door finally being opened with the correct key.
Not sentimental. Not cute. Not startup-fluffy. Not shame-heavy.
The emotional center is: **dignified access with receipts.**

---

## §3 Visual System

### Color Palette (Brand Book §10)

| Role | Name | Hex | Use |
|---|---|---|---|
| Ground | Mirror Black | `#1A1A1A` | Text, authority, high contrast |
| Surface | Soft Cream | `#F9F6F1` | Backgrounds, reports, landing pages |
| Signal | Clarity Gold | `#D6B168` | Rules, seals, highlights, dividers |
| Access | Civic Blue | `#2F6FED` | Links, focus states, interactive cues |
| Pass | Verified Green | `#2E7D5B` | Passed checks, verified states |
| Alert | Remediation Amber | `#B7791F` | Needs review, partial pass |
| Fail | Barrier Red | `#A63A3A` | Blocked access, failed gate |
| Meta | Audit Gray | `#6B7280` | Metadata, secondary copy |

**Gold-bright `#d6b168` — text use prohibition still applies:**
Approved for UI accents, rules, and seals only.
For body text on light backgrounds, use `#7a5a00` (AA verified) or `#1A1A1A`.

**Do not use:** neon gradients · cartoon disability icons · diversity stock photo energy · fake dashboard overload

### Typography (Brand Book §11)

| Use | Font | Notes |
|---|---|---|
| Headings | Playfair Display or Cormorant Garamond | Authority and brand continuity |
| Body | Source Serif 4, Georgia, or Charter | Readable, formal, warm |
| UI / Dashboard | IBM Plex Sans, Inter, or Atkinson Hyperlegible | High clarity for tools and forms |
| Code / Technical | IBM Plex Mono or JetBrains Mono | Scan logs, issue IDs, CLI references |

**Accessibility note:** For the actual tool interface, prioritize legibility over brand drama.
Atkinson Hyperlegible or IBM Plex Sans should carry the product UI.
Serif fonts dominate reports, brand pages, and certification documents.

### Logo System (Brand Book §12)

**Primary mark:** Gate A — minimal black gate frame, gold horizontal proof line crossing the threshold.

**The gold line is the "proof line"** — represents the threshold, the evidence layer,
the moment of verification. Used throughout the brand.

**Required variants:** Monochrome · Black · Cream · Gold

**Rules:**
- High contrast at all sizes
- Generous spacing
- No tiny decorative details
- Legible at favicon size (16×16)
- Test on both dark and light backgrounds

---

## §4 Brand Architecture

| Surface | Product Name | Role |
|---|---|---|
| Public authority | A11yGate.org | Standards, explainers, challenge pages, registry, governance language |
| Product / tool | A11yGate Console | Audits, scans, issue tracking, remediation, seal workflows, team assignments |
| Seal | A11yGate Verified™ | Proof marker for completed accessibility review scope |
| Registry | A11yGate Registry™ | Public/private record of seals, scopes, status, remediation, review dates |
| Developer | A11yGate SDK / CLI | CI/CD integration, design-system checks, build pipeline gates |
| Enterprise | A11yGate Assurance™ | Governance packets, procurement documentation, board/counsel-ready summaries |
| Standards | A11yGate Standard™ | Mapped framework referencing WCAG, ADA Title II, Section 508, EN 301 549 |

---

## §5 Seal System (Brand Book §16)

**Primary seal name:** A11yGate Verified™

**Seal statuses:**
`Passed` · `Passed With Conditions` · `Remediation Required` · `Blocked` · `Expired` · `Revoked` · `Under Review`

**Every seal must display:**
- Entity name
- Tested property
- Scope
- Standard map
- Review date
- Expiration date
- Verification ID
- Exception count
- Public registry link
- Seal status

**Rule:** Never issue a vague "accessible" badge.
The seal must always be tied to scope, date, standard, and evidence.

**Powered by:** SealForge — cryptographic proof layer

---

## §6 Font System Architecture

The A11yGate font system has three distinct layers:

### Layer 1 — Brand Typography
- Playfair Display (headlines)
- Source Serif 4 / IBM Plex Sans (body)
- Defined in this spec (§3)
- Used on: landing page, reports, certification documents
- **Not** the validation instrument

### Layer 2 — Reference Instrument
- **A11yGate Reference Font™**
- Fork of Atkinson Hyperlegible (OFL-1.1)
- Used for TRS measurement and typography validation
- Source: `A11ygate/a11ygate-reference-font`
- Custom axes: LGBL (Legibility) · SPAC (Spacing) · DSAM (Disambiguation) · DARK (Dark mode)
- Spec: `A11ygate/a11ygate-spec/font-spec.md`

### Layer 3 — UI Render Font
- Atkinson Hyperlegible / IBM Plex Sans / JetBrains Mono
- Used in: reports, dashboards, CLI output
- Priority: legibility over brand drama

---

## §7 Brand Values (Brand Book §22)

1. **Access Before Aesthetics** — Beauty does not excuse exclusion.
2. **Proof Over Performance** — Claims must be traceable, scoped, and reviewable.
3. **Remediation Over Shame** — The goal is correction, not theater.
4. **Standards With Context** — Rules matter, but real users matter more.
5. **Security-Compatible Inclusion** — Accessibility must work inside modern security, authentication, privacy, and enterprise constraints.
6. **Public Trust** — Institutions that serve the public must prove the public can use their systems.
7. **Maintenance Is Integrity** — Accessibility is not a launch event. It is a maintenance obligation.

---

## §8 UI Doctrine (Brand Book §14)

> A11yGate's interface must be the proof of its own thesis.
> It cannot sell accessibility while hiding actions behind tiny controls, vague color states,
> poor keyboard behavior, low contrast, inaccessible PDFs, or jargon-heavy workflows.

**Required UI principles:**
- Every action has text, not just icon meaning
- Every status has color **plus** label (never color-only)
- Every report has a plain-language summary
- Every failure has a remediation path
- Every seal has scope boundaries
- Every audit has evidence
- Every exception has expiration
- Every claim has provenance

**Dashboard modules:**
`Gate Status` · `Scope Summary` · `Standards Map` · `Barrier Log` · `Remediation Queue` · `Exception Register` · `Seal Preview` · `Registry Record` · `Export Packet`

---

## §9 Legal + Risk Language (Brand Book §24)

**Use:**
- "Verification within stated scope"
- "Mapped to selected criteria"
- "Evidence-backed review"
- "Current as of review date"
- "Remediation required before seal issuance"
- "Not a substitute for legal advice"
- "Not a guarantee against claims"

**Avoid:**
- "Fully compliant" / "ADA-proof" / "Lawsuit-proof"
- "Guaranteed accessible" / "Certified forever"
- "Instant compliance" / "Works for everyone"

---

## §10 Relationship to SealForge (Brand Book §26)

- **SealForge™** = broader evidence, audit, and trust-seal infrastructure
- **A11yGate™** = accessibility-specific gate, standard, registry, and verification system

```
A11yGate tests access.
SealForge proves record integrity.
EMET Stack governs the larger trust architecture.
ELEOS supplies symbolic and structural language.
```

A11yGate seals are powered by SealForge infrastructure. The brands remain distinct.
SealForge is the proof layer. A11yGate is the access layer.

---

## §11 Standards Map (Brand Book §15)

| Standard | A11yGate Use |
|---|---|
| WCAG 2.2 | Technical web accessibility criteria |
| ADA Title II Web/Mobile Rule | Public entity compliance context |
| Section 508 | U.S. federal ICT procurement and agency requirements |
| EN 301 549 | European ICT accessibility procurement mapping |
| A11yGate Standard™ | Evidence, governance, remediation, seal logic — canonical |

---

## §12 Self-Audit Requirement

> A11yGate.org must pass its own A11yGate Standard scan before any public release.

The interface must meet:
- WCAG 2.1 AA contrast minimum on all text
- Visible focus states on all interactive elements
- Text labels for all icons
- No color-only statuses
- Keyboard navigation for all actions
- All PDFs and exports must be accessible

This is non-negotiable. The product cannot credibly certify others if it fails its own test.

---

## Version History

| Version | Date | Changes |
|---|---|---|
| 1.0 | 2026-04 | Initial — MirrorTone voice, color palette, Gate A logo, font system |
| 2.0 | 2026-05-04 | Full Brand Book v1.0 integration — positioning, tagline, seal system, UI doctrine, legal language, §12 self-audit requirement |
