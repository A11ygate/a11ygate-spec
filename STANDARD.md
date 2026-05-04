# A11yGate Standard™ v0.1
_Reference Preview — methodology stable; thresholds provisional pending calibration_
_Version: 0.1 · Published: 2026-05-04 · Owner: Ellari Ventures LLC_
_License: CC BY 4.0 — attribution required: "A11yGate Standard™ v0.1 §X.Y (Ellari Ventures LLC, 2026)"_

---

## Foreword

A11yGate Standard v0.1 is a Reference Preview. The methodology is stable; specific thresholds for the Typography Risk Score (§5.2.3) are provisional pending the A11yGate Calibration Study v0.1.

**This Standard is complementary to WCAG, not competing with it.** Every A11yGate requirement either cites through to WCAG 2.2, ADA Title II, Section 508, or EN 301 549, or adds a requirement that WCAG underspecifies. A11yGate makes no claim to replace WCAG.

This Standard does not assert legal compliance with any jurisdiction's accessibility laws. Mappings to WCAG/ADA/508/EN 301 549 are informative. Conformance with A11yGate Standard does not establish legal compliance.

---

## 1. Scope

This Standard applies to digital systems that are publicly accessible or required to be accessible under applicable law, including websites, web applications, document collections, mobile applications, and APIs.

---

## 2. Normative References

- WCAG 2.2 (W3C, 2023)
- ISO 14289-1:2014 (PDF/UA-1)
- WCAG 2.2 Technical Understanding documents

---

## 3. Terms and Definitions

See the A11yGate Glossary at `a11ygate.org/glossary` and `sealforge.io/glossary`.

Key terms: **PAR™** (Proof-of-Accessibility Record), **gate state**, **waiver**, **TRS** (Typography Risk Score), **DVS** (Disambiguation Validation Set), **LCSA** (Low-Contrast Surface Area), **evidence level** (L1/L2/L4), **co-signer**.

---

## 4. Conformance Model

### 4.1 Two-Axis Grid

Every conformance claim is a **2-tuple**: (Conformance Level × Evidence Level).

```
                      Evidence Axis
              L1              L2              L4
          Automated     Expert-reviewed  Continuously
                        + co-signed      monitored
          ─────────────────────────────────────────
Conf.  ┌─────────┬──────────────┬──────────────┐
Axis   │  AG-A1  │    AG-A2     │    AG-A4     │
AG-A   │         │              │              │
       ├─────────┼──────────────┼──────────────┤
       │ AG-AA1  │   AG-AA2     │   AG-AA4     │
AG-AA  │         │ ← L5 target  │ ← Assurance  │
       ├─────────┼──────────────┼──────────────┤
       │AG-AAA1  │   AG-AAA2    │   AG-AAA4    │
AG-AAA │         │              │              │
       └─────────┴──────────────┴──────────────┘
```

Example: `(AG-AA, L2)` = expert-reviewed, co-signed audit at AA-level requirements.

### 4.2 Gate States

`pass | conditional_pass | fail | waived | expired`

- **pass** — all normative requirements met within scope; any informational notes documented under §5.11.
- **conditional_pass** — normative requirements met with at least one documented exception under §8.
- **fail** — one or more normative requirements not met.
- **waived** — requirements waived per §8; every waiver requires owner, reason, and expiry.
- **expired** — conformance period elapsed without renewal.

No silent waivers. No silent exceptions.

---

## 5. Requirements

### 5.1 Visual Access

#### 5.1.1 Text Color Contrast

**REQUIREMENT.** Body text and labels shall maintain a minimum contrast ratio against their background using the WCAG 2 relative-luminance formula. Text over images or gradients is evaluated against the worst-case background pixel within the text's bounding box plus a 4 px outset.

**EVIDENCE.** L1: automated scan of all text elements. L2: named reviewer manual sample ≥ 5% of in-scope pages. L4: monthly re-scan with delta report.

