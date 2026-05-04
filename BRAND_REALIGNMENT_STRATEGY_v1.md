# A11yGate Brand Re-Alignment Strategy v1.0

**Reply Title:** Brand Re-Alignment — System-Wide Strategy + MirrorSolveRT
**ISO Date/Time:** 2026-05-04T00:00:00-05:00
**Platform:** Anthropic / Claude
**Owner:** Ellari Ventures LLC
**Thread Title:** A11yGate Brand Re-Alignment Strategy
**Hashtags:** #A11yGate #BrandSpec #MirrorSolveRT #AccessIsTheGate #PAR #SealForge

---

## I. Executive Summary

The workspace contains **three converging canons** that have not yet been formally reconciled across every product surface:

1. **Brand Book v3 (5/4/26, 1009a)** — A11yGate as accessibility *standards body + verification layer*. Tagline locked: **"Access Is The Gate."** Eight-color palette, four-tier typography, seven values, named product ladder.
2. **Font Strategy v3 (5/4/26, 1008a)** — A11yGate Reference Font as a *measurement instrument*, not a brand font. TRS, DVS, Font Fingerprint, Render Delta, Enforcement Mode locked as canonical product names.
3. **v1.2 Canonical Binder** — Five gate states (`pass | conditional_pass | fail | waived | expired`), expanded manifest schema, evidence bundle, governance doctrine, no silent waivers.

The brand is currently **partially aligned**: the Worker (`a11ygate-web`) was rebuilt against the Brand Book on 5/4 (commit `cea12735`), `BRAND_SPEC.md v2.0` was drafted, and the v1.2 spec was tagged. **But the alignment has not propagated to the rest of the surface area.** The Notion wiki, the org profile README, the `a11ygate-site` Pages project, the seal preview, the registry backend, and four of the five domain-binding actions remain in pre-Brand-Book state.

**This strategy delivers:** (a) a complete inventory of every product surface that must be touched, (b) the exact propagation order, (c) MirrorSolveRT countermeasures for every weakness identified across the three canons, and (d) the high-leverage upgrades that compound — features that turn the brand re-alignment into a moat rather than a refresh.

**STOP gate honored.** Every recommendation is L5-compatible: no new architecture, no new tiers, no new frameworks. This is propagation and hardening, not invention.

---

## II. Canonical Settings — The Locked Spec

These are the values every artifact must conform to. If a surface deviates, the surface is wrong, not the spec.

### II.1 Strategic Canon (Brand Book §1–§4)

| Field | Value |
|---|---|
| Canonical name | A11yGate™ |
| Pronunciation | "Ally Gate" |
| Category | Accessibility Standards Body + Verification Layer + Deployment Gateway |
| Parent ecosystem | ELLARI / EMET Stack™ / ELEOS Standards Layer |
| Maintained by | Ellari Ventures LLC |
| Brand thesis | Accessibility is not a feature. Accessibility is a gate. |
| Core belief | A system that cannot be accessed cannot be trusted. |
| **Primary tagline** | **Access Is The Gate.** |
| Canonical one-liner | A11yGate™ verifies whether digital systems are accessible enough to trust. |
| Expanded one-liner | A11yGate™ is a standards, testing, and certification layer for digital accessibility — built for organizations that need proof, not vibes. |
| Challenge-page tagline | If They Can't Use It, It Doesn't Work. |
| Enterprise tagline | Accessibility, Proven. |

### II.2 Color Palette (Brand Book §10) — All Eight, Locked

| Role | Name | Hex | Use |
|---|---|---|---|
| Ground | Mirror Black | `#1A1A1A` | Text, authority, high contrast |
| Surface | Soft Cream | `#F9F6F1` | Backgrounds, reports, landing pages |
| Signal | Clarity Gold | `#D6B168` | Rules, seals, dividers (decorative only — NEVER body text) |
| Access Blue | Civic Blue | `#2F6FED` | Links, focus states, interactive cues |
| Pass Green | Verified Green | `#2E7D5B` | Passed checks, verified states |
| Alert Amber | Remediation Amber | `#B7791F` | Needs review, partial pass |
| Fail Red | Barrier Red | `#A63A3A` | Blocked access, failed gate |
| Neutral Gray | Audit Gray | `#6B7280` | Metadata, secondary copy |

**Memory delta to fix:** the user-memories file lists Cream as `#f5f2ec` and a deeper Gold `#7a5a00`. These are the **MirrorSeal v1 (Release Hardening)** values — print-safe, AA-verified for body text. The Brand Book lists the lighter `#F9F6F1` cream and `#D6B168` decorative gold. **Reconciliation rule:** Brand Book hexes apply to digital surfaces (web, dashboard, seal renders). MirrorSeal hexes apply to PDF / print / formal documents that must pass body-text contrast. Both must be encoded in `BRAND_SPEC.md` v2.1 as named tokens.

