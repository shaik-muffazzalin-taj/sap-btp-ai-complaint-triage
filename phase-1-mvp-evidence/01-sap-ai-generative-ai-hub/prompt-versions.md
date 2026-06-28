# Prompt Versions and Iteration Log

## Purpose

This document tracks the prompt versions used in SAP Generative AI Hub for the customer complaint triage use case.

The goal of prompt iteration is to improve the AI output so that it becomes useful for a business workflow. The prompt should not only generate a summary, but also return structured information that can support routing, escalation, human review, and later SAP Build Process Automation logic.

Each prompt version is documented with:

* objective;
* prompt structure;
* test result observations;
* shortcomings;
* reason for update;
* improvement made in the next version.

---

## Prompt Version Overview

| Version | Objective                                 | Main Addition                                                                           | Observed Shortcoming                                                                                    | Status                |
| ------- | ----------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | --------------------- |
| v1      | Generate structured complaint analysis    | Basic JSON output with category, priority, SLA risk, team, confidence, and human review | No workflow-specific routing field for SAP Build; finance human-review logic was not strict enough      | Improved into v2      |
| v2      | Make output workflow-ready                | Added `workflow_route` and controlled workflow route values                             | Finance approval did not always trigger human review; one service-delay case was over-escalated to High | Improved into v2.1    |
| v2.1    | Improve human-review and escalation logic | Added stricter finance approval rule and clearer Medium vs High priority rules          | No major issue after retesting failed/partial cases                                                     | Final selected prompt |

---

# Prompt v1 — Initial Complaint Analysis Prompt

## Objective

Prompt v1 was created to test whether SAP Generative AI Hub can analyse a customer complaint and return structured JSON output.

The main focus of this prompt was to identify:

* complaint summary;
* category;
* sentiment;
* business impact;
* urgency;
* priority;
* SLA risk;
* recommended team;
* confidence;
* human-review requirement;
* decision justification.

## Prompt v1 Text

```text
You are a Business AI assistant supporting a customer service complaint triage process.

Analyse the following customer complaint and return only valid JSON. Do not include markdown, explanations, or text outside the JSON.

Use this exact JSON structure:

{
  "summary": "",
  "category": "",
  "sentiment": "",
  "business_impact": "",
  "urgency": "",
  "priority": "",
  "sla_risk": "",
  "recommended_team": "",
  "recommended_action": "",
  "confidence": 0.0,
  "requires_human_review": true,
  "decision_justification": ""
}

Allowed categories:
- Technical Service
- Billing Issue
- Delivery Issue
- Product Quality
- Refund or Return
- General Service Complaint

Allowed sentiment values:
- Positive
- Neutral
- Negative
- Highly Negative

Allowed urgency values:
- Low
- Medium
- High
- Immediate

Allowed priority values:
- Low
- Medium
- High
- Critical

Allowed SLA risk values:
- Low
- Medium
- High

Priority rules:
- Low: Minor issue with limited business impact.
- Medium: Important issue but no immediate business disruption.
- High: Significant impact, repeated issue, important customer affected, or possible SLA risk.
- Critical: Business operation stopped, safety issue, legal threat, compliance risk, or major escalation.

Human review must be true if:
- production or business operation is stopped;
- safety risk is mentioned;
- legal or compliance risk is mentioned;
- refund or compensation is requested;
- the issue is repeated three or more times;
- the complaint is unclear;
- confidence is below 0.70.

Do not invent facts that are not present in the complaint. If information is missing, mention the uncertainty in the decision justification.

Complaint:
[complaint text comes here]
```

## Prompt v1 Test Observations

Prompt v1 was tested on three baseline cases:

| Test Case | Complaint Type           | Result       | Observation                                                                            |
| --------- | ------------------------ | ------------ | -------------------------------------------------------------------------------------- |
| TC-01     | Critical technical issue | Pass         | Correctly identified production stoppage as Critical and required human review         |
| TC-02     | Billing issue            | Partial Pass | Correct category and priority, but did not require human review for invoice correction |
| TC-03     | Delivery issue           | Pass         | Correctly treated standard delivery delay as Medium and did not over-escalate          |

## Prompt v1 Shortcomings

Prompt v1 generated useful complaint analysis, but it was not fully workflow-ready.

