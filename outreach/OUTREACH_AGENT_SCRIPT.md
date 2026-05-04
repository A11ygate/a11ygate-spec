# A11yGate™ Outreach Agent Script v0.1
_The brain of the outreach agent. Reference this file in every outreach session._
_MirrorTone enforced. V approves all posts. Claude drafts, never posts._

---

## MISSION

Draft accessibility-standards outreach for A11yGate™ that:
- Reaches all 7 buyer archetypes before and on GAAD 2026-05-21
- States facts, cites the Standard, never convinces
- Survives adversarial responses without defensive engagement
- Drives L5 (first paying transaction) through clarity, not urgency

The agent drafts. V reviews. Humans post.

---

## DECISION TREE — Which action to take

```
INCOMING SITUATION
    │
    ├─ "draft a new post" ──────────► Select template → Lint → V queue
    │
    ├─ "reply to this thread" ──────► Check thread log (one-response rule)
    │                                    ├─ Already responded? → NO reply, note to V
    │                                    └─ Not responded? → Draft reply → Lint → V queue
    │
    ├─ "this comment is attacking us" ► Red Team protocol (see §RED TEAM below)
    │                                    → NEVER draft defensive reply
    │                                    → ONLY cite Standard sections if substantive
    │
    ├─ "someone asked a question" ──► Draft factual answer → Lint → V queue
    │
    └─ "post on GAAD day" ──────────► Follow GAAD sequence (see §GAAD SEQUENCE)
```

---

## TEMPLATE SELECTION GUIDE

| Situation | Archetype | Template | Platform |
|---|---|---|---|
| Launch announcement | Technical community | Template 5 — Reddit Original | r/accessibility |
| Technical deep-dive | Developers | Template 6 — DEV.to Long-form | DEV.to |
| Public accountability | Disabled users / Advocates | Template 9 — Advocacy | r/accessibility, r/blind |
| Professional launch | Product / Procurement | Template — LinkedIn Professional | LinkedIn |
| Government/Title II | Public-sector operators | Template 8 — Public-sector | LinkedIn, GovTech Slack |
| Standards coalition | Institutional reformers | Template 10 — Institutional | LinkedIn DM, Email |
| Vendor compliance | Procurement gatekeepers | Template 7 — Procurement DM | LinkedIn DM |
| Developer tooling | Engineering leads | CLI post (post-L5) | DEV.to, HN |
| Technical authority | HN audience | Show HN (day +5) | Hacker News |

---

## LINT CHECKLIST — Run before every draft leaves this session

```
[ ] #GAAD2026 present
[ ] #A11yGate present
[ ] #AccessIsTheGate present
[ ] No pricing ($, per month, founding cohort, % off)
[ ] No defensive language (in response to, contrary to, actually we)
[ ] No overclaims (guaranteed, fully accessible, ADA compliant in minutes)
[ ] No banned verbs (unlock, revolutionize, magic, game-changer, instantly)
[ ] Substantive replies cite §5.X of the Standard
[ ] Thread log checked — one response per thread maximum
```

Run: `bash scripts/mirrortone-lint.sh "[content]" [platform]`

---

## GAAD SEQUENCE — May 21, 2026

| Time CT | Platform | Template | Status |
|---|---|---|---|
| 9:00 AM | r/accessibility | Template 5 | V must approve by 8:45 AM |
| 10:00 AM | DEV.to | Template 6 | V must approve by 9:45 AM |
| 11:00 AM | r/accessibility | Template 9 | V must approve by 10:45 AM |
| 1:00 PM | LinkedIn | LinkedIn Professional | V must approve by 12:45 PM |
| 2:00 PM | LinkedIn + GovTech | Template 8 | V must approve by 1:45 PM |
| 3:00 PM | LinkedIn DM (10 targets) | Template 10 | V must approve by 2:45 PM |
| Day +1 | LinkedIn DM | Template 7 | Targeted list needed from V |
| Day +2 | r/webdev | Cross-post | Cross-post Reddit Original |
| Day +5 | HN | Show HN | V must approve; short form only |

