# Project Overview

## Purpose

This project is a completed Phase 1 MVP for AI-assisted customer complaint triage and workflow routing using SAP BTP services.

The goal is to show how a manual complaint-handling process can be improved with structured AI support and workflow automation.

## Business Problem

Customer complaints usually arrive as free-text messages. A service agent has to read the complaint, understand the issue, classify it, decide the priority, check SLA risk, and forward it to the right team.

That manual process can lead to inconsistent classification, slow escalation, wrong handoffs, and limited visibility.

## MVP Idea

SAP Generative AI Hub is used to analyse complaint text and produce structured triage output. The output includes fields such as category, priority, SLA risk, recommended team, workflow route, confidence, and human-review flag.

SAP Build Process Automation is used to show how those fields can support workflow routing. The decision table maps the AI-generated workflow route to the correct handling path.

SAP S/4HANA Cloud Public Edition trial is used to map the complaint outcomes to ERP process areas such as finance, sales, receivables, disputes, service, and supply chain.

## Scope

Phase 1 focuses on SAP product evidence and documentation. The AI result is manually transferred into SAP Build for this MVP. API and OData integrations are planned future enhancements.