The main limitation was that it did not include a controlled workflow-routing field. For SAP Build Process Automation, the output should contain a clear route value that can be used in workflow decisions.

For example, SAP Build needs a field such as:

```json
"workflow_route": "CRITICAL_ESCALATION"
```

Without this field, the AI output is useful for human reading, but less useful for automated process routing.

Prompt v1 also missed the expected human-review decision for TC-02. The duplicate invoice case was correctly classified as a Billing Issue, but the model returned:

```json
"requires_human_review": false
```

For the project business rules, billing corrections and corrected invoice requests should be reviewed by the finance team.

## Reason for Updating to Prompt v2

Prompt v1 was updated to Prompt v2 to make the AI output more suitable for SAP Build workflow routing.

The improvement was to add:

* `workflow_route`;
* allowed workflow-route values;
* routing rules;
* more controlled team and route values.

---

# Prompt v2 — Workflow-Ready Complaint Routing Prompt

## Objective

Prompt v2 was created to make the AI output usable for workflow routing in SAP Build Process Automation.

The main improvement was the addition of a controlled `workflow_route` field.

## Prompt v2 Text

```text
You are a Business AI assistant supporting a customer service complaint triage process.

Analyse the following customer complaint and return only valid JSON. Do not include markdown, explanations, or text outside the JSON.

Use this exact JSON structure:

{
  "summary": "",
  "category": "",
  "sentiment": "",
  "business_impact": "",
  "urgency": "",
  "priority": "",
  "sla_risk": "",
  "recommended_team": "",
  "recommended_action": "",
  "workflow_route": "",
  "confidence": 0.0,
  "requires_human_review": true,
  "decision_justification": ""
}

Allowed categories:
- Technical Service
- Billing Issue
- Delivery Issue
- Product Quality
- Refund or Return
- General Service Complaint

Allowed sentiment values:
- Positive
- Neutral
- Negative
- Highly Negative

Allowed urgency values:
- Low
- Medium
- High
- Immediate

Allowed priority values:
- Low
- Medium
- High
- Critical

Allowed SLA risk values:
- Low
- Medium
- High

Allowed recommended_team values:
- Service Team
- Technical Service Team
- Finance Team
- Logistics Team
- Quality Team
- Service Manager
- Legal or Compliance Team
- Manual Triage Team

Allowed workflow_route values:
- STANDARD_SERVICE_QUEUE
- RESPONSIBLE_TEAM_REVIEW
- SERVICE_MANAGER_REVIEW
- CRITICAL_ESCALATION
- MANUAL_TRIAGE
- FINANCE_APPROVAL
- LEGAL_COMPLIANCE_REVIEW

Routing rules:
- If priority is Low or Medium and confidence is at least 0.70, use STANDARD_SERVICE_QUEUE or RESPONSIBLE_TEAM_REVIEW.
- If priority is High, use SERVICE_MANAGER_REVIEW.
- If priority is Critical, use CRITICAL_ESCALATION.
- If confidence is below 0.70 or the complaint is unclear, use MANUAL_TRIAGE.
- If refund, credit note, compensation, or billing correction is requested, use FINANCE_APPROVAL.
- If legal, compliance, or regulatory risk is mentioned, use LEGAL_COMPLIANCE_REVIEW.
- If safety risk is mentioned, use CRITICAL_ESCALATION.

Priority rules:
- Low: Minor issue with limited business impact.
- Medium: Important issue but no immediate business disruption.
- High: Significant impact, repeated issue, important customer affected, or possible SLA risk.
- Critical: Business operation stopped, safety issue, legal threat, compliance risk, or major escalation.

Human review must be true if:
- production or business operation is stopped;
- safety risk is mentioned;
- legal or compliance risk is mentioned;
- refund or compensation is requested;
- the issue is repeated three or more times;
- the complaint is unclear;
- priority is High or Critical;
- confidence is below 0.70.

Do not invent facts that are not present in the complaint. If information is missing, mention the uncertainty in the decision justification.

Complaint:
[complaint text comes here]
```

## Prompt v2 Test Observations

Prompt v2 was tested across ten complaint test cases.

Prompt v2 produced workflow-ready JSON and correctly added the `workflow_route` field. It successfully handled most cases, including:

* production stoppage;
* delivery delay;
* safety risk;
* legal threat;
* damaged unusable product;
* refund or return request;
* wrong delivery affecting warehouse fulfilment;
* low-priority informational service request.

