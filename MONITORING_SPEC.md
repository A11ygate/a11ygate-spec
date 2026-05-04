# A11yGate Monitoring Specification
_Version: 0.1_
_Status: Canonical_

---

## Purpose

Accessibility is not a launch event. It is a maintenance obligation.
The monitoring system enforces this: records expire, drift is detected,
and seals update to reflect current state.

---

## Monitoring Types

### Client-Side Monitoring (Organization)

Organizations may run:
- A11yGate CLI scans (mirror-a11y)
- GitHub Actions accessibility gates
- CI/CD pre-release checks
- Scheduled URL scans
- Renewal reminders via registry

```bash
# Compare against last seal
mirror-a11y scan --type wcag-aa https://yoursite.com --compare-to AG-SEAL-20260504-0001
```

If new B0 or B1 barriers detected → fail the build.

### A11yGate-Side Monitoring (Internal)

A11yGate may run:
- Random spot checks
- Quarterly sample audits
- Drift detection
- Registry status checks
- Badge status refreshes
- Expiration monitoring

---

## Cron Schedule

```toml
[triggers]
crons = [
  "0 6 * * 1",     # Monday 6am UTC — scan records expiring in < 60 days
  "0 0 1 * *",     # 1st of month — random spot check 15% of active registry
  "0 0 1 */3 *"    # Quarterly — full registry scan + draft published report
]
```

---

## Deterministic Random Audit Selection

```python
import hashlib

def quarterly_audit_cohort(registry_ids, year, quarter, pct=0.15):
    """Select deterministic 15% of registry for quarterly spot check."""
    seed = f"{year}-Q{quarter}"
    ranked = sorted(
        registry_ids,
        key=lambda rid: hashlib.sha256(f"{rid}{seed}".encode()).hexdigest()
    )
    cutoff = int(len(ranked) * pct)
    return ranked[:cutoff]
```

This methodology is published and verifiable. Anyone can reproduce the cohort
for any given quarter using public registry IDs.

---

## Drift Result Categories

| Category | Meaning | Action |
|---|---|---|
| `no_drift` | No detectable change since last audit | Status: current |
| `minor_drift` | B3–B4 class changes only | Log; flag at renewal |
| `conditional_drift` | B2 changes detected | Flag for review; notify org |
| `access_blocker` | B0 or B1 detected | Suspend seal; 30-day notice |
| `evidence_unavailable` | Site down, auth wall, or scan error | Log; retry next cycle |
| `under_dispute` | Dispute submitted | Status: under_review |

---

## Monitoring Status Values

| Status | Meaning |
|---|---|
| `current` | No material drift since last audit |
| `drifted` | New detectable barriers; below reaudit threshold |
| `degraded` | New B0/B1 barriers; reaudit required |
| `unknown` | Scan failed (site down, auth wall, scan error) |
| `spot_check_due` | Selected in quarterly random cohort |

---

## Status Update Rules

- `access_blocker` may trigger `under_review` or `revoked`
- `expired` records must show `expired` status badge
- `waived` findings must include owner, reason, and expiration/remediation date
- No silent exceptions

---

## Annual Report

A11yGate publishes an annual summary:

- Total registry records (by tier)
- Verified / conditional / registered counts
- Expired records
- Revocation count and reason codes
- Random audit outcomes and pass rate
- Top barrier categories across the registry
- Average remediation time
- New registrations

This is a public-interest standards body output, not a marketing document.
