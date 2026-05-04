# Domain Binding Receipt — 2026-05-04
_Classification: Public ops record_

## Status: Complete

Custom Workers have been wired. `a11ygate.org` resolves to the A11yGate public surface.
Confirmed: "Access Is The Gate." · correct identity · no console language.

## Canonical Bindings

| Domain | Target | Type |
|---|---|---|
| a11ygate.org | a11ygate-web | Primary public authority |
| a11ygate.com | a11ygate-web | 301 redirect |
| a11ygate.io | a11ygate-web (/install) | 301 developer redirect |
| sealforge.io | sealforge-api | Verification infrastructure |
| sealforge.app | sealforge-redirect | 301 → sealforge.io |

## Worker Version

Live: `5be74de3-9361-4c61-94fd-71d3e8cf7acd`
Size: 69.24 KiB
workers.dev smoke: 39/39 ✅

## Canonical Smoke Test Required (next gate)

Run from terminal:

```bash
node governance/smoke-test.js https://a11ygate.org
```

Then verify v3.2 routes:

```bash
curl -s -o /dev/null -w "%{http_code}" https://a11ygate.org/status
curl -s -o /dev/null -w "%{http_code}" https://a11ygate.org/registry/domain/a11ygate.org
```

And verify redirects:

```bash
curl -sI https://a11ygate.com/ | grep location
curl -sI https://www.a11ygate.org/ | grep location
```

## Result

Domain binding complete.
Canonical smoke test is the new gate before public outreach.

## Next Gate After Canonical Smoke

1. Create canonical smoke receipt
2. Commit ops/launch-gate pack to main
3. Merge brand/realignment-v1 to main
4. Publish self-audit PAR at /proof
5. Begin L5 outreach — GAAD window: 2026-05-21