**CONFORMANCE.**
- AG-A: 3:1 for text ≥ 18 pt or ≥ 14 pt bold; 4.5:1 otherwise.
- AG-AA: 4.5:1 for body text; 3:1 for text ≥ 18 pt or ≥ 14 pt bold.
- AG-AAA: 7:1 for body text; 4.5:1 for text ≥ 18 pt or ≥ 14 pt bold.

**EXCEPTION.** Logotype text, brand-mark text, and decorative text conveying no information are out of scope.

**MAPS TO.** WCAG 2.2 §1.4.3 (AA), §1.4.6 (AAA). EN 301 549 §9.1.4.3, §9.1.4.6.

---

#### 5.1.2 UI Component and Graphical Object Contrast

**REQUIREMENT.** Visual information required to identify UI components and states, and meaningful graphical content, shall maintain a minimum contrast ratio of 3:1 against adjacent colors.

**EVIDENCE.** L1: automated detection and contrast measurement. L2: reviewer classification of informational vs decorative elements.

**CONFORMANCE.** AG-A through AG-AAA: minimum 3:1.

**EXCEPTION.** Inactive (visibly disabled) UI components are out of scope.

**MAPS TO.** WCAG 2.2 §1.4.11 (AA). EN 301 549 §9.1.4.11.

---

#### 5.1.3 Sustained Low-Contrast Surface Area [Novel]

**REQUIREMENT.** The audit shall report the **Low-Contrast Surface Area (LCSA)** — the percentage of total readable surface with contrast ratios in the range [3.0:1, 4.5:1). LCSA above 5% requires a documented design-system note; above 10% requires a remediation plan.

**EVIDENCE.** L1: automated calculation from rendered surface. L2: reviewer confirmation of edge cases.

**CONFORMANCE.** Reporting required at all levels; LCSA is a transparency requirement, not a pass/fail threshold by itself.

**MAPS TO.** No direct WCAG mapping. Novel requirement.

---

#### 5.1.4 Reduced Motion Honored

**REQUIREMENT.** When `prefers-reduced-motion: reduce` is active, the surface shall not initiate animation longer than 200 ms, parallax effects, or auto-playing video.

**EVIDENCE.** L1: automated render with simulated reduced-motion preference. L2: reviewer confirmation across ≥ 3 pages.

**CONFORMANCE.** AG-A: recommended. AG-AA and AG-AAA: required.

**EXCEPTION.** Loading indicators and progress bars may continue in simplified form with documented justification.

**MAPS TO.** WCAG 2.2 §2.3.3 (AAA). A11yGate elevates to AG-AA.

---

#### 5.1.5 Color Is Not the Only Means

**REQUIREMENT.** Color shall not be the sole means of conveying information, indicating action, prompting response, or distinguishing visual elements.

**EVIDENCE.** L1: heuristic detection of color-only patterns. L2: reviewer manual check.

**CONFORMANCE.** AG-A and above: required.

**MAPS TO.** WCAG 2.2 §1.4.1 (A). EN 301 549 §9.1.4.1.

---

### 5.2 Typography Access

#### 5.2.1 Text Resize

**REQUIREMENT.** Text shall be resizable by user-agent zoom up to 200% without loss of content, function, horizontal scrolling (on a 1280 CSS-px viewport), or text overlap.

**EVIDENCE.** L1: automated render at 100% and 200% zoom with layout comparison. L2: reviewer confirmation across forms, navigation, and content pages.

**CONFORMANCE.** AG-AA and above: required.

**MAPS TO.** WCAG 2.2 §1.4.4 (AA). EN 301 549 §9.1.4.4.

---

#### 5.2.2 Character Disambiguation [Novel]

**REQUIREMENT.** Body text and labels shall use a typeface disambiguating the following pairs at rendered size, weight, and ligature settings:
`I/l/1`, `0/O`, `b/d`, `p/q`, `rn/m`, `C/G`, `S/5`, `2/Z`, `8/B`, `6/9`.

**EVIDENCE.** L1: automated rendering through the A11yGate Disambiguation Validation Set (DVS). L2: reviewer confirmation at small sizes, italic, and bold.

**CONFORMANCE.**
- AG-A: ≥ 7 of 10 pairs distinguishable per DVS.
- AG-AA: ≥ 9 of 10 pairs.
- AG-AAA: all 10 pairs.

