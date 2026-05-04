# VALIDATION.md
_A11yGate Canonical Workflow Specification_
_Entity owner: Ellari Ventures LLC_
_Spec version: 0.1.0_
_Status: DRAFT — not enforcement-ready until APPROVED_
_Last updated: 2026-05-03_

---

## Purpose

This document defines the canonical workflow for every A11yGate validation run. It is the authoritative reference for all pipeline implementations, audit tool builds, and API endpoints. Any implementation that deviates from this spec produces a non-conformant audit — do not cite A11yGate without conformance.

---

## 1. Input Types

A11yGate accepts four input types. All produce the same output format.

| Input type | Identifier | What is evaluated |
|---|---|---|
| Font file | `font` | The font file directly — WOFF2, TTF, OTF |
| Document | `document` | A PDF, DOCX, or HTML file — font extracted and measured |
| URL | `url` | A live web page — active fonts detected and measured |
| CSS | `css` | A stylesheet — `font-family`, spacing properties extracted |

**Input validation rules:**
- Font file: must be a valid WOFF2, TTF, or OTF. Corrupt or DRM-protected files → `CONFIDENCE: LOW`, abort.
- Document: font must be embeddable and extractable. System font references without embedding → `CONFIDENCE: MEDIUM`.
- URL: font must load within 5s in the render environment. Timeout → abort with error code `ERR_FONT_TIMEOUT`.
- CSS: `font-family` values that reference system fonts with no SHA verifiable file → `CONFIDENCE: MEDIUM`.

---

## 2. Environment Normalization

Before any measurement, the render environment must be normalized. This ensures reproducibility across runs.

### 2.1 Render Profile Definition

A render profile is a named, versioned set of environment parameters. The standard profile is:

```json
{
  "profile_id": "chromium-headless-12-14-16px",
  "engine": "chromium",
  "version": "pinned — see build manifest",
  "hinting": "none",
  "antialiasing": "subpixel",
  "sizes_px": [12, 14, 16],
  "backgrounds": ["#FFFFFF", "#1A1A1A"],
  "viewport": "1280x960"
}
```

A conformant A11yGate run must use a declared render profile. Undeclared render environments → `CONFIDENCE: LOW`.

### 2.2 Font Loading Protocol

1. Download or extract font file
2. Compute SHA256 of the raw file bytes
3. Record `font_sha256` in audit output
4. Load into headless browser at declared sizes
5. If SHA256 cannot be verified against font registry → `CONFIDENCE: MEDIUM`

### 2.3 Baseline Metrics Extraction (fonttools)

Before rendering, extract the following metrics directly from font tables:

```python
required_metrics = [
  'unitsPerEm',       # Must be 1000
  'xHeight',          # In UPM units
  'capHeight',        # In UPM units
  'ascender',
  'descender',
  'typoLineGap',
]
```

If UPM ≠ 1000, normalize all measurements: `value_normalized = value × (1000 / UPM)`.

---

## 3. Category Measurement Protocols

Each of the five TRS categories has a defined measurement method. Implementations must follow these methods to produce conformant scores.

### 3.1 Character Ambiguity (CA) — weight 0.30

**Input:** Font rendered at 14px on white background, chromium headless  
**Method:** Render each Disambiguation Validation Set (DVS) pair. Compute pixel-level difference between glyph pairs.

**DVS pairs and weights:**

| Pair | Symbol | Weight within CA |
|---|---|---|
| I / l / 1 | `il1` | 0.25 |
| 0 / O | `0O` | 0.20 |
| b / d / p / q | `bdpq` | 0.20 |
| rn / m | `rnm` | 0.15 |
| C / G | `CG` | 0.05 |
| S / 5 | `S5` | 0.05 |
| 2 / Z | `2Z` | 0.05 |
| 8 / B | `8B` | 0.05 |

**Scoring per pair:**
```
pair_score = min(100, (pixel_diff / baseline_diff) × 100)
```
Where `baseline_diff` is the pixel difference of the same pair in A11yGate Reference Font v1.0.0 at 100 (the calibration anchor).

**CA composite:**
```
CA = Σ (pair_weight × pair_score)
```

**FAIL threshold:** CA < 60 triggers the 0.85 penalty multiplier on TRS.

---

### 3.2 Spacing Safety (SS) — weight 0.20

**Input:** Font metrics from fonttools + WCAG 1.4.12 thresholds  
**Method:** Three sub-checks:

**Sub-check 1 — Sidebearing balance** (weight 0.40 within SS):
```
balance = 1 - (|LSB - RSB| / (LSB + RSB))   for each glyph in Latin set
SS_balance = mean(balance) × 100
```

