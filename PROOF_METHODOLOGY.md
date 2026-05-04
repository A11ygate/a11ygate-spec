# A11yGate Self-Audit Methodology — Why This Is a Pass With a Note
_Lives at: a11ygate.org/proof/methodology_
_Referenced from: a11ygate.org/proof_

---

## The Question

A11yGate's founding self-audit records gate state `pass` with one informational note under §5.11 (Security Prerequisites — informative). Some readers will ask why this is `pass` and not `conditional_pass`.

This page documents that reasoning.

---

## What §5.11 Is

Section 5.11 of the A11yGate Standard is **informative**, not normative. Its title is "Security Prerequisites." It records security-posture observations that, while not accessibility requirements, may affect accessibility when violated.

Informative sections do not govern the conformance level. A finding under §5.11 cannot produce a `conditional_pass` because §5.11 does not contain normative requirements. It is not possible to "fail" §5.11.

---

## What BX-001-INFO Is

`BX-001-INFO` is an informational note, not an exception.

- **An exception** (`conditional_pass`) means a normative requirement of the Standard was not met, and the organization accepted the deviation with documented owner, scope, and remediation plan.
- **An informational note** means a security observation was recorded. The observation is owned and time-bound. It does not affect the conformance level.

The `style-src 'unsafe-inline'` Content Security Policy directive on `a11ygate.org` is a Cloudflare-Workers-native pattern. No WCAG success criterion, no A11yGate normative requirement, and no ADA Title II technical rule requires CSP `strict-dynamic` or nonce-based CSP. It is a security-engineering best practice, not an accessibility requirement.

---

## Why CSP Is Not in the Normative Standard

A defaced or XSS-compromised page is, in principle, inaccessible. But the same logic would put HTTPS, DNS integrity, DDoS protection, and server uptime in the accessibility standard. None of those belong in an accessibility standard. The principle "security failures can cause accessibility failures" does not entail "the accessibility standard incorporates security requirements."

Security testing is governed by OWASP ASVS and NIST SP 800-218. Accessibility testing is governed by WCAG and the A11yGate Standard. They are different bodies with different audiences and different scope.

---

## The Transparency Record

The informational note is still public. It has an owner (Ellari Ventures LLC). It has a remediation plan (nonce-based CSP migration). It has a target date (2026-07-01). It is documented here, on `/proof`, and in the Access Proof Packet.

The "No Silent Exceptions" policy applies equally to informational notes. Nothing is hidden. The structure is different — informational, not normative — but the transparency is identical.

---

## What Would Produce `conditional_pass`

Any finding under a normative requirement (§5.1 through §5.10) that the organization accepted as a deviation with documented owner and remediation plan would produce `conditional_pass`. Examples:

- A text element failing the §5.1.1 contrast threshold, accepted pending a design-system update.
- A form field lacking a label per §5.5.1, accepted pending a development sprint.
- A keyboard trap identified under §5.3.1, accepted while a third-party widget is replaced.

None of those apply to `a11ygate.org` at the time of this audit.

---

## The Commitment

The nonce-based CSP migration is staged at PR #XX in the `a11ygate-web` repository. Target completion: 2026-07-01. When complete, the informational note will be marked resolved. The founding record will be renewed (producing a successor PAR that supersedes this one), and the successor will show zero informational notes.

---

_A11yGate Standard™ v0.1 · Methodology documentation_
_Ellari Ventures LLC · a11ygate.org/proof/methodology_