### II.3 Typography (Brand Book §11) — Four Tiers

| Tier | Font | Use |
|---|---|---|
| Headings | Playfair Display *or* Cormorant Garamond | Authority, brand continuity, sparing |
| Body | Source Serif 4 *or* Georgia *or* Charter | Readable, formal, warm |
| UI / Dashboard | IBM Plex Sans *or* Atkinson Hyperlegible *or* Inter | Tools, forms, dashboards |
| Code / Technical | IBM Plex Mono *or* JetBrains Mono | Scan logs, IDs, CLI output |

**Brand-vs-instrument separation (Font Strategy §0):**

```
Layer 1 — Brand typography:   Playfair Display + Source Serif 4 + IBM Plex Sans
Layer 2 — Reference instrument: A11yGate Reference Font (Atkinson fork, OFL-1.1)
Layer 3 — UI render font:     Source Serif 4 / IBM Plex Sans / IBM Plex Mono
```

These are **three different things serving three different functions**. The Reference Font is a *measurement instrument*, not a brand font. This must appear as `§0 Font System Architecture` in `font-spec.md` to prevent the recurring confusion.

### II.4 Voice — MirrorTone (Brand Book §9)

**Formula:** Plain English + Standards Authority + Operational Proof.
**Principle:** State, don't convince.

**Approved verbs:** mapped to · tested against · reviewed for · verified within scope · remediation tracked · evidence retained · seal issued for defined criteria.
**Banned verbs:** unlock · revolutionize · guarantee · fully accessible · ADA compliant in minutes.

### II.5 Product Names — Canonical (Brand Book §7 + Font Strategy §)

| Surface | Name | Status |
|---|---|---|
| Seal | A11yGate Verified™ | Canonical |
| Registry | A11yGate Registry™ | Canonical |
| Audit Packet | Access Proof Packet™ | Canonical |
| Enterprise Program | A11yGate Assurance™ | Canonical |
| Developer Tool | A11yGate CLI™ | Canonical |
| AI Review | AI Access Gate™ | Canonical |
| Remediation Workflow | Barrier Queue™ | Canonical |
| Standard Doc | A11yGate Standard™ | Canonical |
| Public Demo | Can They Use It?™ | Canonical |
| Reference Font | A11yGate Reference Font™ | Canonical |
| Audit Engine | A11yGate Font Audit™ | Canonical |
| Score | Typography Risk Score™ / TRS | Canonical |
| Fingerprint | Font Fingerprint™ | Canonical |
| Render Diff | Render Delta Report™ | Canonical |
| Validation Set | Disambiguation Validation Set / DVS | Canonical |
| Enforcement | A11yGate Enforcement Mode™ | Canonical |
| Module 1 | Verified Readability Module™ | Canonical |
| Subcategory | Verified Readability Infrastructure™ | Subcategory only |
| Proof Record | Proof-of-Accessibility Record (PAR™) | Canonical |
| Manifest envelope | mprv:a11y_status (in MirrorReceipt) | Canonical |

### II.6 Gate States (v1.2 Canonical Binder §4)

```
pass | conditional_pass | fail | waived | expired
```

**Rule:** No silent waivers. Every `waived` record requires `waiver_owner`, `waiver_reason`, and one of `{expiry_at, remediation_due}`. The cron downgrades stale waivers to `expired`.

---

## III. Surface Inventory — Where the Brand Lives

Twenty-three surfaces, grouped by propagation tier. Each row identifies (1) current state, (2) Brand Book delta, (3) action class.

### III.1 Tier 1 — Already Aligned (Verify Only)

| Surface | Current | Delta | Action |
|---|---|---|---|
| `a11ygate-web` Worker (`cea12735`) | Brand Book v3 compliant | None known | Self-audit before any further edits |
| `a11ygate-spec` repo `v1.2.0` tag | Canonical binder shipped | None | Verify checksums against `Release_Manifest.json` |
| `a11ygate_audits` D1 schema | Five gate states + waiver columns | None | Verify `a11ygate_waiver_violations` view is queryable |
| `BRAND_SPEC.md v2.0` (drafted) | Locked but unpushed in some sessions | Memory says pushed; repo confirms ⏳ | Confirm push to `A11ygate/a11ygate-spec` |
| Three cron triggers (Mon 6am UTC; 1st of month; quarterly) | Live | None | Verify cron logs in `a11ygate_cron_runs` |
| Six Stripe Payment Links | Reconciled, $29 bundle merged | None | Self-audit at L5 cutover |

### III.2 Tier 2 — Drift Detected (Re-Align)

