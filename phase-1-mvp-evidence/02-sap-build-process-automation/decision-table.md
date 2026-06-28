# Decision Table

## Purpose

The decision table maps AI triage output to workflow routing decisions.

## Example Rules

| Workflow Route | Priority | Human Review | Target Path |
|---|---:|---:|---|
| CRITICAL_ESCALATION | Critical | TRUE | Escalate to service manager |
| FINANCE_APPROVAL | Medium | TRUE/FALSE | Route to finance team |
| LEGAL_COMPLIANCE_REVIEW | Critical | TRUE | Route to legal or compliance review |
| SERVICE_MANAGER_REVIEW | High | TRUE | Route to service manager |
| RESPONSIBLE_TEAM_REVIEW | Medium | FALSE | Route to responsible team |
| STANDARD_SERVICE_QUEUE | Low | FALSE | Route to standard queue |

## Notes

The decision table is designed for MVP testing. In a future phase, these rules can be expanded with SLA timers, approval thresholds, and integration with SAP S/4HANA data.
