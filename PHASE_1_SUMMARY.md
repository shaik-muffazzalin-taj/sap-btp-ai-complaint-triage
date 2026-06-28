# Phase 1 Summary

Phase 1 delivered a completed MVP for AI-assisted customer complaint triage using SAP BTP services.

The project focuses on a common business problem: customer complaints arrive as unstructured text, and service teams must manually decide the complaint category, priority, SLA risk, responsible team, and escalation path. This MVP shows how SAP Business AI concepts can support that process in a practical way.

## What Was Delivered

SAP Generative AI Hub / SAP AI Launchpad was used to test complaint analysis prompts. The final prompt produced structured JSON output containing fields such as complaint category, priority, urgency, SLA risk, recommended team, workflow route, confidence score, and human-review requirement.

SAP Build Process Automation was used to document the workflow MVP. The workflow captures complaint and AI triage fields, then uses decision-table logic to route the case to the correct path.

SAP S/4HANA Cloud Public Edition trial was used for ERP process mapping. Complaint outcomes were mapped to relevant areas such as finance, receivables, dispute management, sales orders, service, and supply chain follow-up.

## Evidence

The repository includes prompt versions, test cases, generated AI outputs, evaluation files, screenshots, workflow notes, decision rules, and S/4HANA mapping files.

## Honest MVP Boundary

In Phase 1, the AI output is manually transferred into SAP Build Process Automation. Live SAP Build to SAP AI Core API integration and live SAP Build to SAP S/4HANA OData integration are future enhancements.