| Surface | Current | Delta | Action |
|---|---|---|---|
| `A11ygate/.github` org profile README | "Typography verification infrastructure" | Wrong category — must be "accessibility proof infrastructure" | Replace with v2 org profile |
| Notion product wiki (opening block) | Pre-Brand-Book positioning | Old tagline + framing | Manual replace_content with full canonical block |
| `a11ygate-site` Pages project | Failing build, holds three domains hostage | Should be detached or archived | Detach `.org/.com/.io` → bind to `a11ygate-web` Worker |
| `a11ygate.org` custom domain | Still routes to failing Pages | Should route to Worker | One CF dashboard action |
| Site `BRAND_SPEC.md` reference | v1.0 in memory; v2.0 drafted | Need v2.1 with MirrorSeal print palette + Font System Architecture §0 | Bump and commit |
| `font-spec.md` | Lacks `§0 Font System Architecture` | Three-layer model unstated → engineering confusion | Add §0 before any further font work |
| Seal preview on landing | Static HTML mockup | Should resolve to live PAR record | `/seal-preview?id={par_id}` route + D1 query |
| `/registry` search form | HTML only, no backend | Need handler | `GET /api/par?id={value}` → D1 → JSON |
| `/challenge` "Run Access Check" CTA | `mailto:` placeholder | Should be live scan | Wire CF browser-rendering binding + axe-core |

### III.3 Tier 3 — Missing (Build)

| Surface | Why It Matters | Source |
|---|---|---|
| `MODULES.md` in spec repo | Prevents font system from hijacking master identity | Brand Book §A11yGate Modules |
| `CATEGORY_POSITIONING.md` | Reconciles "accessibility proof infrastructure" (master) vs "Verified Readability Infrastructure" (sub) | Brand Book §category stack |
| `TRS_CALIBRATION_PLAN.md` | TRS weights are provisional — citation in legal contexts is unsafe without it | Font Strategy §9 |
| `PDF_EXPORT_INTEGRITY.md` | A11yGate cannot ship PDFs that fail text extraction (e.g. `veri7cation`) | Font Strategy §10 |
| `FIRST_10_AUDITS_PLAYBOOK.md` | Manual audits = first revenue + first proof + first case studies | Font Strategy §11 |
| `DATA_MOAT_SCHEMA.md` | The real moat is accumulated failure/fix data | Font Strategy §12 |
| `A11YGATE_ARCHITECTURE_CANON.md` | Constitution doc — registered vs verified, claims policy, monitoring spec | Brand Book §"Next Spec Pack" |
| `Access Proof Packet™` template | Counsel/procurement-ready deliverable; tier 3 product | Brand Book §28 ranked next moves |
| `Vendor Procurement Checklist` | High B2B leverage, weak SEO competition | Brand Book §28 ranked next moves |
| `A11yGate vs Overlay Widgets` explainer | Strong differentiation + SEO | Brand Book §28 ranked next moves |
| `/verified-readability` page | Houses the typography subcategory; bridges to font module | Brand Book §High-Value Pages |
| `/badges` page | Most viral element; deserves an explainer | Font Strategy O4 |
| Self-audit `/proof` page | a11ygate.org passing its own A11yGate scan, published | Font Strategy O2 |
| `interest_events` Worker wiring | KPI engine starts populating from first page load | POI Engine + sigwell-ops |
| Glossary terms: `mprv:a11y_status`, `mirrorreceipt`, `ritual-receipt`, `gate-state`, `waiver`, `upm`, `supersedes`, `mirror-a11y-cli`, `interest-velocity` | All canonical, none currently in `sf_glossary` | Font v3 disconnect analysis |

---

## IV. Propagation Strategy — Phased Rollout

Sequenced for minimum risk, maximum compounding. Each phase ends with a self-audit gate. **No phase begins until the prior phase passes its own A11yGate scan.**

### Phase 0 — Lock the Spec (Day 0, ~2 hours)

The spec is the source of truth. Nothing propagates correctly without it locked.

```bash
# 0.1 — Bump BRAND_SPEC to v2.1 with MirrorSeal print palette + Font System Architecture
cd ~/Desktop/a11ygate-spec
# (edit BRAND_SPEC.md: add §3.1 Print Palette, §11.0 Font System Architecture)
git add BRAND_SPEC.md
git commit -m "brand: BRAND_SPEC v2.1 — print palette + font system §0"

# 0.2 — Add MODULES.md
cat > MODULES.md << 'EOF'
# A11yGate™ Modules
A11yGate is modular accessibility proof infrastructure.
## Module 1 — Verified Readability (Reference Preview v0.1)
EOF

# 0.3 — Add CATEGORY_POSITIONING.md (reconciles master vs sub)
# 0.4 — Add font-spec.md §0 Font System Architecture
# 0.5 — Add TRS_CALIBRATION_PLAN.md
# 0.6 — Add PDF_EXPORT_INTEGRITY.md

git add -A
git commit -m "spec: lock category positioning, modules, TRS calibration, PDF integrity"
git tag v1.2.1
git push origin main --tags
```

