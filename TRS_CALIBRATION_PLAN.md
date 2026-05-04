# TRS Calibration Plan
_Version: 0.1 · Referenced by AG-DEC-0005 · Status: Active planning_

## Context

The TRS formula is: `(0.30×CA + 0.20×SS + 0.20×SCS + 0.15×SSR + 0.15×RDC) × P`

Current weight distribution is provisional (AG-DEC-0005 status: DRAFT).
Until calibrated, all TRS outputs carry `confidence: PROVISIONAL`.

## Calibration Methodology

### Reference corpus — 10 fonts

1. A11yGate Reference Font (Atkinson fork, v0.1)
2. Atkinson Hyperlegible (source)
3. Verdana
4. Arial
5. Helvetica Neue
6. Georgia
7. Times New Roman
8. Courier New
9. OpenDyslexic
10. Noto Sans

### Test dimensions — 5 per font

| Category | Code | Measurement |
|---|---|---|
| Character Ambiguity | CA | DVS confusion rate on I/l/1, O/0, rn/m pairs |
| Spacing Safety | SS | WCAG 1.4.12 letter/word/line spacing compliance |
| Stroke/Contrast | SCS | Thick-to-thin ratio at 12px and 14px |
| Small-Size Rendering | SSR | Integrity score at 12px, 14px, 10px |
| Render Delta | RDC | Cross-environment variance (macOS/Windows/iOS) |

### Success criteria

Pearson r ≥ 0.80 between TRS output and published legibility rankings
(APSA 2023 Legibility Study, ISO 9241-303 reference set, or equivalent peer-reviewed source).

### Output

On calibration completion:
1. Update AG-DEC-0005 status from DRAFT → CALIBRATED
2. Update TRS formula if weights shift meaningfully (>0.05 on any axis)
3. Remove PROVISIONAL flag from PAR template
4. Publish calibration dataset as public research artifact (U6)

## Current Status

Status: Pre-study. Study not yet initiated.
Estimated effort: 2–3 days of structured testing.
Required tooling: A11yGate Font Audit™ engine (v0.1+), render test environment.
Target completion: Post-L5.
