import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import { DollarSign, Thermometer, TrendingUp, Zap } from "lucide-react";
import RecommendedHVACEquipment from "../buildingHVAC/Recommendedhvacequipment";
import { SelectedEquipmentItem, SiteEvParameters } from "./types";

interface SystemResultsProps {
  items: SelectedEquipmentItem[];
  parameters: SiteEvParameters;
  estInstallation: number;
}

const getCapacitySuitability = (
  utilizationPct: number,
): { label: string; className: string } => {
  if (utilizationPct <= 70)
    return { label: "Well Sized", className: "text-green-600" };
  if (utilizationPct <= 90)
    return { label: "Near Capacity", className: "text-amber-600" };
  return { label: "Insufficient", className: "text-red-600" };
};

const EvSystemResults: React.FC<SystemResultsProps> = ({
  items,
  parameters,
  estInstallation,
}) => {
  const totalChargers = items.reduce((sum, item) => sum + item.quantity, 0);

  const kwMatch = items[0]?.equipment.outputSpec.match(/([\d.]+)\s*kW/);
  const ratedPowerKw = kwMatch ? parseFloat(kwMatch[1]) : 11;

  const totalChargingCapacityKw = totalChargers * ratedPowerKw;

  const capacityUtilizationPct = Math.min(
    150,
    Math.round(
      (totalChargingCapacityKw /
        (parameters.availableElectricalCapacityKw || 1)) *
        100,
    ),
  );

  const suitability = getCapacitySuitability(capacityUtilizationPct);

  // Estimate daily energy demand across fleet
  // Rough EV efficiency assumption: 0.35 kWh/mile
  const evEfficiencyKwhPerMile = 0.35;
  const dailyEnergyDemandKwh =
    parameters.numberOfVehicles *
    parameters.avgDailyMilesPerVehicle *
    evEfficiencyKwhPerMile;

  const effectiveChargingCapacityKw =
    totalChargingCapacityKw * (1 - parameters.systemLossFactorPct / 100);

  const dailyChargingCapacityKwh =
    effectiveChargingCapacityKw * parameters.peakChargingHours;

  const demandCoveragePct = Math.min(
    100,
    Math.round((dailyChargingCapacityKwh / (dailyEnergyDemandKwh || 1)) * 100),
  );

  const annualEnergyUseKwh = Math.round(dailyEnergyDemandKwh * 365);

  const equipmentCost = items.reduce(
    (sum, item) => sum + item.equipment.price * item.quantity,
    0,
  );
  const totalInvestment = equipmentCost + estInstallation;

  // Assume displacing gasoline at $0.14/mile equivalent vs. electricity at $0.13/kWh
  const gasolineCostPerMile = 0.14;
  const electricityRate = 0.13;

  const annualMiles =
    parameters.numberOfVehicles * parameters.avgDailyMilesPerVehicle * 365;
  const annualGasolineCost = Math.round(annualMiles * gasolineCostPerMile);
  const annualElectricityCost = Math.round(
    annualEnergyUseKwh * electricityRate,
  );
  const annualSavings = Math.max(0, annualGasolineCost - annualElectricityCost);
  const fiveYearSavings = annualSavings * 5;

  const paybackYears =
    annualSavings > 0 ? (totalInvestment / annualSavings).toFixed(1) : "—";

  const chargerDetails = [
    { label: "Total Chargers:", value: `${totalChargers} units` },
    { label: "Rated Power:", value: `${ratedPowerKw} kW each` },
    {
      label: "Total Charging Capacity:",
      value: `${totalChargingCapacityKw.toFixed(1)} kW`,
    },
    {
      label: "Parking Spaces:",
      value: `${parameters.parkingSpaces}`,
    },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader size="xl" title="EV Infrastructure Sizing Results" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <BMiniCard
          icon={Thermometer}
          label="Recommended HVAC Capacity"
          value={totalChargingCapacityKw.toString()}
          des="kW"
          bgClassName="bg-blue-50/70 flex flex-col items-center justify-center"
          iconClassName=" flex! flex-col! items-center! justify-center! "
          iconBgClassName=""
          iconColorClassName="text-blue-600 w-8! h-8!"
          valueClass="text-blue-600 font-bold!"
        />
        <BMiniCard
          icon={Zap}
          label="Annual Energy Consumption"
          value={`${annualEnergyUseKwh}%`}
          des="of total load"
          bgClassName="bg-green-50/70 flex flex-col items-center justify-center"
          iconClassName=" flex! flex-col! items-center! justify-center! "
          iconBgClassName=""
          iconColorClassName="text-green-600 w-8! h-8!"
          valueClass="text-green-600 font-bold!"
        />
        <BMiniCard
          icon={DollarSign}
          label="Annual Operating Cost"
          value={annualEnergyUseKwh.toLocaleString()}
          des="kWh/year"
          bgClassName="bg-amber-50/70 flex flex-col items-center justify-center"
          iconClassName=" flex! flex-col! items-center! justify-center! "
          iconBgClassName=""
          iconColorClassName="text-amber-600 w-8! h-8!"
          valueClass="text-amber-600 font-bold!"
        />
        <BMiniCard
          icon={TrendingUp}
          label="Energy Efficiency Rating"
          value={`A++`}
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

export default EvSystemResults;