**Phase 0 self-audit:** Run `wcag-contrast` on every hex pair documented. Run `extract-text` against any PDF artifact. Confirm v1.2.1 tag resolves on GitHub.

### Phase 1 — Domain Routing (Day 0, ~5 minutes, dashboard only)

This unblocks all public-facing alignment. Until done, no one sees the Brand Book–compliant Worker.

1. CF Dashboard → Workers & Pages → `a11ygate-site` → Settings → Custom Domains → **remove** `a11ygate.org`, `a11ygate.com`, `a11ygate.io`.
2. CF Dashboard → `a11ygate-web` → Custom Domains → **add** all three.
3. Wait ≤2 min for cert propagation. Verify `curl -I https://a11ygate.org` returns 200 with the Worker's `cf-ray`.
4. (Optional) Delete the dormant `a11ygate-site` project to remove error noise.

**Phase 1 self-audit:** All four URL variants (apex, www, .com redirect, .io redirect) resolve to the Brand Book–compliant Worker. The dynamic-path-preserving redirect from `.com` is intact.

### Phase 2 — Surface Re-Alignment (Days 1–2, ~3 hours)

Fix every Tier-2 drift. Order matters: outer → inner, public → internal.

1. **Org profile README** — replace with v2 ("Access Is The Gate.")
2. **Notion product wiki** — manual `replace_content` of the opening block with the full canonical positioning. Confirm with the user what the current opening string is so a `find_and_replace_text` can target it.
3. **Site `/registry` backend** — wire `GET /api/par?id={value}` to `a11ygate_par_registry` D1 table. Return JSON. Display inline.
4. **Site `/seal-preview?id={par_id}`** — render real seal from PAR row. Replace static example with the first real seal generated from the self-audit.
5. **`interest_events` wiring** — on every `/challenge` and `/registry` page load, `INSERT INTO interest_events (event_type, source, product, par_id) VALUES (...)`. KPI engine starts here.
6. **Glossary backfill** — seed nine missing terms into `sf_glossary` (sealforge-db).
7. **`a11ygate-site` Pages project** — once domains are detached, archive or delete.

**Phase 2 self-audit:** Run a full A11yGate scan on `a11ygate.org/`. The result must be `pass` or `conditional_pass`. Publish the report at `/proof` as the inaugural PAR.

### Phase 3 — Tier-3 Build (Days 3–7)

Build the missing surfaces in priority order:

1. **`MODULES.md`** + **`CATEGORY_POSITIONING.md`** — published in spec repo (already drafted in Phase 0; this confirms public visibility).
2. **`/verified-readability` page** on the Worker — houses the typography sub-category. Bridges Brand Book to Font Strategy.
3. **`/badges` page** — explains the seal system, color codes, embed snippets, live demo. Most viral element.
4. **Access Proof Packet™ template** — counsel-ready PDF. Generated by reportlab; sealed by SealForge.
5. **Vendor Procurement Checklist** — markdown + PDF; B2B-targeted.
6. **A11yGate vs Overlay Widgets explainer** — SEO-targeted; cites independent research on overlay widget complaints.
7. **`/challenge` live scan** — Worker calls CF browser-rendering binding + axe-core; returns barrier report with TRS overlay if typography module is selected.
8. **`FIRST_10_AUDITS_PLAYBOOK.md`** — first audit target list (a11ygate.org, sealforge.io, parent handbook sample, etc.).

**Phase 3 self-audit:** Re-scan `a11ygate.org/` end-to-end. Generate the second real PAR. Publish.

### Phase 4 — L5 Gate (Day 7+)

L5 = first external paying transaction. Gate triggers:

- All Phase 0–3 self-audits pass.
- First Reddit / DEV.to outreach post (MirrorTone templates exist).
- First inbound on Stripe.

After L5, the architecture freeze lifts and the post-L5 expansion roadmap (new tiers, new modules, new frameworks) becomes available.

---

## V. MirrorSolveRT — Weakness Neutralization

For every issue identified in the workspace, a strategy that prevents it from compounding.

### W1 — Tagline drift across the surface area

**Issue.** The Worker is now "Access Is The Gate." but at least three other surfaces (Notion wiki, org profile in some sessions, possibly internal docs) still carry "Prove Your Work Is Accessible. Instantly." or earlier framings.
**Risk.** Mixed taglines = unclear authority. Investors and procurement readers detect inconsistency immediately.
**Neutralize.** Single grep operation across every repo and Notion page for the old strings. Replace systematically. Add `tagline_check.yml` GitHub Action that fails CI if any banned string appears in the repo.

### W2 — Two color systems competing

