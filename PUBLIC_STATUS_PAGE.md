# A11yGate Public Status Page Policy
_Version: 0.1 · Status: Canonical_

## Purpose

Define what A11yGate's public status surface may and may not expose.
Prevents the console/debug leak pattern from returning in a different form.

## Public Status May Show

- Service status (operational / degraded / maintenance / incident / post-incident)
- Last successful deployment date
- Smoke test result (pass/fail count, no specific test names)
- Public route availability summary
- Registry availability
- SealForge handoff status
- Incident summaries (impact, duration, resolution — no technical details)
- Maintenance windows

## Public Status Must Not Show

- D1 table names
- Raw database IDs or account IDs
- Worker secrets or environment variables
- Internal route names (/api/d1, /console, /internal, etc.)
- Raw exception traces or error messages
- Private Notion IDs
- API keys (current or rotated)
- Full Worker version IDs
- Raw CF account numbers

## Status Levels

| Level | Meaning |
|---|---|
| `operational` | All systems normal |
| `degraded` | Partial functionality; primary flows available |
| `maintenance` | Planned downtime window active |
| `incident` | Active disruption; investigation in progress |
| `post-incident` | Incident resolved; review published |

## Implementation

Status should be served at `/status` as a simple public page.
The page should pull from a status record in D1 — not expose raw health check output.
The `/health` endpoint continues to return `{ok: true}` only.
Never proxy internal health data to the public status page.
