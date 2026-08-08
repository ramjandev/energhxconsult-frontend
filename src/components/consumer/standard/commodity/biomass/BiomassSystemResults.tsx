import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import { Leaf, TrendingUp, Zap } from "lucide-react";

import InfoRow from "../solar/InfoRow";
import ConsiderationCard from "../wind/WindSiteConsiderations";
import EnvironmentalBenefits from "./EnvironmentalBenefits";
import { SelectedEquipmentItem, SiteBiomassParameters } from "./types";

interface SystemResultsProps {
  items: SelectedEquipmentItem[];
  parameters: SiteBiomassParameters;
  estInstallation: number;
}

const getFeedstockAvailability = (
  moisturePct: number,
): { label: string; className: string } => {
  if (moisturePct <= 15)
    return { label: "Excellent", className: "text-green-600" };
  if (moisturePct <= 25) return { label: "Good", className: "text-green-600" };
  if (moisturePct <= 35) return { label: "Fair", className: "text-amber-600" };
  return { label: "Poor", className: "text-red-600" };
};

const BiomassSystemResults: React.FC<SystemResultsProps> = ({
  items,
  parameters,
  estInstallation,
}) => {
  const totalUnits = items.reduce((sum, item) => sum + item.quantity, 0);

  const kwMatch = items[0]?.equipment.outputSpec.match(/([\d.]+)\s*kW/);
  const ratedThermalKw = kwMatch ? parseFloat(kwMatch[1]) : 30;

  const systemCapacityKw = totalUnits * ratedThermalKw;

  // Effective heat output after efficiency + system losses
  const effectiveOutputKw =
    systemCapacityKw *
    (parameters.boilerEfficiencyPct / 100) *
    (1 - parameters.systemLossFactorPct / 100);

  const coveragePct = Math.min(
    100,
    Math.round(
      (effectiveOutputKw / (parameters.buildingHeatDemandKw || 1)) * 100,
    ),
  );

  // Rough annual thermal output based on typical heating load factor
  const annualOutputKwh = Math.round(systemCapacityKw * 8760 * 0.2);

  // Pellet energy density: ~4.8 kWh/kg (matches screenshot)
  const energyDensityKwhPerKg = 4.8;
  const annualConsumptionTons =
    Math.round(
      (annualOutputKwh /
        (parameters.boilerEfficiencyPct / 100) /
        (energyDensityKwhPerKg * 1000)) *
        10,
    ) / 10;

  const pelletCostPerTon = 280;
  const annualFuelCost = Math.round(annualConsumptionTons * pelletCostPerTon);

  // Burn rate: thermal output / (energy density * efficiency)
  const burnRateKgPerHr =
    Math.round(
      (systemCapacityKw /
        (energyDensityKwhPerKg * (parameters.boilerEfficiencyPct / 100))) *
        10,
    ) / 10;

  const equipmentCost = items.reduce(
    (sum, item) => sum + item.equipment.price * item.quantity,
    0,
  );
  const totalInvestment = equipmentCost + estInstallation;

  // Assume displacing propane/oil heating at $0.09/kWh equivalent, net of fuel cost
  const heatingCostOffsetRate = 0.09;
  const grossSavings = Math.round(annualOutputKwh * heatingCostOffsetRate);
  const annualSavings = Math.max(0, grossSavings - annualFuelCost);
  const twentyYearSavings = annualSavings * 20;

  const paybackYears =
    annualSavings > 0 ? (totalInvestment / annualSavings).toFixed(1) : "—";

  const availability = getFeedstockAvailability(
    parameters.fuelMoistureContentPct,
  );

  const systemDetails = [
    { label: "Boiler Type:", value: "Automatic Pellet" },
    { label: "Efficiency:", value: `${parameters.boilerEfficiencyPct}%` },
    { label: "Fuel Type:", value: "Wood Pellets" },
    {
      label: "Storage Capacity:",
      value: `${parameters.storageCapacityTons} tons`,
    },
    { label: "Burn Rate:", value: `${burnRateKgPerHr} kg/hr` },
  ];

  const feedstockDetails = [
    {
      label: "Annual Consumption:",
      value: `${annualConsumptionTons} tons`,
    },
    { label: "Pellet Cost:", value: `$${pelletCostPerTon}/ton` },
    {
      label: "Energy Density:",
      value: `${energyDensityKwhPerKg} kWh/kg`,
    },
    {
      label: "Moisture Content:",
      value: `${parameters.fuelMoistureContentPct}%`,
    },
    {
      label: "Local Availability:",
      value: availability.label,
      valueClassName: availability.className,
    },
  ];

  // Space requirement estimates derived from system capacity & storage
  const boilerRoomSqFt = Math.max(60, Math.round(systemCapacityKw * 2.7));
  const pelletStorageSqFt = Math.max(
    80,
    Math.round(parameters.storageCapacityTons * 40),
  );
  const totalSpaceSqFt = boilerRoomSqFt + pelletStorageSqFt;

  return (
    <div className="space-y-6">
      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Biomass Sizing Results" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <BMiniCard
            icon={Leaf}
            label="Recommended System"
            value={`${systemCapacityKw} kW`}
            des="Pellet Boiler System"
            bgClassName="bg-white flex flex-col items-start justify-center"
            iconBgClassName="bg-[#EAF7E6]"
            iconColorClassName="text-primary w-6! h-6!"
            valueClass="text-[#112518]! font-bold!"
          />
          <BMiniCard
            icon={TrendingUp}
            label="Annual Output"
            value={annualOutputKwh.toLocaleString()}
            des="kWh thermal/year"
            bgClassName="bg-white flex flex-col items-start justify-center"
            iconBgClassName="bg-[#EAF7E6]"
            iconColorClassName="text-primary w-6! h-6!"
            valueClass="text-[#112518]! font-bold!"
          />
          <BMiniCard
            icon={Zap}
            label="Heating Coverage"
            value={`${coveragePct}%`}
            des="of heating needs"
            bgClassName="bg-white flex flex-col items-start justify-center"
            iconBgClassName="bg-[#EAF7E6]"
            iconColorClassName="text-primary w-6! h-6!"
            valueClass="text-green-600! font-bold!"
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Technical Specifications" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <div className="space-y-4">
            <SectionHeader size="lg" title="System Configuration" />
            <dl className="space-y-2">
              {systemDetails.map((item) => (
                <InfoRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </dl>
          </div>

          <div className="space-y-4">
            <SectionHeader size="lg" title="Feedstock Analysis" />
            <dl className="space-y-2">
              {feedstockDetails.map((item) => (
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

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Space Requirements" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Boiler Room"
            value={`${boilerRoomSqFt} sq ft`}
            des="Minimum clearance required"
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Pellet Storage"
            value={`${pelletStorageSqFt} sq ft`}
            des="3-month supply storage"
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Total Space"
            value={`${totalSpaceSqFt} sq ft`}
            des="Including access areas"
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Financial Analysis" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Equipment Cost"
            value={`$${equipmentCost.toLocaleString()}`}
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Installation"
            value={`$${estInstallation.toLocaleString()}`}
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Total Investment"
            value={`$${totalInvestment.toLocaleString()}`}
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Payback Period"
            value={`${paybackYears} yrs`}
            valueClass="text-green-600! font-bold!"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Annual Fuel Cost"
            value={`$${annualFuelCost.toLocaleString()}`}
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Annual Savings"
            value={`$${annualSavings.toLocaleString()}`}
            valueClass="text-green-600! font-bold!"
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="20-Year Savings"
            value={`$${twentyYearSavings.toLocaleString()}`}
            valueClass="text-green-600! font-bold!"
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Environmental Benefits" />
        <EnvironmentalBenefits />
      </CommonBorderWrapper>
      <ConsiderationCard
        className="bg-[#EFF6FF]! border-[#BEDBFF]!"
        dotColor="bg-[#155DFC]"
        title="System Integration Notes"
        items={[
          "Can integrate with existing radiant floor heating or baseboard systems",
          "Automatic ash removal system available for reduced maintenance",
          "Remote monitoring and control via smartphone app included",
        ]}
      />
    </div>
  );
};

export default BiomassSystemResults;