**Sub-check 2 — WCAG 1.4.12 spacing compliance** (weight 0.35 within SS):
Check that the font's default metrics permit without layout breaking:
- `letter-spacing`: ≥ 0.12em achievable
- `line-height`: ≥ 1.5× font size achievable
- `word-spacing`: ≥ 0.16em achievable
- `paragraph-spacing`: ≥ 2× font size achievable

Each threshold passed = 25 points. `SS_wcag` = sum of points.

**Sub-check 3 — Minimum size spacing integrity** (weight 0.25 within SS):
At 12px, verify no glyph-collision at normal tracking. Collision = SS_min penalty of −20.

```
SS = (0.40 × SS_balance) + (0.35 × SS_wcag) + (0.25 × SS_min)
```

---

### 3.3 Stroke/Contrast Stability (SCS) — weight 0.20

**Input:** Font metrics + Playwright render  
**Method:**

**Stroke contrast ratio** (measured at reference glyph `O`):
```
contrast_ratio = thickest_stroke / thinnest_stroke
SCS_contrast = max(0, 100 - (contrast_ratio - 1.0) × 20)
```

Targets: contrast ≤ 2.5:1 → SCS_contrast ≥ 70. Contrast ≤ 1.5:1 → SCS_contrast = 90+.

**Color contrast** (WCAG 1.4.3):
- AA pass (4.5:1 on white background): +10
- AAA pass (7:1): +5 additional

```
SCS = min(100, SCS_contrast + contrast_bonus)
```

---

### 3.4 Small-Size Rendering (SSR) — weight 0.15

**Input:** Playwright renders at 12px and 14px on both backgrounds  
**Method:** Four sub-checks per size:

1. **Counter closure:** Do open counters (e, a, c, g) close at this size? Closure = −25 per occurrence
2. **Glyph collision:** Do adjacent glyphs in common pairs (fi, fl, rn) touch? Collision = −20 per pair
3. **Pixel coverage:** Does each glyph's pixel footprint exceed the minimum legibility threshold? Below threshold = −15 per glyph
4. **Stem visibility:** Are all major strokes at least 1px wide? Below 1px = −20 per stem

```
SSR_per_size = max(0, 100 - sum(deductions))
SSR = (SSR_12px × 0.55) + (SSR_14px × 0.45)
```

12px is weighted higher because most a11y failures occur at minimum sizes.

---

### 3.5 Render Delta Consistency (RDC) — weight 0.15

**Input:** Renders across ≥ 2 environments (minimum: chromium + one of safari/firefox)  
**Method:**

For each measured property across environments:
- Stroke thickness (measured in px)
- Spacing between glyphs (measured in px)
- Character width (measured in px)

```
delta_per_property = (max_value - min_value) / max_value × 100   (% variance)
RDC = max(0, 100 - (mean(delta_per_property) × 8))
```

If only one render environment available → `CONFIDENCE: MEDIUM` and RDC is estimated at 72 (Arial baseline).

---

## 4. TRS Computation

```
TRS_raw = (0.30 × CA) + (0.20 × SS) + (0.20 × SCS) + (0.15 × SSR) + (0.15 × RDC)

P = 1.00   if all category scores ≥ 60
P = 0.85   if any category score < 60
P = 0.75   if any category score < 50

TRS = round(TRS_raw × P)
```

**Status bands:**

| TRS | Status | Badge | Export |
|---|---|---|---|
| 90–100 | Certified | ✔ Validated With A11yGate™ | Allowed |
| 80–89 | Approved | ✔ Validated With A11yGate™ | Allowed |
| 70–79 | Conditional | ◑ Reviewed With A11yGate™ | Allowed with disclosure |
| 60–69 | Risk | ⚠ A11yGate Risk Flag™ | Allowed with warning |
| < 60 | Fail | ✗ Failed A11yGate™ | BLOCKED in Enforcement Mode |

---

## 5. Confidence Level

```
CONFIDENCE = HIGH    if: ≥ 2 render environments + font SHA verified
CONFIDENCE = MEDIUM  if: 1 render environment, OR font SHA unverified, OR system font reference
CONFIDENCE = LOW     if: font unextractable, OR render timeout, OR input format unsupported
```

**Confidence degradation table:**

| Condition | Impact |
|---|---|
| Single render environment | MEDIUM ceiling |
| Font SHA unverified | MEDIUM ceiling |
| System font (no file) | MEDIUM ceiling |
| Mobile viewport only | SS component × 0.90 |
| Headless render only | RDC estimated, not measured |
| Render timeout | LOW, abort |
| UPM ≠ 1000 (unormalized) | LOW |

