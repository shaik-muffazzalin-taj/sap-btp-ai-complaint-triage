# Limitations and Future Roadmap

## Purpose

This file documents the honest boundary of the completed Phase 1 MVP and the planned next steps.

## Current Limitations

- AI output from SAP Generative AI Hub is manually transferred into SAP Build Process Automation.
- SAP Build does not call SAP AI Core or Generative AI Hub through a live API yet.
- SAP Build does not call SAP S/4HANA OData APIs yet.
- SAP S/4HANA is used for process mapping and ERP context, not live document creation.
- No SAP Analytics Cloud dashboard is included yet.

## Future Roadmap

- Create a SAP Build Action that calls SAP AI Core / Generative AI Hub.
- Configure BTP destinations for secure API communication.
- Add SAP S/4HANA OData integration for live process or document interaction.
- Add analytics through SAP Analytics Cloud or Power BI.
- Extend the project into Phase 2 with stronger KPI tracking, reporting, and business performance analysis.

## Notes

The Phase 1 MVP is intentionally practical. It focuses on SAP product evidence, workflow design, structured AI output, and business process mapping before adding deeper technical integrations.


S/4HANA screenshots are included only as ERP process-context evidence. Phase 1 does not create or update S/4HANA business objects through SAP Build. Live OData-based integration is planned as a future enhancement.

