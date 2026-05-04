# PDF Export Integrity Policy
_Version: 0.1 · Status: Enforced from first public PDF release_

## Problem

PDF exporters can break ligatures and glyph mappings:
- `verification` → `veri7cation`
- `definitions` → `de7nitions`
- `finding` → `7nding`
- `fi` ligature → `7` or `ﬁ` (Unicode ligature character)

A standards body shipping accessibility proof PDFs with broken text extraction
fails its own standard. This is a first-order credibility risk.

## Enforcement

Every public PDF must pass text extraction against the following fixture corpus:

```bash
# Run against any exported PDF
pdftotext "$PDF" - | python3 - << 'PYTHON'
import sys
text = sys.stdin.read().lower()
REQUIRED = [
    'verification', 'verified', 'definitions', 'finding',
    'accessibility', 'compliance', 'scope', 'evidence',
    'record', 'standard', 'review', 'barrier'
]
BANNED_PATTERNS = ['veri7', 'veri-', 'de7n', 'de-n', '\ufb01', '\ufb02', 'fi nd', 'f ind']
failed = False
for term in REQUIRED:
    if term not in text:
        print(f"FAIL: required term '{term}' not extractable")
        failed = True
for pat in BANNED_PATTERNS:
    if pat in text:
        print(f"FAIL: ligature artifact '{pat}' found")
        failed = True
if not failed:
    print("PASS: PDF text extraction clean")
    sys.exit(0)
else:
    sys.exit(1)
PYTHON
```

## Fix

If extraction fails:
1. Disable ligatures in the PDF generator: `font-variant-ligatures: none`
2. Use extraction-safe fonts (IBM Plex Sans, Inter, Arial) for body
3. Re-run extraction check
4. Block publication until check passes

## CI Integration

Add to `.github/workflows/a11ygate.yml`:

```yaml
- name: PDF extraction check
  run: |
    for pdf in $(find . -name "*.pdf" -not -path "*/node_modules/*"); do
      python3 scripts/pdf-extraction-check.py "$pdf" || exit 1
    done
```

## Current Status

- Worker CSS: ligatures disabled ✅
- Access Proof Packet PDF: extraction not yet verified ⬜
- CI workflow: not yet added ⬜
