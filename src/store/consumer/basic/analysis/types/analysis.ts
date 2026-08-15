export type AuditType = "BASIC_AUDIT" | "COMPREHENSIVE_AUDIT";

export interface CreateAuditPayload {
  buildingId: string;
  auditType: AuditType;
}

// audit reposonse
interface EnergyMonthData {
  month: string;
  solarGenerationKwh: number;
  usageKwh: number;
  windGenerationKwh: number;
}

interface EnergyGenerationTotals {
  peakMonth: string;
  peakMonthKwh: number;
  solarGenerationKwh: number;
  usageKwh: number;
  windGenerationKwh: number;
}

interface EnergyGenerationAndUsage {
  data: EnergyMonthData[];
  totals: EnergyGenerationTotals;
}

type EnergySource = "solar" | "wind" | "grid";

interface EnergySourceDistributionItem {
  energyKwh: number;
  sharePct: number;
  source: EnergySource;
}

interface EnergySourceDistribution {
  data: EnergySourceDistributionItem[];
}

interface Charts {
  energyGenerationAndUsage: EnergyGenerationAndUsage;
  energySourceDistribution: EnergySourceDistribution;
}

interface BuildingInsights {
  efficiencyRating: string;
  peakUsageTime: string;
  totalAppliances: number;
}

interface Recommendation {
  description: string;
  key: string;
  title: string;
}

interface Summary {
  annualSavings: number;
  co2Avoided: number;
  energyScore: number;
  renewablePercent: number;
}

interface AuditReport {
  buildingInsights: BuildingInsights;
  charts: Charts;
  recommendations: Recommendation[];
  summary: Summary;
}

interface AuditResultValueItem {
  report: AuditReport;
  title: string;
}

interface AuditResultData {
  computed_at: number;
  value: AuditResultValueItem[];
}

type AuditStatus = "computed" | "pending" | "failed" | string;

interface AuditResult {
  data: AuditResultData;
  status: AuditStatus;
}

interface AuditData {
  auditType: AuditType;
  result: AuditResult;
}

export interface EnergyAuditResponse {
  status: number;
  message: string;
  data: AuditData;
}
