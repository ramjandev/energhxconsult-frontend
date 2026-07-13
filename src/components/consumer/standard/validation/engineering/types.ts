export type ReviewStatus = "approved" | "pending" | "rejected";

export interface ReviewProgressItem {
  id: string;
  icon: "technical" | "financial" | "sustainability" | "compliance";
  label: string;
  status: ReviewStatus;
}

export interface ApprovalMatrixItem {
  id: string;
  icon: "technical" | "financial" | "utility" | "renewable" | "compliance";
  title: string;
  status: ReviewStatus;
}

export interface FinalEngineeringSummary {
  totalSystemCapacityKw: number;
  expectedEnergyOffsetPct: number;
  annualSavings: number;
  carbonReductionTons: number;
  estimatedPaybackYears: number;
}

export interface ApprovalStatus {
  status: "approved" | "pending" | "rejected";
  approvalTimestamp: string;
  reviewedBy: string;
}
