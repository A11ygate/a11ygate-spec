# a11ygate Font Spec
_Entity owner: Ellari Ventures LLC_
_Status: DRAFT — not build-ready until APPROVED block is signed_
_Version: 0.1.0_
_Last updated: 2026-05-03_
_ELEOS tier: L3_
_Repo: TrueFormCoder/a11ygate-font (create before merging this file)_

---

## STOP GATE

**This document is the build gate.** No glyph modifications, no axis development, no pipeline work begins until every section below is marked `[LOCKED]` and this file is committed to `main` with a signed commit message:

```
chore: lock font-spec v0.1 — build authorized
```

Sections currently unlocked are marked `[DRAFT]`. Change `[DRAFT]` → `[LOCKED]` per section as decisions are finalized.

---

## 1. Base Font `[LOCKED]`

| Field | Value |
|---|---|
| Source font | Atkinson Hyperlegible v2 |
| Source license | SIL Open Font License 1.1 |
| Source repo | github.com/googlefonts/atkinson-hyperlegible |
| Fork repo | TrueFormCoder/a11ygate-font |
| Fork license | SIL Open Font License 1.1 (modifications included) |
| Commercial use | Permitted under OFL — no Reserved Font Name conflict |
| Reserved Font Name | "Atkinson Hyperlegible" — our fork must not use this name in any font nameID field |
| Our font name | a11ygate (nameID 1), a11ygate Variable (nameID 4) |

**Rationale for base choice:** Atkinson Hyperlegible is the only major OFL font designed explicitly for low-vision legibility with documented research backing (Braille Institute, 2019). Its x-height ratio, counter aperture design, and character disambiguation intent align with our validation targets. Choosing it as base minimizes design risk and maximizes credibility — we extend a known standard rather than invent one.

---

## 2. Scope Lock `[LOCKED]`

### 2a. Weights and Styles — v1

| Variant | Weight value | Include in v1 |
|---|---|---|
| Regular | 400 | ✓ |
| Bold | 700 | ✓ |
| Thin / Light / Medium | 100–300, 500–600 | ✗ |
| Italic (any weight) | — | ✗ — defer to v2 |

**Rule:** v1 ships exactly two static instances plus the variable font. No exceptions without reopening this spec.

### 2b. Character Set — v1

| Block | Unicode Range | Rationale |
|---|---|---|
| Basic Latin | U+0020–U+007E | Core — required |
| Latin-1 Supplement | U+00A0–U+00FF | Accented chars, legal symbols (©, ®, °) |
| Latin Extended-A | U+0100–U+017F | Extended European — covers regulatory document edge cases |
| General Punctuation | U+2000–U+206F | Smart quotes, em/en dashes, ellipsis |
| Letterlike Symbols | U+2100–U+214F | № ™ ℅ — common in compliance docs |
| Mathematical Operators | U+2200–U+22FF | ≥ ≤ ≠ — used in metric documentation |
| Currency Symbols | U+20A0–U+20CF | $ € £ ¥ — Sigwell/Caretide financial docs |

**Out of scope — v1 (permanent unless spec is reopened):**

- CJK Unified Ideographs — escalate to Noto-based fork if multilingual scope materializes
- Arabic, Hebrew, Devanagari, or any RTL script
- Emoji or color glyphs
- Decorative alternates, swashes, titling variants
- Small caps
- Tabular vs proportional figure switching (defer to v2 as OpenType feature)

### 2c. OpenType Features — v1

| Feature | Tag | Include |
|---|---|---|
| Standard Ligatures | `liga` | ✗ — off by default, too much visual ambiguity risk |
| Kerning | `kern` | ✓ — required |
| Mark Positioning | `mark` | ✓ — required for accented chars |
| Lining Figures | `lnum` | ✓ — default figure style |
| Tabular Figures | `tnum` | ✓ — for data/form contexts |
| Fractions | `frac` | ✗ — defer |
| Slashed Zero | `zero` | ✓ — required for disambiguation |
| Case-Sensitive Forms | `case` | ✓ — parentheses/dashes adjust for all-caps strings |

---

## 3. Metric Targets `[LOCKED]`

These are the validation targets. Every build must pass automated checks against all `FAIL` thresholds before the artifact is versioned.

