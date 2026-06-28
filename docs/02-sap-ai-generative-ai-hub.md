# SAP AI Generative AI Hub

## Purpose

SAP Generative AI Hub / SAP AI Launchpad was used to test whether customer complaint text could be converted into useful structured triage output.

## What Was Done

Synthetic customer complaint cases were tested through prompt versions. The final prompt asked the AI to return a consistent JSON response that could support workflow routing.

The output fields included:

- complaint summary
- category
- priority
- SLA risk
- recommended team
- workflow route
- confidence score
- human-review flag
- decision justification

This helped turn unstructured complaint messages into fields that a workflow can use.

## Evidence

Evidence is stored in:

- `../phase-1-mvp-evidence/01-sap-ai-generative-ai-hub/prompt-versions.md`
- `../phase-1-mvp-evidence/01-sap-ai-generative-ai-hub/test-cases.csv`
- `../phase-1-mvp-evidence/01-sap-ai-generative-ai-hub/evaluation.csv`
- `../phase-1-mvp-evidence/01-sap-ai-generative-ai-hub/ai-outputs/`
- `../assets/screenshots/01-sap-ai-generative-ai-hub/`

## Notes

The AI output is used as a recommendation, not as a final human decision. Critical cases, safety issues, legal risks, low-confidence outputs, and financial approval cases still require human review.