**EXCEPTION.** Display headings (≥ 24 pt, visual use) may use ornamental typefaces provided body text meets the conformance level.

**MAPS TO.** WCAG 2.2: no direct mapping. Novel requirement.

**CITATIONS.** Beier (2017). Bigelow & Holmes (1993). Braille Institute Atkinson Hyperlegible (2019).

---

#### 5.2.3 Font Fingerprint Integrity [Novel]

**REQUIREMENT.** At AG-AA L2 and above, the deployed surface shall produce a stable Font Fingerprint Identifier comprising: `font_family_name`, `font_format`, `font_sha256` (skip for system fonts), `axis_values` (variable fonts), `render_profile`, `trs_score`.

**EVIDENCE.** L1: not required. L2+: full fingerprint in evidence bundle. L4: fingerprint compared across re-audits; deviation triggers `font_drift` event.

**CONFORMANCE.** AG-AA L2 and above: required.

**MAPS TO.** Novel requirement. No direct WCAG mapping.

---

#### 5.2.4 Text Spacing Configurable

**REQUIREMENT.** When text spacing is adjusted within WCAG 1.4.12 bounds (line height ≥ 1.5×, paragraph spacing ≥ 2×, letter spacing ≥ 0.12×, word spacing ≥ 0.16× font size), content shall not be lost, overlap, or clipped.

**EVIDENCE.** L1: automated style override injection + DOM mutation observation. L2: reviewer manual check on form pages.

**CONFORMANCE.** AG-AA and above: required.

**MAPS TO.** WCAG 2.2 §1.4.12 (AA). EN 301 549 §9.1.4.12.

---

### 5.3 Navigation Access

#### 5.3.1 Keyboard Operable

**REQUIREMENT.** All functionality shall be operable through a keyboard interface.

**EVIDENCE.** L1: automated traversal confirming every interactive element reachable by Tab/Shift+Tab. L2: reviewer manual operation across all primary flows.

**CONFORMANCE.** AG-A and above: required.

**MAPS TO.** WCAG 2.2 §2.1.1 (A). EN 301 549 §9.2.1.1.

---

#### 5.3.2 Focus Visible (Enhanced)

**REQUIREMENT.** Every focused element shall display a focus indicator with outline ≥ 2 CSS px, contrast ratio ≥ 3:1 (per §5.1.2), not solely conveyed by color change, and not entirely outside the visible viewport.

**EVIDENCE.** L1: automated render with synthetic focus. L2: reviewer check across dark mode and high-contrast mode.

**CONFORMANCE.** AG-AA and above: required.

**MAPS TO.** WCAG 2.2 §2.4.7 (AA), §2.4.13 (AAA). A11yGate elevates focus appearance to AG-AA.

---

### 5.4 Assistive-Technology Access

#### 5.4.1 Names, Roles, States Programmatically Determinable

**REQUIREMENT.** For every UI component, Name, Role, State, and Value shall be programmatically determinable through the accessibility API.

**EVIDENCE.** L1: automated accessibility-tree traversal. L2: reviewer confirmation with NVDA, VoiceOver, and/or JAWS (≥ 2 of 3).

**CONFORMANCE.** AG-A and above: required.

**MAPS TO.** WCAG 2.2 §4.1.2 (A). EN 301 549 §9.4.1.2.

---

#### 5.4.2 Heading Hierarchy Coherent

**REQUIREMENT.** Headings shall form a coherent outline. Heading levels shall not skip downward within a logical section. Pages shall begin with an h1 naming the page or primary content.

**CONFORMANCE.** AG-A: h1 present, no skips. AG-AA: outline reflects content structure. AG-AAA: machine-validates against semantic classification.

**MAPS TO.** WCAG 2.2 §1.3.1 (A, interpretive).

---

### 5.5 Form Access

#### 5.5.1 Labels and Instructions

**REQUIREMENT.** Every form field shall have a programmatically associated label. Required fields shall be marked visibly and programmatically. Input format constraints shall be stated in instructional text or `aria-describedby`.

