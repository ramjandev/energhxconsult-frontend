import CommonHeader from "@/common/header/CommonHeader";
import React from "react";
import InfoRow from "../solar/InfoRow";

export interface MonthlyLoadPoint {
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

export type EfficiencyRating = "A+" | "A++" | "A+++";

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
interface TechnicalSpecificationsProps {
  equipment: HVACEquipment;
  className?: string;
}

const formatCurrency = (value: number) => `$${value.toLocaleString()}`;

const TechnicalSpecifications: React.FC<TechnicalSpecificationsProps> = ({
  equipment,
  className = "",
}) => {
  const { systemConfiguration: cfg, financialAnalysis: fin } = equipment;

  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-2xl p-6 ${className}`}
    >
      <CommonHeader size="xl" className="mb-6">
        Technical Specifications
      </CommonHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CommonHeader size="lg" className="mb-3">
            System Configuration
          </CommonHeader>
          <div className="space-y-2">
            <InfoRow label="System Type:" value={cfg.systemType} />
            <InfoRow label="Cooling Capacity:" value={cfg.coolingCapacity} />
            <InfoRow label="Heating Capacity:" value={cfg.heatingCapacity} />
            <InfoRow label="Refrigerant:" value={cfg.refrigerant} />
            <InfoRow label="Control System:" value={cfg.controlSystem} />
            <InfoRow label="Zone Count:" value={cfg.zoneCount} />
          </div>
        </div>

        <div>
          <CommonHeader size="lg" className="mb-3">
            Financial Analysis
          </CommonHeader>
          <div className="space-y-2">
            <InfoRow
              label="Equipment Cost:"
              value={formatCurrency(fin.equipmentCost)}
            />
            <InfoRow
              label="Installation & Commissioning:"
              value={formatCurrency(fin.installationCost)}
            />
            <InfoRow
              label="Total Investment:"
              value={formatCurrency(fin.totalInvestment)}
            />
            <InfoRow
              label="Annual Savings vs Baseline:"
              value={formatCurrency(fin.annualSavings)}
              valueClassName="text-[#16A34A]"
            />
            <InfoRow
              label="Payback Period:"
              value={`${fin.paybackPeriodYears} years`}
            />
            <InfoRow
              label="20-Year Net Savings:"
              value={formatCurrency(fin.netSavings20Year)}
              valueClassName="text-[#16A34A]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;
