# A11yGate™ Co-Sign Workflow
_Version: 0.1 · Source: A11yGate Big Builds Volume II §VII_
_Status: Active — referenced in A11yGate Standard §7_

---

## Purpose

The co-sign workflow promotes a self-audit (evidence level L1) to a peer-reviewed audit (evidence level L2). L2 audits require a named external co-signer whose credentials are publicly verifiable. L4 (continuous monitoring) is operationally separate.

Without co-sign, A11yGate is a one-party standards body. With co-sign, the Standard becomes a multi-party artifact where other auditors can issue PARs. **Co-sign is what makes A11yGate a body.**

---

## Stage Flow

```
1. Self-Audit at L1
   Producer creates PAR + Access Proof Packet at L1.
   
2. Co-Sign Request
   Producer requests co-sign from a Recognized Co-Signer.
   Sends: evidence_bundle.zip, audit-report.json, packet PDF.
   
3. Co-Signer Review
   Co-Signer reviews evidence bundle and packet.
   Estimated: 4–8 hours for a typical website audit.
   
4a. Approve → Co-Sign Statement (see format below)
4b. Decline + documented reason → Producer remediates and retries.

5. New PAR at L2
   Co-Sign Statement added to evidence bundle.
   Registry record upgraded: evidence_level: L1 → L2.
   PAR ID remains; version incremented.
```

---

## Recognized Co-Signer Criteria

Anyone meeting the following criteria may self-register as a Recognized Co-Signer. Criteria are public; registration is open; A11yGate does not gatekeep.

**Required:**
- Documented professional accessibility practice (employer or self-employment) ≥ 24 months
- Public artifact establishing identity (LinkedIn, conference talk, published work, or equivalent)
- One of: IAAP CPACC, IAAP WAS, or equivalent credential; OR named expert on ≥ 1 prior A11yGate L2 audit (not chained recursively)
- Signing key: PGP key fingerprint published in `co-signers/` directory of spec repo, OR passkey-based attestation via `co-sign.a11ygate.org` (WebAuthn)
- Conflict-of-interest disclosure on file: no equity, no employment in the audit subject

**Registration:** Open a PR to `co-signers/YYYY-MM-DD-yourname.yaml` in `github.com/A11ygate/a11ygate-spec`. Template below.

---

## Co-Signer Registration Template

```yaml
# co-signers/YYYY-MM-DD-yourname.yaml
name: Jane Doe, IAAP-WAS
affiliation: Independent Consultant
pgp_fingerprint: A1B2 C3D4 E5F6 7890 ABCD  EF12 3456 7890 ABCD EF12
# OR: webauthn: true  (if using co-sign.a11ygate.org flow)
recognition_basis: IAAP-WAS certified 2023-04-15
public_artifact: https://example.com/jane-doe-accessibility-portfolio
registered: 2026-MM-DD
active: true
```

---

## Co-Sign Statement Format

```yaml
# co-sign-statement-v1.yaml
co_sign:
  par_id: AG-REG-YYYY-NNNN
  subject: example.com
  conformance_claim:
    level: AG-AA
    evidence_level: L2

co_signer:
  name: Jane Doe, IAAP-WAS
  affiliation: Independent Consultant
  pgp_fingerprint: A1B2 C3D4 E5F6 7890 ABCD  EF12 3456 7890 ABCD EF12
  recognition_basis: IAAP-WAS (certified 2023-04-15)
  conflict_disclosure: none
  prior_cosigns_with_this_auditor: 0

review:
  evidence_reviewed:
    - audit-report.json
    - evidence/screenshots/
    - evidence/axe-output.json
  review_method: |
    [plain English description of what was reviewed and how]
  review_duration_hours: 6.5
  review_date: YYYY-MM-DD

statement: |
  I have reviewed the audit evidence and the Conformance Statement issued
  by [Auditor] for [Subject] at conformance level AG-AA with evidence level L2.

  Within the scope and methodology defined in the audit, the Conformance
  Statement is supported by the evidence reviewed.

  I have no equity, employment, or contractual relationship with the audit
  subject other than this co-sign engagement.

  [prior_cosigns_with_this_auditor] prior co-signs with this auditor.

signature: |
  -----BEGIN PGP SIGNATURE-----
  [signature block — or WebAuthn attestation token]
  -----END PGP SIGNATURE-----
```

---

## Failure Modes and Mitigations

**Compromised co-signer key:** Revocations in `co-signers/revocations.json` with effective date. Audits signed before the revocation date remain valid.

**Rubber-stamp risk:** `prior_cosigns_with_this_auditor` field is required and public. Random audit policy (15% of co-signed PARs annually) cross-checks validity. Co-signers whose audits fail random review at >2× baseline rate have recognition status flagged publicly.

**PGP barrier:** WebAuthn alternative available at `co-sign.a11ygate.org`. Lower barrier for co-signers who don't use PGP. Both methods produce verifiable signed records.

---

## Co-Sign Registry

Public list of Recognized Co-Signers at `a11ygate.org/co-signers`. Shows: name, affiliation, credential, prior audit count, PGP fingerprint or WebAuthn flag, conflict disclosure status.

The list is not a marketplace. It is a transparency surface.

---

_A11yGate™ · Access Is The Gate. · Ellari Ventures LLC_
