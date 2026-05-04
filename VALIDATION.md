# VALIDATION.md — A11yGate Canonical Workflow Specification
_Entity owner: Ellari Ventures LLC | Spec v0.1.0 | 2026-05-03_

## Input Types
font · document · url · css

## TRS Formula
TRS = (0.30×CA + 0.20×SS + 0.20×SCS + 0.15×SSR + 0.15×RDC) × P
P = 1.00 (all ≥60) | 0.85 (any <60) | 0.75 (any <50)

## Gate States (v1.2)
pass | conditional_pass | fail | waived | expired
waived REQUIRES: waiver_reason + waiver_owner + (expiry_at OR remediation_due)

## Confidence
HIGH: ≥2 render envs + SHA verified
MEDIUM: 1 env OR SHA unverified OR system font
LOW: unextractable, timeout, unsupported

## Render Profile (standard)
chromium-headless-12-14-16px | hinting: none | antialiasing: subpixel

## Status Bands
90+ certified | 80+ approved | 70+ conditional | 60+ risk | <60 fail

## Full spec: 12 sections covering input validation, env normalization,
## CA/SS/SCS/SSR/RDC measurement protocols, TRS computation, confidence,
## fingerprint generation, report output, badge issuance, enforcement mode,
## corrections engine, legal use guidance.
## See Claude project knowledge for complete specification.
