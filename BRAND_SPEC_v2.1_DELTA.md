# BRAND_SPEC.md v2.1 — Delta from v2.0
_These additions must be merged into BRAND_SPEC.md before the v2.1 tag_

## §3.1 — Print Palette (new section)

Digital and print surfaces use distinct palette tokens. Using the wrong token
on the wrong surface violates the brand's own contrast requirements.

```css
/* Digital surfaces (web, app, dashboard, badge SVGs) */
--ag-cream-digital:    #F9F6F1;
--ag-gold-decorative:  #D6B168;  /* rules, dividers, seals ONLY — never body text */
--ag-gold-text:        #7a5a00;  /* AA-verified for body text on cream */

/* Print / PDF / formal documents */
--ag-cream-print:      #f5f2ec;  /* slightly deeper — better print contrast */
--ag-gold-print-text:  #7a5a00;  /* same as digital text gold — AA-verified */

/* Shared across all surfaces */
--ag-black:   #1A1A1A;
--ag-blue:    #2F6FED;
--ag-green:   #2E7D5B;
--ag-amber:   #B7791F;
--ag-red:     #A63A3A;
--ag-gray:    #6B7280;
--ag-border:  #E8E2D9;
```

**Lint rule:** `--ag-gold-decorative` may never appear in a `color:` property
on paragraph, list item, or label elements. Use `--ag-gold-text` for all text.

## §11.0 — Font System Architecture (new section)

A11yGate uses three distinct font layers. These are not interchangeable.

```
Layer 1 — Brand typography (visual identity)
  Headings:  Playfair Display or Cormorant Garamond
  Body:      Source Serif 4 or Georgia
  UI:        IBM Plex Sans
  Code:      IBM Plex Mono

Layer 2 — A11yGate Reference Font (measurement instrument)
  Fork:      Atkinson Hyperlegible (OFL-1.1)
  Purpose:   Typography Risk Score (TRS) validation baseline
  RULE:      Never used for brand headings or marketing copy

Layer 3 — UI render fonts (tool surfaces)
  Primary:   Source Serif 4 / IBM Plex Sans / IBM Plex Mono
  Fallback:  Atkinson Hyperlegible / Inter / Arial
```

The Reference Font is a controlled measurement environment, not a brand choice.
Confusing Layer 1 with Layer 2 is the most common contributor onboarding error.

## §1.3 — Pronunciation (new field)

Canonical pronunciation: **"Ally Gate"** (not "A-one-one-y Gate", not "A-eleven-y Gate").
Use in all audio, video, and verbal presentation contexts.

## §4.1 — TRS Provisional Disclaimer (new rule)

Until TRS calibration achieves Pearson r > 0.80 against published legibility rankings
(target: 10 reference fonts × 5 categories), every PAR containing TRS data must carry:

```json
"trs": {
  "score": 0.82,
  "confidence": "PROVISIONAL",
  "calibration_status": "pending — AG-DEC-0005",
  "disclaimer": "TRS weights are draft pending calibration study completion."
}
```

No PAR may omit this field until calibration is complete and AG-DEC-0005 is updated.
