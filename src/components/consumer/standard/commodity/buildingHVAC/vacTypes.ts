interface MonthlyLoadPoint {
  month: string;
  cooling: number;
  heating: number;
  baseline: number;
}

export interface SystemConfiguration {
  systemType: string;
  coolingCapacity: string;
  heatingCapacity: string;
  refrigerant: string;
  controlSystem: string;
  zoneCount: string;
}

export interface FinancialAnalysis {
  equipmentCost: number;
  installationCost: number;
  totalInvestment: number;
  annualSavings: number;
  paybackPeriodYears: number;
  netSavings20Year: number;
}

export interface EnvironmentalImpact {
  co2ReductionTonsPerYear: number;
  energySavingsPercent: number;
  refrigerantGwp: number;
}

export type EquipmentCategory =
  | "VRF System"
  | "Air-Cooled Chiller"
  | "Packaged RTU";

type EfficiencyRating = "A+" | "A++" | "A+++";

export interface HVACEquipment {
  id: string;
  name: string;
  category: EquipmentCategory;
  rating: EfficiencyRating;
  capacityTon: number;
  cop: number;
  estimatedCost: number;
  systemConfiguration: SystemConfiguration;
  financialAnalysis: FinancialAnalysis;
  environmentalImpact: EnvironmentalImpact;
  monthlyLoadProfile: MonthlyLoadPoint[];
}