Prompt v2 test summary:

| Result Type  | Count |
| ------------ | ----- |
| Pass         | 8     |
| Partial Pass | 2     |
| Fail         | 0     |

The two partial-pass cases were:

| Test Case | Issue                                                                                      |
| --------- | ------------------------------------------------------------------------------------------ |
| TC-02     | Correctly routed to `FINANCE_APPROVAL`, but returned `requires_human_review: false`        |
| TC-06     | Over-escalated a service-delay complaint to High and routed it to `SERVICE_MANAGER_REVIEW` |

## Prompt v2 Shortcomings

Prompt v2 had two main limitations.

First, finance approval did not always trigger human review. In TC-02, the model correctly returned:

```json
"workflow_route": "FINANCE_APPROVAL"
```

but incorrectly returned:

```json
"requires_human_review": false
```

For the project business rules, finance approval cases should require human review.

Second, Prompt v2 over-escalated one service-delay complaint. In TC-06, the complaint said that the support team had not responded to an email for five days. The model classified it as High priority and routed it to manager review. For this project, this should remain Medium unless there is additional evidence such as legal risk, safety risk, repeated unresolved issue, major customer impact, production stoppage, refund or compensation, or clear business disruption.

## Reason for Updating to Prompt v2.1

Prompt v2 was updated to Prompt v2.1 to improve:

* finance approval and human-review consistency;
* Medium vs High priority distinction;
* prevention of unnecessary over-escalation.

The update was needed because a real business workflow should avoid routing normal operational complaints to manager review unless escalation conditions are clearly met.

---

# Prompt v2.1 — Improved Human Review and Escalation Logic

## Objective

Prompt v2.1 improves the human-review and priority rules so that the model does not over-escalate normal operational complaints and correctly requires review for finance approval cases.

The goal is to keep critical cases strict, while treating normal billing, delivery, and service-delay issues as Medium unless there is a stronger business impact.

## Prompt v2.1 Text

```text
You are a Business AI assistant supporting a customer service complaint triage process.

Analyse the following customer complaint and return only valid JSON. Do not include markdown, explanations, or text outside the JSON.

Use this exact JSON structure:

{
  "summary": "",
  "category": "",
  "sentiment": "",
  "business_impact": "",
  "urgency": "",
  "priority": "",
  "sla_risk": "",
  "recommended_team": "",
  "recommended_action": "",
  "workflow_route": "",
  "confidence": 0.0,
  "requires_human_review": true,
  "decision_justification": ""
}

Allowed categories:
- Technical Service
- Billing Issue
- Delivery Issue
- Product Quality
- Refund or Return
- General Service Complaint

Allowed sentiment values:
- Positive
- Neutral
- Negative
- Highly Negative

Allowed urgency values:
- Low
- Medium
- High
- Immediate

Allowed priority values:
- Low
- Medium
- High
- Critical

Allowed SLA risk values:
- Low
- Medium
- High

Allowed recommended_team values:
- Service Team
- Technical Service Team
- Finance Team
- Logistics Team
- Quality Team
- Service Manager
- Legal or Compliance Team
- Manual Triage Team

Allowed workflow_route values:
- STANDARD_SERVICE_QUEUE
- RESPONSIBLE_TEAM_REVIEW
- SERVICE_MANAGER_REVIEW
- CRITICAL_ESCALATION
- MANUAL_TRIAGE
- FINANCE_APPROVAL
- LEGAL_COMPLIANCE_REVIEW

Routing rules:
- If priority is Low or Medium and confidence is at least 0.70, use STANDARD_SERVICE_QUEUE or RESPONSIBLE_TEAM_REVIEW.
- If priority is High, use SERVICE_MANAGER_REVIEW.
- If priority is Critical, use CRITICAL_ESCALATION.
- If confidence is below 0.70 or the complaint is unclear, use MANUAL_TRIAGE.
- If refund, credit note, compensation, billing correction, corrected invoice, duplicate charge, or financial adjustment is requested, use FINANCE_APPROVAL.
- If legal, compliance, or regulatory risk is mentioned, use LEGAL_COMPLIANCE_REVIEW.
- If safety risk is mentioned, use CRITICAL_ESCALATION.

Priority rules:
- Low: Minor informational request with no business impact, no dissatisfaction, and no SLA risk.
- Medium: Important issue, service delay, billing correction, refund/return request, standard delivery issue, or customer dissatisfaction without immediate business disruption.
- High: Significant business impact, repeated unresolved issue, urgent replacement need, important customer affected, major financial impact, clear SLA breach with business impact, or manager attention required.
- Critical: Business operation stopped, safety issue, legal threat, compliance risk, major escalation, or severe customer impact.

Do not classify a complaint as High only because it is delayed, incorrect, inconvenient, or the customer is dissatisfied.

Use High only when one or more of the following apply:
- repeated failure or repeated unresolved issue;
- enterprise or customer-critical impact;
- major financial impact;
- urgent replacement need;
- clear SLA breach with business impact;
- manager attention required;
- important customer affected;
- operational fulfilment or warehouse impact;
- unresolved issue after multiple complaints.

Simple billing corrections, duplicate invoice issues, corrected invoice requests, and standard service delays should usually be Medium unless additional risk factors are present.

Human review rules:
- requires_human_review must be true if production or business operation is stopped.
- requires_human_review must be true if safety risk is mentioned.
- requires_human_review must be true if legal or compliance risk is mentioned.
- requires_human_review must be true if refund, credit note, compensation, billing correction, corrected invoice, duplicate charge, or financial adjustment is requested.
- requires_human_review must be true if workflow_route is FINANCE_APPROVAL.
- requires_human_review must be true if the issue is repeated three or more times.
- requires_human_review must be true if the complaint is unclear.
- requires_human_review must be true if priority is High or Critical.
- requires_human_review must be true if confidence is below 0.70.
- requires_human_review can be false for Low or Medium cases when no finance approval, legal risk, safety risk, repeated issue, unclear information, or critical business impact is present.

Do not invent facts that are not present in the complaint. If information is missing, mention the uncertainty in the decision justification.

Complaint:
[complaint text comes here]
```