`CONFIDENCE: LOW` audits must not be cited in regulatory or legal contexts.

---

## 6. Fingerprint Generation

Every conformant audit produces a Validation Fingerprint. This is the tamper-proof traceability record.

```json
{
  "fingerprint_id": "AG-{YYYYMMDD}-{6-char-hex}",
  "font_version": "{semver from nameID 5}",
  "font_sha256": "{SHA256 of raw font file bytes}",
  "spec_version": "{font-spec.md version used}",
  "validation_spec_version": "{this document's version}",
  "axis_values": {
    "wght": 400,
    "DSAM": 1
  },
  "render_profile": "{profile_id}",
  "audit_timestamp": "{ISO8601}",
  "auditor": "a11ygate-pipeline | a11ygate-api | a11ygate-cli"
}
```

The fingerprint is embedded in the report JSON and also written to the A11yGate audit log (D1 table `a11ygate_audits`).

---

## 7. Report Output

Every audit produces a conformant report. The report schema is defined in `audit-report.schema.json`. Required top-level fields:

```
report_id, document_name, audit_timestamp, spec_version, render_profile,
font_analyzed, scores, status, confidence, recommendations, validation_fingerprint
```

Three report variants (same data, different presentation):
- `report.json` — machine-readable, conforms to schema
- `report-technical.md` — metric breakdown + methodology notes
- `report-plain.md` — plain-English findings + fix list (for non-technical buyers)

---

## 8. Badge Issuance

Badges are issued only after a conformant report is produced and stored. Rules:

| Condition | Badge |
|---|---|
| TRS ≥ 80, CONFIDENCE ≥ MEDIUM | ✔ Validated With A11yGate™ |
| TRS 70–79, CONFIDENCE ≥ MEDIUM | ◑ Reviewed With A11yGate™ |
| TRS 60–69, any confidence | ⚠ A11yGate Risk Flag™ |
| TRS < 60 | ✗ — no badge issued |
| CONFIDENCE = LOW | No badge — audit not citable |

Badge embeds fingerprint ID in the SVG metadata. Any badge without a verifiable fingerprint ID is unauthorized.

---

## 9. Enforcement Mode

Enforcement Mode is an enterprise-tier feature. When enabled, the pipeline blocks output generation until TRS ≥ 60.

**Blocked actions:**
- PDF export
- Public page publish
- Document approval
- Compliance packet generation
- Staff handbook release

**Override protocol:**
An authorized operator may override Enforcement Mode with:
1. A documented reason (logged to `a11ygate_overrides` table)
2. An explicit acknowledgment that the document has not passed A11yGate validation
3. The override is timestamped and included in the audit log

Overrides do not suppress the Risk Flag badge. The document is marked `enforcement_override: true` in the fingerprint.

---

## 10. Corrections Engine

After scoring, the pipeline must produce at least one correction recommendation per failed category. Recommendation types:

| Category | Correction type |
|---|---|
| CA fail | Switch font; enable OpenType `zero` feature; disambiguate specific pairs |
| SS fail | Increase `letter-spacing`; verify `line-height`; check spacing at minimum size |
| SCS fail | Reduce stroke contrast; verify WCAG contrast ratio; check antialiasing settings |
| SSR fail | Increase minimum font size; switch to a font with open counters |
| RDC fail | Pin font version; test on additional render environments; document deltas |

Format:
```json
[
  {
    "category": "CA",
    "severity": "FAIL",
    "finding": "I/l/1 disambiguation below threshold at 14px",
    "action": "Enable slashed zero via OpenType feature `zero`",
    "expected_impact": "+8 to +15 CA score"
  }
]
```

---

## 11. Audit Confidence and Legal Use

`CONFIDENCE: HIGH` audits with `TRS ≥ 80` may be cited in:
- Regulatory submissions
- ADA/WCAG compliance documentation
- Legal proceedings (as evidence of due diligence)
- Enterprise procurement responses

A11yGate is a typography accessibility risk assessment tool. It does not certify full WCAG compliance (which encompasses far more than typography). Do not represent A11yGate validation as full WCAG certification.

Recommended disclaimer for any cited report:
> "Typography validated using A11yGate Reference Font Spec v{version}. A11yGate assesses typographic accessibility risk; full WCAG compliance requires additional evaluation."

---

## Changelog

| Version | Date | Changes |
|---|---|---|
| 0.1.0 | 2026-05-03 | Initial draft — all sections DRAFT |

---

## Approval Block

```
SPEC VERSION:   0.1.0
APPROVED BY:    ___________________________
DATE:           ___________________________
COMMIT SHA:     [auto-filled on merge]
ENFORCEMENT:    ENABLED / DISABLED
```