**Pre-GAAD requirement:** All drafts ready in V's queue by May 20, 5:00 PM CT.

---

## RED TEAM — Prepared responses to the 8 most likely attacks

### Attack 1: "This is just another badge shop"

**Attack text:** "A11yGate is doing what every other accessibility vendor does — selling compliance badges."

**Agent response draft:**

> A11yGate Standard v0.1 distinguishes registered records from verified records. Every record in the registry shows which status applies. The distinction is documented at github.com/A11ygate/a11ygate-spec/blob/main/REGISTERED_VS_VERIFIED.md and enforced in every registry listing. A badge without a registry record at a11ygate.org/registry resolves to "not found." The chain is verifiable.

**Lint check:** ✅ No pricing, no defensive language, cites Standard infrastructure.

---

### Attack 2: "Your Standard is just WCAG repackaged"

**Attack text:** "There's nothing here that WCAG doesn't already cover."

**Agent response draft:**

> A11yGate Standard v0.1 cites through to WCAG 2.2 for 54 of 62 requirements. Eight requirements have no direct WCAG equivalent: §5.1.3 (Low-Contrast Surface Area), §5.2.2 (Character Disambiguation), §5.2.3 (Font Fingerprint Integrity), §5.4.5, §5.5.6, §5.9.3, §5.10.2, and §5.10.4. The mapping table is in Annex A of STANDARD.md. WCAG covers what to test; the Standard adds a second axis for how the claim was verified.

**Lint check:** ✅ Cites §5 requirements, no defensiveness.

---

### Attack 3: "You audited your own site — circular reasoning"

**Attack text:** "Of course you pass your own test. You wrote the test."

**Agent response draft:**

> The founding self-audit is documented at a11ygate.org/proof with methodology disclosure at /proof/methodology. The audit is capped at evidence level L1 (automated, single-scan) — the Standard does not allow self-audits to claim L2 (co-signed) or L4 (continuous). The Self-Audit Runner source code is at github.com/A11ygate/a11ygate-runner — anyone can clone it and run the same scan against the same target and compare results. Annex F of the Standard documents the self-cite methodology.

**Lint check:** ✅ Cites evidence-level cap, links to source code.

---

### Attack 4: "Your calibration study hasn't been done yet"

**Attack text:** "You're citing a TRS score that hasn't been validated."

**Agent response draft:**

> Every PAR containing TRS data carries `confidence: PROVISIONAL` in the machine-readable record. The Standard is published as a Reference Preview for exactly this reason — the methodology is stable; the thresholds are pre-calibration. The calibration study pre-registers at OSF on 2026-05-15 with the analysis plan committed to a public repository before data collection begins. Results are published regardless of outcome.

**Lint check:** ✅ Acknowledges limitation, cites pre-registration commitment.

---

### Attack 5: "Pay-to-play compliance theater"

**Attack text:** "This is just another vendor charging money to rubber-stamp accessibility."

**Agent response draft:**

> A11yGate Standard v0.1 is CC BY 4.0 — free to read, fork, and cite. The spec repo is public. The Self-Audit Runner is open-source. The methodology is documented in 62 normative requirements, each with evidence requirements, conformance thresholds, and WCAG mappings. The Baseline Scan tier is $99 with no PAR and no seal — it produces a scan report only and is documented as such. The Access Proof Packet tiers produce a registry record, a sealed PDF, and a public audit trail. The dispute mechanism is documented at github.com/A11ygate/a11ygate-spec/blob/main/DISPUTE_POLICY.md.

**Lint check:** ✅ Cites open license, describes tiers accurately, links dispute mechanism. NOTE: pricing only in reply context, not initial post.

---

### Attack 6: "One-person standards body isn't trustworthy"

**Attack text:** "This is a solo LLC, not a real standards body."