**CONFORMANCE.** AG-A and above: required.

**MAPS TO.** WCAG 2.2 §3.3.2 (A), §1.3.5 (AA). EN 301 549 §9.3.3.2, §9.1.3.5.

---

#### 5.5.2 Error Identification, Suggestion, Recovery

**REQUIREMENT.** On validation failure: identify failing field by name and visually; describe failure in text (not solely color); suggest correction; allow recovery without re-entering correct data; for legal/financial/data-modifying transactions, provide a confirmation step before submission.

**CONFORMANCE.** AG-A: items 1–3. AG-AA+: items 1–5.

**MAPS TO.** WCAG 2.2 §3.3.1, §3.3.3, §3.3.4.

---

### 5.6 Cognitive Access

#### 5.6.1 Predictable Behavior on Focus and Input

**REQUIREMENT.** Receiving focus shall not initiate a change of context. Changing an input value shall not initiate a change of context unless the user has been advised of the behavior before interaction.

**CONFORMANCE.** AG-A and above: required.

**MAPS TO.** WCAG 2.2 §3.2.1 (A), §3.2.2 (A).

---

### 5.7 Document Access

#### 5.7.1 PDF Documents Conform to PDF/UA-1

**REQUIREMENT.** PDF documents within scope shall conform to ISO 14289-1 (PDF/UA-1): tag tree present and ordered; document language declared; all images have alt text or are marked decorative; reading order preserves logical flow; structural elements tagged correctly.

**EVIDENCE.** L1: automated check via PAC 2024 or veraPDF. L2: reviewer manual check with screen reader.

**CONFORMANCE.** AG-AA and above: required.

**MAPS TO.** ISO 14289-1:2014. WCAG 2.2 applied to documents.

---

### 5.8 Mobile Access

#### 5.8.1 Touch Target Minimum Size

**REQUIREMENT.** Interactive targets shall be ≥ 24×24 CSS px with ≥ 24×24 CSS px clear spacing on all sides from adjacent interactive elements.

**CONFORMANCE.** AG-A: 24×24 CSS px. AG-AA: 24×24 with adequate spacing. AG-AAA: 44×44 CSS px.

**MAPS TO.** WCAG 2.2 §2.5.8 (AA). EN 301 549 §9.2.5.8.

---

### 5.9 Authentication Access

#### 5.9.1 No Cognitive Function Tests

**REQUIREMENT.** Authentication shall not require cognitive function tests without at least one alternative method (passkey, passwordless email-link, hardware key, biometric, or compliant IdP).

**CONFORMANCE.** AG-AA and above: required.

**MAPS TO.** WCAG 2.2 §3.3.8 (AA), §3.3.9 (AAA). EN 301 549 §9.3.3.8, §9.3.3.9.

---

### 5.10 Transaction Access

#### 5.10.1 Reversible, Confirmable, Recoverable

**REQUIREMENT.** Transactions with consequential actions shall meet at least one of: (1) reversible within a stated window; (2) checked for errors with a confirmation step; (3) user can review and confirm before submission. Confirmation step shall be screen-reader announced, visually highlighted (≥ 3:1 contrast), and in plain language.

**CONFORMANCE.** AG-AA and above: required.

**MAPS TO.** WCAG 2.2 §3.3.4 (AA). A11yGate adds procedural requirements above WCAG.

---

### 5.11 Security Prerequisites (Informative)

This section is **informative**. Findings under §5.11 are recorded as **informational notes** in the Access Proof Packet; they do not affect the conformance level.

- §5.11.1 Content Security Policy posture
- §5.11.2 HTTPS deployment and certificate validity
- §5.11.3 Subresource integrity (where applicable)
- §5.11.4 Authentication transport security
- §5.11.5 Output encoding

Security failures can cause accessibility failures, but security requirements are not accessibility requirements. Security testing governed by OWASP ASVS and NIST SP 800-218.

---

## 6. Conformance Statement Format