| Metric | Target | FAIL threshold | Measurement method |
|---|---|---|---|
| x-height ratio | ≥ 0.53 | < 0.50 | `x-height / cap-height` via fonttools |
| Cap-height ratio | ≥ 0.70 | < 0.68 | `cap-height / UPM` |
| Stroke contrast | ≤ 2.5:1 | > 3.0:1 | Thickest / thinnest stroke at `O` |
| Counter aperture | Open — grade A | Grade C or closed | Visual + FontAudit CLI |
| Sidebearing balance | ±5% tolerance | > ±10% | `(LSB − RSB) / (LSB + RSB)` per glyph |
| Ascender | ≥ 0.70 × cap-height | < 0.65 × cap-height | fonttools |
| Descender | ≤ −0.25 × UPM | > −0.20 × UPM | fonttools (absolute value) |
| UPM | 1000 | ≠ 1000 | fonttools |
| PPEM hinting | Aligned at 12, 14, 16 | Misaligned at any | Render check via Playwright |

**UPM = Units Per Em. All metrics normalized to 1000 UPM.**

---

## 4. Disambiguation Rules `[LOCKED]`

This section defines the authoritative resolution strategy for every ambiguous character set. These decisions are citable — a11ygate validation reports reference this spec by version.

| Ambiguous set | Problem | Resolution strategy | Test string |
|---|---|---|---|
| `I` / `l` / `1` | Near-identical in many typefaces | `I` = slab serifs top+bottom; `l` = curved foot; `1` = angled top stroke, no serif | `Il1Il1` |
| `0` / `O` | Zero vs capital O | `0` = slash through center (activated via `zero` feature by default) | `0O0O` |
| `b` / `d` / `p` / `q` | Mirror confusion — dyslexia risk | Asymmetric terminals: `b` = flat top+bottom, `d` = curved top, `p` = curved bottom, `q` = flat top | `bdpq` |
| `6` / `9` | Rotational ambiguity | `6` = closed tail curving left; `9` = open tail curving right — tails must differ by ≥ 15° | `69` |
| `rn` / `m` | Optical collision at small sizes | Increased internal sidebearing on `r` + `n` pair; minimum gap = 60u at 1000 UPM | `rn m rn` |
| `C` / `G` | Open/closed confusion | `G` = prominent horizontal spur at midpoint; `C` = no spur, wider aperture | `CGcg` |
| `S` / `5` | Stroke direction confusion | `5` = flat top stroke, angular mid-junction; `S` = symmetric curves | `S5S5` |
| `2` / `Z` | Similar terminal shapes | `2` = curved top, flat base stroke; `Z` = angled diagonals, no curve | `2Z2Z` |
| `8` / `B` | Vertical balance confusion | `8` = symmetric; `B` = upper bowl smaller than lower by ≥ 15% | `8B8B` |
| `,` / `.` | Period vs comma at small sizes | Comma = descending curved tail, minimum tail length 80u; period = circular, no tail | `.,.,` |

**Test suite:** The above test strings constitute the Disambiguation Validation Set (DVS). Automated render checks run DVS at 12px, 14px, and 16px on both `#FFFFFF` and `#1A1A1A` backgrounds. All pairs must be visually distinct by human review before any version is tagged.

---

## 5. Variable Font Axes `[DRAFT]`

### 5a. v1 Axes (weight only)

| Tag | Name | Min | Default | Max | v1 |
|---|---|---|---|---|---|
| `wght` | Weight | 100 | 400 | 900 | ✓ |

### 5b. v2+ Axes (custom — register with Microsoft OpenType axis registry or use private-use range)

| Tag | Name | Min | Default | Max | Description |
|---|---|---|---|---|---|
| `LGBL` | Legibility | 0 | 50 | 100 | Composite axis: drives x-height ratio, counter aperture, sidebearing simultaneously. 0 = minimum viable, 100 = maximum legibility enhancement. |
| `SPAC` | Spacing | 0 | 50 | 100 | 0 = WCAG minimum spacing thresholds; 100 = enhanced spacing (letter-spacing +0.12em, word-spacing +0.16em equivalent baked into sidebearings). |
| `DSAM` | Disambiguation | 0 | 1 | 1 | Binary. 0 = base glyphs; 1 = full disambiguation alternates engaged. Maps to OpenType `ss01` stylistic set. |
| `DARK` | Dark mode weight | 0 | 0 | 1 | Binary. Activates weight compensation for light-on-dark rendering. Shifts effective weight −20 units to counteract optical heaviness. |

**Note on `LGBL`:** This axis is the centerpiece of a11ygate's font story. When a validation report says "validated at LGBL=75," that is a reproducible, citable statement. The axis value + font version + SHA hash = fully auditable validation fingerprint.