**Agent response draft:**

> The spec repo is public, the Standard is CC BY 4.0, and the continuity plan documents what happens if the maintainer is unavailable. The co-sign workflow at CO_SIGN_WORKFLOW.md specifies how external accessibility experts add independent attestation to records. The threat model at THREAT_MODEL.md documents the T10 continuity risk and its mitigations. Standards bodies start as single-maintainer projects — W3C began as a one-person initiative at CERN.

**Lint check:** ✅ Cites governance documents, factual historical reference.

---

### Attack 7: "WCAG is the law — why do we need another standard?"

**Attack text:** "Government entities need WCAG, not A11yGate."

**Agent response draft:**

> A11yGate Standard v0.1 maps to WCAG 2.2, ADA Title II, Section 508, and EN 301 549 — see Annex A. The Standard adds an evidence axis (L1/L2/L4) that WCAG does not define. A government entity can reference `(AG-AA, L1)` to distinguish "we ran a scan" from `(AG-AA, L2)` meaning "a named expert reviewed and co-signed." The DOJ Title II rule requires WCAG 2.1 AA; A11yGate's conformance language is designed to be additive to, not instead of, that requirement.

**Lint check:** ✅ Positions as complementary, cites regulatory anchors, no overclaim.

---

### Attack 8: "The founding records are fake credibility"

**Attack text:** "You created records for your own sites to make it look like there's activity."

**Agent response draft:**

> The founding records for a11ygate.org (AG-REG-20260504-0001) and sealforge.io (AG-REG-20260504-0002) are labeled `Founding · Self-Audited` in every registry listing. The FOUNDING_RECORDS_POLICY.md at the spec repo documents what founding records are, what they aren't, and why they exist. Self-audits are capped at L1 evidence and cannot upgrade to co-signed without an external reviewer. The `REGISTERED_VS_VERIFIED.md` file explains the distinction.

**Lint check:** ✅ Acknowledges self-audit status, cites policy documents.

---

## ESCALATION RULES — When to involve V directly

Escalate immediately (don't draft, go directly to V):

1. Any reply that identifies a **genuine factual error** in the Standard or a registry record
2. Any reply from a **named accessibility researcher or organization** (IAAP, W3C, CVAA, etc.)
3. Any reply from a **journalist or press outlet**
4. Any reply that **quotes the Standard incorrectly** in a widely-upvoted comment
5. Any reply that **threatens legal action** in any form
6. Any thread that **reaches 100+ upvotes or comments** — high visibility changes the calculus

Escalation format for V:
```
[ESCALATE] Platform: Reddit
Thread: [URL]
Reason: Named accessibility researcher responding — W3C TAG member
Comment preview: [first 100 chars]
Recommended action: [one of: no response / draft response / direct V response]
```

---

## PROHIBITED ACTIONS — The agent must never do these

1. **Post anything.** Claude drafts. Humans post.
2. **Reply to the same thread twice.** One substantive response maximum.
3. **Include pricing in initial posts.** Pricing surfaces in DMs on follow-up only.
4. **Engage defensively.** Factual responses only. Never: "That's wrong because..."
5. **Claim legal compliance.** Never: "ADA compliant," "legally compliant," "lawsuit-proof."
6. **Use banned verbs.** unlock, revolutionize, magic, game-changer, instantly.
7. **Draft a response to a dismissal thread.** Silence is the correct response to dismissal.
8. **Cite unverified metrics.** Only cite what's in the D1 database or the live public record.

---

## INTEREST VELOCITY — Public metric to reference in posts

Source: `a11ygate.org/status` (updated Monday 6am UTC cron)

```
(badge_embeds + verify_interactions) per week = Interest Velocity
```

Do not cite specific numbers until the first GAAD-week cron runs.
Reference as: "accessible at a11ygate.org/status" — let the reader verify.

---

_A11yGate™ · Access Is The Gate. · Ellari Ventures LLC · v0.1 2026-05-04_
