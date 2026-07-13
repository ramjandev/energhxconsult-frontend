import {
  OverallSystemReadiness,
  RenewableSystemSummary,
  RiskAssessment,
  ValidationChecklistItem,
} from "./types";

export const VALIDATION_CHECKLIST: ValidationChecklistItem[] = [
  {
    id: "solar-sizing",
    title: "Solar Sizing Validation Complete",
    status: "complete",
    validatedBy: "John Smith",
    associateId: "ENG-1024",
    role: "Senior Energy Engineer",
  },
  {
    id: "wind-sizing",
    title: "Wind Sizing Validation Complete",
    status: "complete",
    validatedBy: "John Smith",
    associateId: "ENG-1024",
    role: "Senior Energy Engineer",
  },
  {
    id: "biomass-sizing",
    title: "Biomass Sizing Validation Complete",
    status: "complete",
    validatedBy: "John Smith",
    associateId: "ENG-1024",
    role: "Senior Energy Engineer",
  },
  {
    id: "energy-commodity",
    title: "Energy Commodity Validation Complete",
    status: "complete",
    validatedBy: "John Smith",
    associateId: "ENG-1024",
    role: "Senior Energy Engineer",
  },
  {
    id: "financial-analysis",
    title: "Financial Analysis Validation Complete",
    status: "complete",
    validatedBy: "John Smith",
    associateId: "ENG-1024",
    role: "Senior Energy Engineer",
  },
  {
    id: "utility-data",
    title: "Utility Data Validation Complete",
    status: "complete",
    validatedBy: "John Smith",
    associateId: "ENG-1024",
    role: "Senior Energy Engineer",
  },
];

export const RENEWABLE_SYSTEM_SUMMARY: RenewableSystemSummary = {
  solarCapacityKw: 10.2,
  windCapacityKw: 6.5,
  biomassCapacityKw: 30,
  totalAnnualProductionKwh: 81000,
  totalProjectCost: 98450,
  projectedRoiYears: 12.8,
};

export const OVERALL_SYSTEM_READINESS: OverallSystemReadiness = {
  renewableCoveragePct: 95,
  annualSavings: 6080,
  carbonReductionTonsPerYear: 14.5,
};

export const RISK_ASSESSMENT: RiskAssessment = {
  technicalRisk: "low",
  financialRisk: "low",
  implementationRisk: "low",
  complianceStatus: "passed",
};
