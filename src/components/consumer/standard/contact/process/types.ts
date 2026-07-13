export interface ProjectSummarySystem {
  id: string;
  label: string;
  capacity: string;
  cost: number;
}

export interface FinancialBreakdownLine {
  id: string;
  label: string;
  amount: number;
  isDeduction: boolean;
}

export interface ProjectedSavings {
  annualSavings: number;
  paybackYears: number;
  twentyFiveYearSavings: number;
}

export interface ContractDocument {
  id: string;
  icon: "file" | "shield";
  title: string;
  description: string;
}

export interface TimelinePhase {
  id: string;
  order: number;
  title: string;
  durationLabel: string;
}
