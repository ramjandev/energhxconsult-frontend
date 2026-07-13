import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import {
  BatteryCharging,
  CheckCircle2,
  DollarSign,
  TrendingUp,
} from "lucide-react";

import InfoRow from "../solar/InfoRow";
import BatteryLifecycleChart from "./BatteryLifecycleChart";
import DailyEnergyDispatchChart from "./DailyEnergyDispatchChart";
import { SelectedEquipmentItem, SiteBatteryParameters } from "./types";

interface BatterySystemResultsProps {
  items: SelectedEquipmentItem[];
  parameters: SiteBatteryParameters;
  estInstallation: number;
}

const getGridIndependenceLabel = (
  pct: number,
): { label: string; className: string } => {
  if (pct >= 90) return { label: "Excellent", className: "text-green-600" };
  if (pct >= 60) return { label: "Good", className: "text-green-600" };
  if (pct >= 30) return { label: "Fair", className: "text-amber-600" };
  return { label: "Limited", className: "text-red-600" };
};

const BatterySystemResults: React.FC<BatterySystemResultsProps> = ({
  items,
  parameters,
  estInstallation,
}) => {
  const batteryItems = items.filter(
    (item) => item.equipment.category === "batterySystems",
  );

  const totalCapacityKwh = batteryItems.reduce((sum, item) => {
    const kwhMatch = item.equipment.outputSpec.match(/([\d.]+)\s*kWh/);
    const unitCapacity = kwhMatch ? parseFloat(kwhMatch[1]) : 0;
    return sum + unitCapacity * item.quantity;
  }, 0);

  const usableCapacityKwh =
    totalCapacityKwh * (parameters.depthOfDischargePct / 100);

  const deliverableCapacityKwh =
    usableCapacityKwh * (parameters.roundTripEfficiencyPct / 100);

  const backupDurationHours =
    parameters.criticalLoadKw > 0
      ? Math.round((usableCapacityKwh / parameters.criticalLoadKw) * 10) / 10
      : 0;

  const coveragePct = Math.min(
    100,
    Math.round(
      (deliverableCapacityKwh / (parameters.dailyEnergyUsageKwh || 1)) * 100,
    ),
  );

  const equipmentCost = items.reduce(
    (sum, item) => sum + item.equipment.price * item.quantity,
    0,
  );
  const totalInvestment = equipmentCost + estInstallation;

  // Assume time-of-use arbitrage / demand charge offset savings
  const savingsRatePerKwh = 0.18;
  const annualSavings = Math.round(
    deliverableCapacityKwh * 365 * savingsRatePerKwh,
  );
  const twentyYearSavings = annualSavings * 20;
  const paybackYears =
    annualSavings > 0 ? (totalInvestment / annualSavings).toFixed(1) : "—";

  const twentyYearRoiPct =
    totalInvestment > 0
      ? Math.round(
          ((twentyYearSavings - totalInvestment) / totalInvestment) * 100,
        )
      : 0;

  const gridIndependence = getGridIndependenceLabel(coveragePct);

  // Derive chemistry, cycle life, and warranty from the selected battery
  // equipment itself, rather than from site parameters (batteries carry
  // this info per-product, not per-site).
  const primaryBattery = batteryItems[0]?.equipment;

  const chemistry = primaryBattery?.technology ?? "LFP";

  const cycleLifeMatch =
    primaryBattery?.additionalSpec.match(/([\d,]+)\+?\s*cycles/i);
  const cycleLife = cycleLifeMatch ? cycleLifeMatch[1] : "4,000+";

  const longestWarrantyYears = batteryItems.reduce(
    (max, item) => Math.max(max, item.equipment.warrantyYears),
    10,
  );
  const warrantyLabel = `${longestWarrantyYears} years`;

  const avgDemandKw =
    Math.round((parameters.dailyEnergyUsageKwh / 24) * 10) / 10;

  const batterySystemDetails = [
    {
      label: "Chemistry:",
      value: chemistry,
    },
    {
      label: "Nameplate Capacity:",
      value: `${totalCapacityKwh.toFixed(0)} kWh`,
    },
    {
      label: "Usable Capacity:",
      value: `${usableCapacityKwh.toFixed(1)} kWh`,
    },
    {
      label: "Round-Trip Efficiency:",
      value: `${parameters.roundTripEfficiencyPct}%`,
    },
    {
      label: "Cycle Life:",
      value: `${cycleLife} cycles`,
    },
    {
      label: "Warranty:",
      value: warrantyLabel,
    },
  ];

  const financialAnalysis = [
    {
      label: "Equipment Cost:",
      value: `$${equipmentCost.toLocaleString()}`,
    },
    {
      label: "Installation:",
      value: `$${estInstallation.toLocaleString()}`,
    },
    {
      label: "Total Investment:",
      value: `$${totalInvestment.toLocaleString()}`,
    },
    {
      label: "Annual Savings:",
      value: `$${annualSavings.toLocaleString()}`,
      valueClassName: "text-green-600 font-semibold",
    },
    {
      label: "Payback Period:",
      value: `${paybackYears} years`,
    },
    {
      label: "20-Year ROI:",
      value: `${twentyYearRoiPct}%`,
      valueClassName: "text-green-600 font-semibold",
    },
  ];

  return (
    <div className="space-y-6">
      <CommonBorderWrapper isShadow>
        <SectionHeader title="Battery Sizing Results" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <BMiniCard
            layout="stacked"
            icon={BatteryCharging}
            label="Recommended Battery Size"
            value={`${totalCapacityKwh.toFixed(0)}`}
            des={`kWh (${usableCapacityKwh.toFixed(1)} kWh usable)`}
            className="flex flex-col items-center text-center border-[rgba(152,16,250,0.15)]!"
            bgClassName="bg-[linear-gradient(180deg,_#F5F0FF_0%,_#FFFFFF_100%)]!"
            iconBgClassName=""
            iconColorClassName="text-[#9810FA]"
            valueClass="text-[#9810FA]! font-bold! text-3xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={CheckCircle2}
            label="Backup Duration"
            value={`${backupDurationHours.toFixed(1)}h`}
            des="at average demand"
            className="flex flex-col items-center text-center border-[rgba(34,197,94,0.15)]!"
            bgClassName="bg-[linear-gradient(180deg,_#EAF9EC_0%,_#FFFFFF_100%)]!"
            iconBgClassName=""
            iconColorClassName="text-[#16A34A]"
            valueClass="text-[#16A34A]! font-bold! text-3xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={DollarSign}
            label="Annual Savings"
            value={`$${annualSavings.toLocaleString()}`}
            des="arbitrage + backup"
            className="flex flex-col items-center text-center border-[rgba(37,99,235,0.15)]!"
            bgClassName="bg-[linear-gradient(180deg,_#EFF6FF_0%,_#FFFFFF_100%)]!"
            iconBgClassName=""
            iconColorClassName="text-[#2563EB]"
            valueClass="text-[#2563EB]! font-bold! text-3xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={TrendingUp}
            label="Energy Independence"
            value={`${coveragePct}%`}
            des={gridIndependence.label}
            className="flex flex-col items-center text-center border-[rgba(34,197,94,0.15)]!"
            bgClassName="bg-[linear-gradient(180deg,_#EAF9EC_0%,_#FFFFFF_100%)]!"
            iconBgClassName=""
            iconColorClassName="text-[#16A34A]"
            valueClass="text-[#16A34A]! font-bold! text-3xl!"
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader title="Technical Specifications" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <SectionHeader size="lg" title="Battery System" />
            <dl className="space-y-2">
              {batterySystemDetails.map((item) => (
                <InfoRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </dl>
          </div>

          <div className="space-y-4">
            <SectionHeader size="lg" title="Financial Analysis" />
            <dl className="space-y-2">
              {financialAnalysis.map((item) => (
                <InfoRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                  valueClassName={item.valueClassName}
                />
              ))}
            </dl>
          </div>
        </div>
      </CommonBorderWrapper>

      <BatteryLifecycleChart warrantyYears={longestWarrantyYears} />

      <DailyEnergyDispatchChart
        solarSystemSizeKw={parameters.solarSystemSizeKw ?? 0}
        avgDemandKw={avgDemandKw}
      />
    </div>
  );
};

export default BatterySystemResults;
