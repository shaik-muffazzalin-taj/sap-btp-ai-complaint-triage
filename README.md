# SAP BTP Business AI Complaint Triage and Process Automation Prototype

This repository presents a completed Phase 1 MVP for AI-assisted customer complaint triage using SAP BTP services.

The project demonstrates how customer complaint text can be analysed with SAP Generative AI Hub / SAP AI Launchpad, converted into structured triage fields, and then used in SAP Build Process Automation for workflow routing through a decision table.

SAP S/4HANA Cloud Public Edition trial is used as the ERP process-mapping layer. It shows where routed complaint outcomes would connect to finance, sales, receivables, dispute management, service, and supply chain processes.

## Business Problem

Complaint handling is often manual. Service agents read complaint text, classify the issue, decide priority, check SLA risk, and forward it to the correct team. This can create delays, inconsistent decisions, and missed escalations.

This MVP explores how Business AI can support that process by producing structured complaint triage output that can be used for routing and review.

## SAP Services Used

- SAP Generative AI Hub / SAP AI Launchpad for complaint analysis and structured JSON output.
- SAP Build Process Automation for form capture, workflow routing, decision table logic, release, deployment, and testing.
- SAP S/4HANA Cloud Public Edition trial for ERP process mapping.
- SAP S/4HANA is used in Phase 1 as a process-mapping and ERP-context layer, not as a live integrated backend. The screenshots show relevant ERP business areas that could handle routed complaint outcomes in a future integrated version.

## Phase 1 MVP Completed

Phase 1 includes SAP product evidence and documentation for:

- AI prompt testing and generated outputs.
- Workflow routing design and decision logic.
- S/4HANA process mapping.
- Screenshots, recordings, test data, and evaluation files.

In this MVP, the AI output is manually transferred into SAP Build Process Automation. Live SAP Build to SAP AI Core API integration and live SAP Build to SAP S/4HANA OData integration are documented as future enhancements.

## Evidence

- Screenshots: `assets/screenshots/`
- Videos: `assets/videos/`
- AI evidence: `phase-1-mvp-evidence/01-sap-ai-generative-ai-hub/`
- SAP Build evidence: `phase-1-mvp-evidence/02-sap-build-process-automation/`
- S/4HANA evidence: `phase-1-mvp-evidence/03-sap-s4hana/`

## Documentation

Start with:

- `PROJECT_STATUS.md`
- `PHASE_1_SUMMARY.md`
- `docs/01-project-overview.md`
- `docs/05-limitations-and-future-roadmap.md`
