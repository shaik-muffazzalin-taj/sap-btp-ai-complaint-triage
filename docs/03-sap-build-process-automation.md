# SAP Build Process Automation

## Purpose

SAP Build Process Automation was used to design the workflow side of the complaint triage MVP.

## What Was Done

The workflow captures complaint details and AI triage fields through a form. These fields include complaint category, priority, SLA risk, recommended team, workflow route, and human-review requirement.

A decision table maps `workflow_route` values to the correct workflow path. For example, critical complaints can be routed for escalation, billing cases can be routed to finance approval, and standard requests can move through a normal service queue.

The workflow evidence covers form design, decision logic, release, deployment, submitted test cases, and monitoring.

## Evidence

Evidence is stored in:

- `../phase-1-mvp-evidence/02-sap-build-process-automation/workflow-summary.md`
- `../phase-1-mvp-evidence/02-sap-build-process-automation/form-fields.md`
- `../phase-1-mvp-evidence/02-sap-build-process-automation/decision-table.md`
- `../phase-1-mvp-evidence/02-sap-build-process-automation/deployment-and-testing.md`
- `../assets/screenshots/02-sap-build-process-automation/`
- `../assets/videos/02-sap-build-process-automation-demo.mp4`

## Notes

In this Phase 1 MVP, SAP Build does not call SAP AI Core or Generative AI Hub through a live API. The AI output is manually transferred into the workflow form. API-based automation is planned as a future enhancement.
