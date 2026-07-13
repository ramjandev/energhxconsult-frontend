import {
  ApprovalMatrixItem,
  ApprovalStatus,
  FinalEngineeringSummary,
  ReviewProgressItem,
} from "./types";

export const REVIEW_PROGRESS: ReviewProgressItem[] = [
  {
    id: "technical",
    icon: "technical",
    label: "Technical Review",
    status: "approved",
  },
  {
    id: "financial",
    icon: "financial",
    label: "Financial Review",
    status: "approved",
  },
  {
    id: "sustainability",
    icon: "sustainability",
    label: "Sustainability Review",
    status: "approved",
  },
  {
    id: "compliance",
    icon: "compliance",
    label: "Compliance Review",
    status: "approved",
  },
];

export const APPROVAL_MATRIX: ApprovalMatrixItem[] = [
  {
    id: "technical-design",
    icon: "technical",
    title: "Technical Design Review",
    status: "approved",
  },
  {
    id: "financial-feasibility",
    icon: "financial",
    title: "Financial Feasibility",
    status: "approved",
  },
  {
    id: "utility-compatibility",
    icon: "utility",
    title: "Utility Compatibility",
    status: "approved",
  },
  {
    id: "renewable-integration",
    icon: "renewable",
    title: "Renewable Integration",
    status: "approved",
  },
  {
    id: "environmental-compliance",
    icon: "compliance",
    title: "Environmental Compliance",
    status: "approved",
  },
];

export const FINAL_ENGINEERING_SUMMARY: FinalEngineeringSummary = {
  totalSystemCapacityKw: 46.7,
  expectedEnergyOffsetPct: 95,
  annualSavings: 6080,
  carbonReductionTons: 14.5,
  estimatedPaybackYears: 12.8,
};

export const APPROVAL_STATUS: ApprovalStatus = {
  status: "approved",
  approvalTimestamp: "June 6, 2026 - 2:45 PM EST",
  reviewedBy: "Senior Engineering Team",
};