**Issue.** Brand Book digital cream `#F9F6F1` vs MirrorSeal print cream `#f5f2ec`. Brand Book decorative gold `#D6B168` (banned for body) vs MirrorSeal AA-verified gold `#7a5a00` (safe for body).
**Risk.** Designer picks the wrong gold for a PDF body, ships an inaccessible artifact under the A11yGate brand. Catastrophic credibility hit.
**Neutralize.** Encode both palettes as named tokens in `BRAND_SPEC.md` v2.1:

```css
--ag-cream-digital: #F9F6F1;   /* web, app, dashboard */
--ag-cream-print:   #f5f2ec;   /* PDF, formal docs */
--ag-gold-decorative: #D6B168; /* rules, dividers, NEVER body text */
--ag-gold-text:       #7a5a00; /* body text, AA-verified */
```

Add a contrast-lint script to CI that fails if `--ag-gold-decorative` appears in a `color:` rule on a paragraph element.

### W3 — Two state systems conflated in one column

**Issue.** `a11ygate_audits.status` currently holds TRS bands (`certified | approved | conditional | risk | fail`) but the v1.2 binder says gate states should be (`pass | conditional_pass | fail | waived | expired`). These are different layers.
**Risk.** Audit-trail queries return TRS bands when they need gate states; reports cite the wrong concept.
**Neutralize.** Keep `status` for TRS band. Add `gate_state TEXT CHECK(gate_state IN ('pass','conditional_pass','fail','waived','expired'))` as a separate column. The 5/4 schema migration confirms this is now done — verify it propagates to every query and view.

### W4 — `mprv:a11y_status` vs `PAR™` are the same thing under different names

**Issue.** v1.2 binder uses `mprv:a11y_status`. Product copy uses `PAR™`. Glossary has `par` only.
**Risk.** Documentation contradicts itself. New engineers think these are two different artifacts.
**Neutralize.** Add to `sf_glossary` and `BRAND_SPEC.md`:

```
PAR™ (Proof-of-Accessibility Record) — the canonical proof artifact.
Manifest envelope: mprv:a11y_status (embedded in MirrorReceipt).
SealForge anchor: SHA-256 of the canonical record.
```

One concept, one name in user-facing copy (`PAR™`), one technical key in manifests (`mprv:a11y_status`).

### W5 — Reference Font is presented as the brand font

**Issue.** Some artifacts mention Atkinson Hyperlegible alongside Playfair Display as if they are the same layer.
**Risk.** Designers use the Reference Font for headings; the entire visual identity collapses into a clinical instrument-only look.
**Neutralize.** `font-spec.md §0 Font System Architecture` must be the first paragraph any new contributor reads. The three-layer model (Brand · Reference Instrument · UI Render) must appear in `BRAND_SPEC.md` §11 verbatim.

### W6 — Font Project hijacks master identity

**Issue.** Font work is technically defensible and gets disproportionate attention; risk is the public reads "A11yGate = font validator."
**Risk.** Loses the broader category (accessibility proof infrastructure for governed digital systems).
**Neutralize.** `MODULES.md` declares the font work as `Module 1 — Verified Readability`. Brand Book lists ~12 future modules (visual access, navigation, AT, forms, cognitive, document, mobile, auth, transaction, AI interface, evidence governance, remediation governance). The master category survives only if the module label is visible everywhere the font work is shown.

### W7 — TRS weights are provisional but cited as if calibrated

**Issue.** Current TRS formula is `(0.30·CA + 0.20·SS + 0.20·SCS + 0.15·SSR + 0.15·RDC) · P`. AG-DEC-0005 marks weights as `DRAFT — calibration pending`.
**Risk.** Citing TRS in a legal or procurement context before calibration creates credibility / liability exposure.
**Neutralize.** `TRS_CALIBRATION_PLAN.md` defines the calibration test (10 reference fonts: A11yGate Reference, Atkinson, Verdana, Arial, Helvetica, Georgia, Times New Roman, Courier New, OpenDyslexic, Noto Sans). Success criterion: Pearson `r > 0.80` against published legibility rankings. Until met, every PAR carries `confidence: PROVISIONAL` and reports footer the disclaimer.

### W8 — PDF export integrity is not enforced

**Issue.** A11yGate ships PDFs. Some PDF exporters break ligatures: `verification` → `veri7cation`, `definitions` → `de7nitions`. The brand's *thesis* is exportable accessibility — broken extraction undermines the entire pitch.
**Risk.** A single broken PDF in the wild discredits the standards body.
**Neutralize.** `PDF_EXPORT_INTEGRITY.md` policy + CI fixture. Every public PDF passes `pdftotext` extraction against required fixture terms (`definitions`, `verification`, `verified`, `finding`, `accessibility`, `compliance`, `scope`, `evidence`, `record`). CI blocks publication if any term fails.

### W9 — Internal console exposed at `a11ygate.org`

