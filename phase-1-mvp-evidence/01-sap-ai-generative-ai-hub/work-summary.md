# SAP Generative AI Hub Work Summary

## Purpose

This file summarises the SAP Generative AI Hub work completed for the Phase 1 MVP.

The goal was to test whether customer complaint text could be analysed and converted into structured triage output that supports workflow routing.

## What Was Done

SAP Generative AI Hub / SAP AI Launchpad was used to test complaint classification prompts with synthetic customer complaints.

The prompt was improved across multiple versions. Early testing confirmed that the model could summarise complaints and identify categories, but the output needed a dedicated routing field for workflow use.

The final prompt produced structured JSON containing:

- summary
- category
- sentiment
- business impact
- urgency
- priority
- SLA risk
- recommended team
- recommended action
- workflow route
- confidence score
- human-review requirement
- decision justification

The final version was selected because it gave clearer routing decisions and handled finance approval, legal risk, safety risk, critical escalation, and standard service requests more consistently.

## Evidence

Evidence is stored in this folder:

- `prompt-versions.md`
- `test-cases.csv`
- `evaluation.csv`
- `ai-outputs/`

Screenshots and recordings are stored centrally under:

- `../../assets/screenshots/01-sap-ai-generative-ai-hub/`
- `../../assets/videos/`

## Notes

The AI output is used as a recommendation, not as an automatic final decision. High-risk cases still require human review.

In this Phase 1 MVP, AI output is manually transferred into SAP Build Process Automation. Live SAP Build to SAP AI Core / Generative AI Hub API integration is planned as a future enhancement.

