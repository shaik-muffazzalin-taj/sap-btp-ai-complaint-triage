# Workflow Summary

## Purpose

This file summarises the SAP Build Process Automation workflow used in the Phase 1 MVP.

## What Was Done

The workflow was designed to support customer complaint routing after AI triage. The form captures complaint information and structured AI fields such as category, priority, SLA risk, recommended team, workflow route, and human-review requirement.

The workflow route value is used to decide how the complaint should move through the process. Critical complaints are escalated, finance-related cases are routed for billing review, and standard service requests are handled through a normal service queue.

## Evidence

Supporting files are stored in this folder:

- `form-fields.md`
- `decision-table.md`
- `deployment-and-testing.md`

Screenshots and recordings are stored under:

- `../../assets/screenshots/02-sap-build-process-automation/`
- `../../assets/videos/02-sap-build-process-automation-demo.mp4`

## Notes

In this MVP, AI output is manually entered into SAP Build. Live SAP AI Core API integration is planned for a future phase.