**Issue.** Per Brand Book §"Public Trust Surface" — earlier the root domain showed an ELEOS Reality Engine Console. Authority lost on first impression.
**Risk.** Public visitors form an "internal beta" perception. Procurement readers walk away.
**Neutralize.** Section order on `/`: Hero → Trust Bar (Maintained by · GitHub · SealForge · Standard status) → What A11yGate Does → Proof Chain → Gate States → PAR™ → Standards Map → Values → CTA. **No console UI at the root.**

### W10 — Cron-driven monitoring exists but has no public surface

**Issue.** Three crons fire (Mon 6am UTC; 1st of month; quarterly) and write to `a11ygate_cron_runs`. The data is not surfaced publicly.
**Risk.** Monitoring exists but no one knows. Trust signal wasted.
**Neutralize.** `/status` page that reads the latest cron run row and shows: last expiry sweep, last spot-check pull, last published-report draft. Plus a `/registry/domain/{domain}` route that shows the public PAR for any verified domain. The /status page should pass its own scan as the bar.

### W11 — Founding records can be confused with paid records

**Issue.** Self-issued PARs (`a11ygate.org`, `sealforge.io`) and externally-paid PARs share a registry. Founding status not flagged.
**Risk.** Public reads "two registered records" and thinks it's social proof. It's not — both are self-issued.
**Neutralize.** `founding_status` column on `a11ygate_par_registry`. Founding records show a `Founding · Self-Audit` badge in registry listings. Paid records show `Verified · External`. Per `FOUNDING_RECORDS_POLICY.md`.

### W12 — Leaked internal API key in past session briefs

**Issue.** Memory references `ag_sk_internal_a11ysys_4f9e2b7c1d3a8e0f` appearing in briefs and Notion.
**Risk.** Active credential in plaintext is a security incident.
**Neutralize.** Three actions: (a) `wrangler secret put SEALFORGE_INTERNAL_KEY --name a11ygate-web` rotates to a new key; (b) verify old key returns 401; (c) `secret-scan.yml` GitHub Action with gitleaks runs on every push to prevent recurrence. `SECRET_ROTATION_RECEIPT_2026-05-04.md` (private) records the rotation.

### W13 — Zapier silently fails on existing-file updates

**Issue.** Zapier's GitHub integration cannot update existing files without the file SHA. It fails silently. Memory already flags this.
**Risk.** Operations think a commit succeeded when it didn't (this is exactly how `BRAND_SPEC.md v1.0` was thought to be pushed but wasn't).
**Neutralize.** Hard rule: Zapier is for **new file creation only**. Updates go through GitHub web editor or local git. CI status badge on every repo confirms whether the latest commit landed. Add a release-receipt entry to every push so "I pushed it" is verifiable.

### W14 — `a11ygate-site` Pages project failing build holds three domains hostage

**Issue.** The Pages project at `TrueFormCoder/a11ygate-site` fails to build but still owns the domain bindings.
**Risk.** Until detached, the Brand-Book Worker is invisible to anyone visiting `a11ygate.org`.
**Neutralize.** Phase 1 of this strategy. Five-minute dashboard fix. Highest leverage / lowest cost action in the entire plan.

### W15 — Notion wiki opening copy is stale