## Prompt v2.1 Test Observations

Prompt v2.1 was retested on the two cases that were partial pass in Prompt v2.

| Test Case | v2 Issue                                                       | v2.1 Result | Observation                                                                                            |
| --------- | -------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| TC-02     | Finance approval route was correct, but human review was false | Pass        | v2.1 correctly returned `FINANCE_APPROVAL` and `requires_human_review: true`                           |
| TC-06     | Service-delay case was over-escalated to High                  | Pass        | v2.1 correctly returned Medium priority, `RESPONSIBLE_TEAM_REVIEW`, and `requires_human_review: false` |

## Prompt v2.1 Status

Prompt v2.1 is selected as the final prompt version for the Phase 1 MVP Generative AI Hub work.

It is the final selected version because it:

* includes workflow-ready JSON output;
* supports SAP Build routing through `workflow_route`;
* correctly handles finance approval and human review;
* avoids unnecessary over-escalation of normal service delays;
* still correctly escalates critical safety, legal, and production-stoppage cases.

---

# Final Prompt Selection Criteria

The final prompt was selected based on the following criteria:

| Criteria                   | Description                                                      |
| -------------------------- | ---------------------------------------------------------------- |
| JSON validity              | Output must be valid JSON                                        |
| Category accuracy          | Complaint category should match expected category                |
| Priority accuracy          | Priority should match the business rule                          |
| Workflow route correctness | Route should support SAP Build workflow logic                    |
| Human-review correctness   | High-risk and finance-approval cases should require human review |
| Justification quality      | AI should explain the decision without inventing facts           |
| Consistency                | Similar complaints should produce similar classifications        |

---

# Final Selected Prompt

The final selected prompt is:

```text
Prompt v2.1 — Improved Human Review and Escalation Logic
```

This version will be used as the final Generative AI Hub prompt for the complaint triage prototype.

---

# Summary of Prompt Iteration

Prompt engineering in this phase followed an iterative approach:

1. Prompt v1 created the initial structured complaint-analysis output.
2. Prompt v2 added workflow-routing logic for SAP Build Process Automation.
3. Prompt v2 was tested across ten complaint cases and achieved 8 Pass and 2 Partial Pass results.
4. Prompt v2.1 improved finance human-review logic and reduced over-escalation for service-delay complaints.
5. Prompt v2.1 passed the retest cases and was selected as the final prompt.

This approach shows that the AI output was tested, evaluated, and improved rather than accepted without review.