**Axis tag registration:** `wght` is registered standard. `LGBL`, `SPAC`, `DSAM`, `DARK` are private-use — use the four-uppercase-letter convention and document in this spec. Do not conflict with Microsoft's registered axis list.

---

## 6. Compliance Metadata `[DRAFT]`

Embedded in OpenType `name` table at nameID 256 (custom range starts at 256).

```json
{
  "product": "a11ygate",
  "font_name": "a11ygate",
  "version": "1.0.0",
  "spec_version": "0.1.0",
  "spec_sha": "[SHA256 of font-spec.md at build time — injected by pipeline]",
  "wcag_level": "AA",
  "wcag_criteria": ["1.4.3", "1.4.4", "1.4.8", "1.4.10", "1.4.12"],
  "char_set": "latin-extended-a",
  "disambiguation_version": "1.0",
  "axes": ["wght"],
  "entity_owner": "Ellari Ventures LLC",
  "validated_by": "a11ygate-pipeline",
  "build_timestamp": "[ISO8601 — injected by pipeline]"
}
```

**Injection method:** `tools/inject_metadata.py` runs post-build via fonttools, writes this JSON as a UTF-8 string to nameID 256. The `spec_sha` and `build_timestamp` fields are runtime-injected by GitHub Actions — not hardcoded.

**Query method:** Validation pipeline reads nameID 256 at runtime, parses JSON, confirms `version` matches pinned value in `font-config.json`. Mismatch = hard FAIL on the validation run.

---

## 7. Build Output `[LOCKED]`

| File | Format | Description |
|---|---|---|
| `dist/a11ygate-VF.ttf` | Variable TTF | Source of truth — all axes, full char set |
| `dist/a11ygate-VF.woff2` | Variable WOFF2 | Web delivery — CDN primary |
| `dist/a11ygate-400.woff2` | Static WOFF2 | Weight 400 subset — legacy fallback |
| `dist/a11ygate-700.woff2` | Static WOFF2 | Weight 700 subset — legacy fallback |
| `dist/a11ygate-DVS.png` | PNG spritesheet | Disambiguation Validation Set render — 12/14/16px, light/dark |
| `dist/font-report.json` | JSON | Automated metric results — all targets from §3 |

**All dist/ files are build artifacts. Do not commit to git. R2 is the artifact store.**

---

## 8. Versioning `[LOCKED]`

**SemVer: `MAJOR.MINOR.PATCH`**

| Change type | Version bump | Example |
|---|---|---|
| Breaking metric change (x-height target shift, disambiguation rule change) | MAJOR | 1.0.0 → 2.0.0 |
| New glyphs, new axis, new OpenType feature | MINOR | 1.0.0 → 1.1.0 |
| Hinting fix, metadata-only change, build tooling | PATCH | 1.0.0 → 1.0.1 |

**Pipeline pins by SHA256 hash of `a11ygate-VF.woff2`, not semver alone.** Semver is human-readable; the hash is the enforcement mechanism. Both are stored in `font-config.json` at the pipeline root:

```json
{
  "font_version": "1.0.0",
  "font_sha256": "[hash — updated by release workflow]",
  "font_url": "https://fonts.ellari.dev/a11ygate/v1.0.0/a11ygate-VF.woff2"
}
```

---

## 9. Delivery Infrastructure `[DRAFT]`

| Component | Value |
|---|---|
| CDN origin | Cloudflare R2 — existing bucket `fonts` |
| Serving path | `fonts.ellari.dev/a11ygate/v{semver}/` |
| Worker | `font-serve` — CORS headers, cache-control: immutable on versioned paths, variant selection |
| Cache strategy | Versioned paths: `Cache-Control: public, max-age=31536000, immutable`. Latest alias: `Cache-Control: public, max-age=3600` |
| DNSSEC | Required on `ellari.dev` before public launch — see standing DNSSEC reminder |
| Subset API | `GET /fonts/subset?text={encoded}&weight={400|700}&version={semver}` — defer to v1.1 |

---

## 10. IP and Licensing `[LOCKED]`