**Issue.** The wiki opens with old positioning. Notion `update_content` can't find the exact strings to replace.
**Risk.** Internal team members reference the wiki as canon. Brand drift propagates.
**Neutralize.** Manual `replace_content` with the full canonical opening block. Capture the current opening string first, then issue a `find_and_replace_text` with verbatim new text. After the replacement, lock the page (Notion's lock feature) and require a comment for any future change.

### W16 — Schema split: SealForge envelope vs canonical record

**Issue.** Two schema systems exist — the v1.2 schema (citation-ready, DOI-pack) and a SealForge-optimized transport schema developed in parallel.
**Risk.** Audit output cited from the wrong schema. Hash mismatches between transport and canonical break verification.
**Neutralize.** Hard rule: v1.2 schema is the **canonical record**. SealForge schema is the **transport envelope**. SealForge anchor seals a SHA-256 of the canonical record. Encode the rule in `A11YGATE_ARCHITECTURE_CANON.md` and in the audit-report JSON as `canonical_schema_version: "1.2"` always.

### W17 — Domains owned but not yet productized (SealForge portfolio)

**Issue.** `sealforge.app`, `sealforge.io`, `axiscourt.app`, `anchorvault.io`, `sigilgate.com` are owned but not all bound or routed.
**Risk.** Investor data room links resolve; non-routed domains do not. Inconsistent surface.
**Neutralize.** Out of scope for the L5 gate but tracked. Each non-routed domain gets a one-line `/index.html` (Mirror Black + Cream Gold) with the brand thesis and a `coming soon · maintained by Ellari Ventures LLC` line. Five domains × five minutes each.

### W18 — Memory file references a "Gold-bright `#d6b168`" — same as Brand Book decorative

**Issue.** User memory says "Gold-bright `#d6b168` — explicitly banned from text use." Brand Book §10 lists `#D6B168` (Clarity Gold) as a decorative accent (rules, seals, highlights). They are the same color, but the memory ban is correct only for body text.
**Risk.** Designer reads "explicitly banned" and refuses to use it for legitimate decorative purposes (gold rule line, seal accent).
**Neutralize.** Update memory to: "Clarity Gold `#D6B168` — decorative only; never body text or interactive controls. Use `#7a5a00` (MirrorSeal AA Gold) for any text rendered in gold." Both colors are valid; their permitted use surfaces differ.

---

## VI. Powerful Upgrades — Compounding Features

These are the moves that turn the brand re-alignment from a refresh into a moat. Each one is L5-compatible (no new architecture) but each one compounds.

### U1 — Self-Audit Published as Inaugural PAR

`a11ygate.org` runs A11yGate's own scan against itself. Output published as the first PAR at `/proof`. The verification ID, scope, gate state, and exception count all visible. Anyone visiting can verify the standards body holds itself to its own standard.

**Effect:** Strongest possible trust signal. Cannot be faked. Becomes the demo every press piece links to.

### U2 — `Can They Use It?™` Live Demo

The `/challenge` page evolves from a static table to an interactive demo:

1. User reads ambiguous string in non-disambiguated font (`I1l0OO`).
2. User attempts to retype it.
3. Reveal: how many got it wrong.
4. Show same string in A11yGate Reference Font.
5. Show TRS delta.
6. Issue PAR for the comparison.
7. CTA: Run a Font Audit.

**Effect:** This is the bridge between the Brand Book ("Can They Use It?") and the Font Strategy (typography stress test). Single demo unifies both narratives.

### U3 — Badge Embed Network Effect

Every issued PAR comes with an embeddable SVG badge that links back to the registry record. Each badge embed is a backlink to `a11ygate.org` and an `INSERT INTO interest_events`. Badges become viral primitive: every customer site that uses one is free distribution.

**Effect:** Compounding traffic + registry validation + interest velocity, all from one badge.

### U4 — VC 2.0 Bitstring Status List Live

The `sf_status_list` and `sf_status_entries` tables exist. The endpoint `/v1/status/sealforge-revocation-v1` is unbuilt. Building it makes A11yGate seals interoperable with W3C VC 2.0 / wallet ecosystems.

**Effect:** A11yGate seals become first-class verifiable credentials. Procurement systems with VC 2.0 support consume them natively. The standard body framing becomes provably true.

### U5 — Glossary as SEO Surface

`sf_glossary` has 45 terms. Each term is a public route at `sealforge.io/glossary/{slug}` and `a11ygate.org/glossary/{slug}`. Each route is independently indexable, internally cross-linked, and serves as a long-tail SEO entry point for procurement / accessibility / readability searches.

**Effect:** 45 indexed pages, zero new copy needed beyond term definitions already drafted. Each one is an authority signal.

### U6 — Calibration as Public Research

When the TRS calibration study runs (W7 mitigation), publish the full dataset and methodology. 10 fonts × 5 categories × N renders = a public benchmark. This is exactly what researchers cite. Citations = procurement credibility.

**Effect:** Converts a private credibility chore (calibrating the score) into a public research artifact. Asymmetric upside.

### U7 — Dark Mode for Brand-Aligned Tools

Brand Book §10 maps cleanly to a dark variant: Mirror Black ground, Soft Cream text, Clarity Gold rules, Civic Blue links. `prefers-color-scheme: dark` on every public surface. Dark mode is table stakes for developer-facing tools and signals craft.

**Effect:** Modern aesthetic, no extra design work, ships today.

### U8 — Quarterly Public Status Report

The quarterly cron already drafts a published report. Auto-publish at `/reports/{YYYY-Q}/`. Each quarter: total PARs issued, gate-state distribution, average TRS, expirations, waivers granted, waivers downgraded to expired, top barriers found. Nothing proprietary; pure operational transparency.

**Effect:** Standards bodies publish status reports. A11yGate publishing them = A11yGate is, by behavior, a standards body.

### U9 — `Access Proof Packet™` as the L5 Wedge

The Brand Book's tier-3 product (`Access Proof Packet™`, $4,500–$9,500). Counsel-ready. Procurement-ready. Generated by reportlab + sealed by SealForge + entered into the registry.

**Effect:** First external paying transaction (L5) is most likely a procurement-ready PAR for a small-to-mid-sized vendor under ADA Title II pressure. Apr 24, 2026 deadline already triggered demand. Build the template once; sell repeatedly.

### U10 — Cross-Portfolio Asset Reuse

The Reference Font (Atkinson fork) doubles as cross-portfolio infrastructure:

- Sigwell — formal documents
- Caretide Systems — accessibility-critical surfaces
- ELARRI Institute — institutional reports
- KinderGurus (if active) — readability-first design

One artifact, five surfaces. The cost is amortized across the portfolio while the IP stays with Ellari Ventures LLC.

**Effect:** ROI on the font work multiplies across the entity portfolio. The fork is a portfolio asset, not a single-product asset.

### U11 — `interest_events` → Public Velocity Metric

Once `interest_events` is wired (Phase 2.5), publish `Interest Velocity` weekly: (verify_interactions + badge_embeds + report_downloads) per week. The number itself becomes social proof. Watchable. Trackable. Cite-able.

**Effect:** Converts internal KPI into public credibility flywheel.

### U12 — `MirrorTone` Lint for Outreach

Six outreach templates already exist in MirrorTone. Codify the rules (state-don't-convince, banned verbs, approved verbs) as a lint script. Any outreach copy run through the lint passes or fails. No more drift.

**Effect:** MirrorTone scales beyond one writer. Brand voice becomes mechanical, not curatorial.

---

## VII. Receipts — What Maps to What

A grep-able cross-reference for verifying alignment.

| Source canon | Lives in | Propagates to |
|---|---|---|
| Brand Book §1–§4 (canon) | `BRAND_SPEC.md §1` | Worker hero copy · Org README · Notion wiki |
| Brand Book §10 (palette) | `BRAND_SPEC.md §3` + CSS vars | Worker · PDF templates · Badge SVGs · Report HTML |
| Brand Book §11 (typography) | `BRAND_SPEC.md §11` + `font-spec.md §0` | Every render surface |
| Brand Book §22 (values) | `BRAND_SPEC.md §10` | Worker `/` Values section · About page |
| Brand Book §27 (one-liner) | `BRAND_SPEC.md §1.2` | Hero subheading · Org README · Wiki opening |
| v1.2 §4 (gate states) | `audit-report.schema.json` + `a11ygate_audits.gate_state` | Every PAR · Every CLI output · Every report |
| v1.2 §7 (manifest schema) | `audit-report.schema.json` v0.1.0 | CI validation · CLI output |
| Font Strategy §0 (architecture) | `font-spec.md §0` | Every contributor onboarding |
| Font Strategy §9 (TRS) | `TRS_CALIBRATION_PLAN.md` + AG-DEC-0005 | Every PAR with `confidence` field |
| POI Engine | `interest_events` D1 table | `/challenge`, `/registry`, `/proof` page-load INSERTs |

---

## VIII. Calendar — Deadlines This Strategy Must Respect

Per the active calendar-automation rule:

| Date | Event | Color | Status |
|---|---|---|---|
| 2026-04-24 | ADA Title II deadline | 🔴 Red (11) | Already passed; demand wave is now |
| 2026-05-21 | GAAD (recurring) | 🦚 Peacock (7) | Outreach window |
| 2026-06-01 | Mirror Protocol Intelligence LLC WY Annual Report | 🟡 Banana (5) | Filing reminder set |
| 2026-08-01 | Ellari Ventures LLC + Caretide Systems LLC WY Annual Reports | 🟡 Banana (5) | Filing reminder set |

Every deadline above is ALREADY on the calendar per active automation. No new entries required by this strategy unless a Phase 3 build creates one (e.g., calibration study target date).

---

## IX. Final Verdict

A11yGate has the canon. It has the Worker. It has the spec. It has the registry tables and the cron jobs and the glossary and the schema. **What it doesn't yet have is uniform propagation.**

This strategy delivers propagation in five phases over seven days, with a self-audit gate after each phase, MirrorSolveRT countermeasures for eighteen identified weaknesses, and twelve compounding upgrades that do not violate the L5 STOP gate.

The single highest-leverage action remains **Phase 1: domain re-binding** — five minutes in the CF dashboard. Until that fires, every other piece of work is invisible to the public.

After that: lock the spec, propagate the surfaces, build the missing artifacts, ship the self-audit PAR, post the first outreach. **L5 follows.**

> *Access Is The Gate.*
> Maintained by Ellari Ventures LLC.

---

**Document control**
- Source corpus: 33 workspace files including Brand Book v3 (5/4/26 1009a), Font Strategy v3 (5/4/26 1008a), v1.2 Canonical Binder, Release Hardening + MirrorSeal Standards, POI Engine Master Update, and the Claude–A11yGate Font v3 thread.
- Canonical settings derived from Brand Book §1–§28 + Font Strategy §0–§12 + v1.2 Binder §1–§12.
- Brand Spec target version: `BRAND_SPEC.md v2.1` (this strategy specifies the bump rationale).
- Spec repo target tag: `v1.2.1` (post-MODULES.md / CATEGORY_POSITIONING.md / TRS_CALIBRATION_PLAN.md / PDF_EXPORT_INTEGRITY.md commits).
