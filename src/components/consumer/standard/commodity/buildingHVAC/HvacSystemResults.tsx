import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import { Snowflake, Thermometer, TrendingUp, Zap } from "lucide-react";

import RecommendedHVACEquipment from "./Recommendedhvacequipment";
import { SelectedEquipmentItem, SiteHvacParameters } from "./types";

interface SystemResultsProps {
  items: SelectedEquipmentItem[];
  parameters: SiteHvacParameters;
  estInstallation: number;
}

const getSizingSuitability = (
  coveragePct: number,
): { label: string; className: string } => {
  if (coveragePct >= 95 && coveragePct <= 115)
    return { label: "Well Sized", className: "text-green-600" };
  if (coveragePct >= 80)
    return { label: "Adequate", className: "text-amber-600" };
  return { label: "Undersized", className: "text-red-600" };
};

const HvacSystemResults: React.FC<SystemResultsProps> = ({
  items,
  parameters,
  estInstallation,
}) => {
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const kwMatch = items[0]?.equipment.outputSpec.match(/([\d.]+)\s*kW/);
  const ratedOutputKw = kwMatch ? parseFloat(kwMatch[1]) : 16;

  const systemCapacityKw = totalUnits * ratedOutputKw;

  const totalLoadKw = parameters.coolingLoadKw + parameters.heatingLoadKw;

  const effectiveCapacityKw =
    systemCapacityKw * (1 - parameters.systemLossFactorPct / 100);

  const coveragePct = Math.min(
    150,
    Math.round((effectiveCapacityKw / (totalLoadKw || 1)) * 100),
  );

  const sizing = getSizingSuitability(coveragePct);

  // Rough annual energy consumption estimate for heat pump-driven HVAC
  const copMatch = items[0]?.equipment.additionalSpec.match(/COP\s*([\d.]+)/);
  const assumedCop = copMatch ? parseFloat(copMatch[1]) : 3.5;

  const annualLoadKwh = totalLoadKw * 8760 * 0.25; // ~25% average load factor
  const annualEnergyConsumptionKwh = Math.round(annualLoadKwh / assumedCop);

  const equipmentCost = items.reduce(
    (sum, item) => sum + item.equipment.price * item.quantity,
    0,
  );
  const totalInvestment = equipmentCost + estInstallation;

  // Assume displacing resistive/gas heating at $0.15/kWh equivalent
  const conventionalCostRate = 0.15;
  const conventionalAnnualCost = Math.round(
    annualLoadKwh * conventionalCostRate,
  );
  const electricityRate = 0.13;
  const heatPumpAnnualCost = Math.round(
    annualEnergyConsumptionKwh * electricityRate,
  );
  const annualSavings = Math.max(
    0,
    conventionalAnnualCost - heatPumpAnnualCost,
  );
  const twentyYearSavings = annualSavings * 20;

  const paybackYears =
    annualSavings > 0 ? (totalInvestment / annualSavings).toFixed(1) : "—";

  const systemDetails = [
    { label: "Total Units:", value: `${totalUnits} units` },
    { label: "Rated Output:", value: `${ratedOutputKw} kW each` },
    {
      label: "Effective Capacity:",
      value: `${effectiveCapacityKw.toFixed(1)} kW`,
    },
    { label: "Assumed COP:", value: assumedCop.toFixed(1) },
  ];

  const loadDetails = [
    { label: "Cooling Load:", value: `${parameters.coolingLoadKw} kW` },
    { label: "Heating Load:", value: `${parameters.heatingLoadKw} kW` },
    {
      label: "Building Area:",
      value: `${parameters.buildingAreaSqFt.toLocaleString()} sq ft`,
    },
    {
      label: "Sizing Suitability:",
      value: sizing.label,
      valueClassName: sizing.className,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="HVAC Sizing Results" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <BMiniCard
          icon={Thermometer}
          label="System Capacity"
          value={systemCapacityKw.toString()}
          des="kW"
          bgClassName="bg-blue-50/70 flex flex-col items-center justify-center"
          iconClassName=" flex! flex-col! items-center! justify-center! "
          iconBgClassName=""
          iconColorClassName="text-blue-600 w-8! h-8!"
          valueClass="text-blue-600 font-bold!"
        />
        <BMiniCard
          icon={Zap}
          label="Load Coverage"
          value={`${coveragePct}%`}
          des="of total load"
          bgClassName="bg-green-50/70 flex flex-col items-center justify-center"
          iconClassName=" flex! flex-col! items-center! justify-center! "
          iconBgClassName=""
          iconColorClassName="text-green-600 w-8! h-8!"
          valueClass="text-green-600 font-bold!"
        />
        <BMiniCard
          icon={TrendingUp}
          label="Annual Energy Use"
          value={annualEnergyConsumptionKwh.toLocaleString()}
          des="kWh/year"
          bgClassName="bg-amber-50/70 flex flex-col items-center justify-center"
          iconClassName=" flex! flex-col! items-center! justify-center! "
          iconBgClassName=""
          iconColorClassName="text-amber-600 w-8! h-8!"
          valueClass="text-amber-600 font-bold!"
        />
        <BMiniCard
          icon={Snowflake}
          label="Efficiency (COP)"
          value={assumedCop.toFixed(1)}
          des="coefficient of performance"
          bgClassName="bg-purple-50/70 flex flex-col items-center justify-center"
          iconClassName=" flex! flex-col! items-center! justify-center! "
          iconBgClassName=""
          iconColorClassName="text-purple-600 w-8! h-8!"
          valueClass="text-purple-600 font-bold!"
        />
      </div>

      <RecommendedHVACEquipment />
    </div>
  );
};

export default HvacSystemResults;