| Item | Position |
|---|---|
| Base font license | SIL OFL 1.1 — modifications permitted, redistribution permitted |
| Our modifications license | SIL OFL 1.1 — modifications inherit OFL, cannot be sublicensed as proprietary |
| Font name protection | "Atkinson Hyperlegible" is a Reserved Font Name — our distribution must use "a11ygate" only |
| Commercial use of font | Permitted under OFL — embedding in PDFs, apps, products is allowed |
| Commercial use of _spec_ | `font-spec.md` is owned by Ellari Ventures LLC and is NOT OFL — it is the proprietary validation standard |
| Derivative product (a11ygate audit tool) | Proprietary — the tool that measures fonts against this spec is not OFL-bound |
| KinderGurus packaging | Font may be distributed as training material under OFL; the spec and audit methodology are proprietary |

**Key distinction:** The font is OFL (must remain open). The spec, the metric definitions, the audit methodology, and the validation scores are proprietary IP. The open font is the instrument; the measurement framework is the product.

---

## 11. Repo Structure `[DRAFT]`

```
TrueFormCoder/a11ygate-font/
├── font-spec.md              ← this file — root of build authority
├── font-config.json          ← pinned version + SHA for pipeline
├── sources/
│   └── a11ygate.ufo/         ← UFO source (FontForge or Glyphs export)
├── tools/
│   ├── inject_metadata.py    ← fonttools — writes nameID 256
│   ├── check_metrics.py      ← validates §3 targets, outputs font-report.json
│   └── render_dvs.py         ← Playwright — renders DVS at 12/14/16px
├── tests/
│   └── dvs/                  ← Disambiguation Validation Set reference PNGs
├── dist/                     ← build artifacts — gitignored
└── .github/
    └── workflows/
        └── build.yml
```

---

## 12. Build Pipeline Sketch `[DRAFT]`

```yaml
# .github/workflows/build.yml
name: Font Build + Validate

on:
  push:
    branches: [main]
  pull_request:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Install toolchain
        run: |
          pip install fontmake fonttools --break-system-packages
          npm install -g wrangler

      - name: Build variable font
        run: fontmake -u sources/a11ygate.ufo -o variable --output-dir dist/

      - name: Inject metadata
        run: python tools/inject_metadata.py dist/a11ygate-VF.ttf
        env:
          SPEC_SHA: ${{ hashFiles('font-spec.md') }}
          BUILD_TS: ${{ github.event.head_commit.timestamp }}

      - name: Compress to WOFF2
        run: woff2_compress dist/a11ygate-VF.ttf

      - name: Generate static subsets
        run: |
          pyftsubset dist/a11ygate-VF.ttf --output-file=dist/a11ygate-400.ttf \
            --unicodes="U+0020-007E,U+00A0-00FF,U+0100-017F,U+2000-206F,U+20A0-20CF,U+2100-214F,U+2200-22FF" \
            --layout-features="kern,mark,lnum,tnum,zero,case" \
            --named-instance="Regular"
          woff2_compress dist/a11ygate-400.ttf

      - name: Check metrics
        run: python tools/check_metrics.py dist/a11ygate-VF.ttf --fail-on-error

      - name: Render DVS
        run: python tools/render_dvs.py dist/a11ygate-VF.woff2 --output dist/a11ygate-DVS.png

      - name: Upload to R2
        if: github.ref == 'refs/heads/main'
        run: |
          VERSION=$(python -c "import json; print(json.load(open('font-config.json'))['font_version'])")
          wrangler r2 object put fonts/a11ygate/v${VERSION}/a11ygate-VF.woff2 \
            --file dist/a11ygate-VF.woff2 \
            --content-type font/woff2
        env:
          CLOUDFLARE_API_TOKEN: ${{ secrets.CF_API_TOKEN }}
```

---

## 13. Decision Log `[ONGOING]`

| Date | Decision | Rationale | Decided by |
|---|---|---|---|
| 2026-05-03 | Base font: Atkinson Hyperlegible | Best existing OFL a11y-optimized base; minimizes design risk | Ellari |
| 2026-05-03 | v1 scope: 2 weights, upright only | Prevent scope creep; italic adds ~40% design work for marginal v1 value | Ellari |
| 2026-05-03 | Zero default: slashed (zero feature on) | Disambiguation is the point of this font; slashed zero should be default behavior | Ellari |
| 2026-05-03 | `liga` off by default | Standard ligatures introduce optical ambiguity — antithetical to the spec's purpose | Ellari |

_Add rows as decisions are made. Undocumented decisions are not authoritative._

---

## Approval Block

```
SPEC VERSION: 0.1.0
APPROVED BY:  ___________________________
DATE:         ___________________________
COMMIT SHA:   [auto-filled on merge]
BUILD AUTH:   YES / NO
```

_Until BUILD AUTH = YES and this block is filled, no build artifacts may be published._