Every conformance claim shall include:
- Subject (URL, scope summary)
- Standard version (e.g., A11yGate Standard™ v0.1)
- Sections evaluated (e.g., §5.1–5.10)
- Conformance level and evidence level (2-tuple)
- Issue date and expiry date
- Exceptions listed by reference and requirement
- Legal disclaimer (see §4 Foreword)
- PAR ID and SealForge anchor

---

## 7. Evidence Requirements

| Evidence Level | What it means |
|---|---|
| L1 | Automated scan; single-scan; no human reviewer |
| L2 | L1 + named expert reviewer(s) + external co-signer |
| L4 | L2 + continuous monitoring; monthly re-scan; delta reports |

---

## 8. Exception Handling and Waivers

Every exception (`conditional_pass`) requires:
- `requirement_ref` — A11yGate Standard §X.Y
- `finding` — plain English description
- `scope` — what the exception covers
- `waiver_owner` — named individual or entity
- `remediation_plan` — concrete steps
- `remediation_target` — date (not open-ended)

Every informational note (§5.11) requires owner and target date.
No silent waivers. No silent exceptions.

---

## 9. Maintenance and Re-Audit

Conformance statements expire at the shorter of: (a) 6 months from issue date, or (b) material change within scope. Re-audit required before expiry. Cron monitoring (per MONITORING_SPEC.md) triggers renewal workflow automatically.

---

## 10. Citation Format

```
A11yGate Standard™ v0.1, §X.Y (Ellari Ventures LLC, 2026)
```

Machine-readable: `standard.json` at `a11ygate.org/standard.json`.
DOI: pending registration (target: v1.0 via Zenodo).

---

## Annex A — Mapping to WCAG 2.2 (informative)

| A11yGate § | Title | WCAG 2.2 § | Level |
|---|---|---|---|
| 5.1.1 | Text contrast | 1.4.3, 1.4.6 | AA/AAA |
| 5.1.2 | UI component contrast | 1.4.11 | AA |
| 5.1.3 | LCSA reporting | — | Novel |
| 5.1.4 | Reduced motion | 2.3.3 | AAA → elevated to AG-AA |
| 5.1.5 | Color not only means | 1.4.1 | A |
| 5.2.1 | Text resize | 1.4.4 | AA |
| 5.2.2 | Character disambiguation | — | Novel |
| 5.2.3 | Font fingerprint integrity | — | Novel |
| 5.2.4 | Text spacing | 1.4.12 | AA |
| 5.3.1 | Keyboard operable | 2.1.1 | A |
| 5.3.2 | Focus visible (enhanced) | 2.4.7, 2.4.13 | AA/AAA → elevated |
| 5.4.1 | Names, roles, states | 4.1.2 | A |
| 5.4.2 | Heading hierarchy | 1.3.1 | A (interpretive) |
| 5.5.1 | Labels and instructions | 3.3.2, 1.3.5 | A/AA |
| 5.5.2 | Error identification | 3.3.1, 3.3.3, 3.3.4 | A/AA |
| 5.6.1 | Predictable behavior | 3.2.1, 3.2.2 | A |
| 5.7.1 | PDF/UA-1 | ISO 14289-1 | — |
| 5.8.1 | Touch target size | 2.5.8 | AA |
| 5.9.1 | No cognitive function tests | 3.3.8, 3.3.9 | AA/AAA |
| 5.10.1 | Reversible/confirmable | 3.3.4 | AA → elevated |

**Novel requirements with no WCAG mapping:** §5.1.3 LCSA, §5.2.2 DVS, §5.2.3 Font Fingerprint, §5.4.5 (forthcoming), §5.5.6 (forthcoming), §5.9.3 (forthcoming), §5.10.2–5.10.4 (forthcoming).

---

## Update Log

| Version | Date | Changes |
|---|---|---|
| v0.1 | 2026-05-04 | Reference Preview. 20 requirements fully drafted; 42 deferred to v0.1 full release. §5.11 Security Prerequisites added as informative. |

---

_Maintained by Ellari Ventures LLC · A11yGate™ · Access Is The Gate._
_a11ygate.org/standard · github.com/A11ygate/a11ygate-spec/STANDARD.md_
