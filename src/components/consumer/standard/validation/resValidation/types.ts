export type ValidationStatus = "complete" | "pending" | "failed";

export interface ValidationChecklistItem {
  id: string;
  title: string;
  status: ValidationStatus;
  validatedBy: string;
  associateId: string;
  role: string;
}

export type RiskLevel = "low" | "medium" | "high";
export type ComplianceStatus = "passed" | "failed" | "pending";

export interface RiskAssessment {
  technicalRisk: RiskLevel;
  financialRisk: RiskLevel;
  implementationRisk: RiskLevel;
  complianceStatus: ComplianceStatus;
}

export interface RenewableSystemSummary {
  solarCapacityKw: number;
  windCapacityKw: number;
  biomassCapacityKw: number;
  totalAnnualProductionKwh: number;
  totalProjectCost: number;
  projectedRoiYears: number;
}

export interface OverallSystemReadiness {
  renewableCoveragePct: number;
  annualSavings: number;
  carbonReductionTonsPerYear: number;
}
