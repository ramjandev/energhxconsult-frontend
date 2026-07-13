import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import { Gauge, TrendingUp, Wind, Zap } from "lucide-react";
import InfoRow from "../solar/InfoRow";
import { SelectedEquipmentItem, SiteWindParameters } from "./types";
import ConsiderationCard from "./WindSiteConsiderations";

interface SystemResultsProps {
  items: SelectedEquipmentItem[];
  parameters: SiteWindParameters;
  estInstallation: number;
}

const getWindClass = (speed: number): string => {
  if (speed < 4.4) return "Class 1";
  if (speed < 5.1) return "Class 2";
  if (speed < 5.6) return "Class 3";
  if (speed < 6.0) return "Class 4";
  if (speed < 6.4) return "Class 5";
  if (speed < 7.0) return "Class 6";
  return "Class 7";
};

const getSiteSuitability = (
  capacityFactorPct: number,
): { label: string; className: string } => {
  if (capacityFactorPct >= 30)
    return { label: "Excellent", className: "text-green-600" };
  if (capacityFactorPct >= 20)
    return { label: "Good", className: "text-green-600" };
  if (capacityFactorPct >= 12)
    return { label: "Fair", className: "text-amber-600" };
  return { label: "Poor", className: "text-red-600" };
};

const WindSystemResults: React.FC<SystemResultsProps> = ({
  items,
  parameters,
  estInstallation,
}) => {
  const totalTurbines = items.reduce((sum, item) => sum + item.quantity, 0);

  const kwMatch = items[0]?.equipment.outputSpec.match(/([\d.]+)\s*kW/);
  const ratedPowerKw = kwMatch ? parseFloat(kwMatch[1]) : 10;

  const systemCapacityKw = totalTurbines * ratedPowerKw;

  // Simplified capacity factor estimate driven by avg wind speed & turbulence
  const capacityFactor = Math.min(
    0.45,
    Math.max(
      0.1,
      (parameters.averageWindSpeed / 12) *
        (1 - parameters.turbulenceIntensityPct / 200),
    ),
  );
  const capacityFactorPct = Math.round(capacityFactor * 100);

  const annualProductionKwh = Math.round(
    systemCapacityKw *
      8760 *
      capacityFactor *
      (1 - parameters.systemLossFactorPct / 100),
  );

  // Estimate typical annual load to compute coverage (fallback assumption)
  const estimatedAnnualLoadKwh = 21700; // ~1,800 kWh/month average household+
  const coveragePct = Math.min(
    100,
    Math.round((annualProductionKwh / estimatedAnnualLoadKwh) * 100),
  );

  const equipmentCost = items.reduce(
    (sum, item) => sum + item.equipment.price * item.quantity,
    0,
  );
  const totalInvestment = equipmentCost + estInstallation;

  const electricityRate = 0.15;
  const annualSavings = Math.round(annualProductionKwh * electricityRate);
  const twentyYearSavings = annualSavings * 20;

  const paybackYears =
    annualSavings > 0 ? (totalInvestment / annualSavings).toFixed(1) : "—";

  // Turbine spec fields not present in equipment data model — derived from
  // rated power using typical small-wind-turbine ranges as a reasonable estimate
  const rotorDiameterMeters =
    Math.round(Math.sqrt(ratedPowerKw) * 1.7 * 10) / 10;
  const cutInSpeed = 3;
  const ratedSpeed = 12;
  const cutOutSpeed = 25;

  const windClass = getWindClass(parameters.averageWindSpeed);
  const suitability = getSiteSuitability(capacityFactorPct);

  const turbineDetails = [
    { label: "Rotor Diameter:", value: `${rotorDiameterMeters} meters` },
    {
      label: "Tower Height:",
      value: `${parameters.hubHeightMeters} meters (${Math.round(
        parameters.hubHeightMeters * 3.281,
      )} ft)`,
    },
    { label: "Cut-in Speed:", value: `${cutInSpeed} m/s` },
    { label: "Rated Speed:", value: `${ratedSpeed} m/s` },
    { label: "Cut-out Speed:", value: `${cutOutSpeed} m/s` },
  ];

  const siteDetails = [
    { label: "Avg Wind Speed:", value: `${parameters.averageWindSpeed} m/s` },
    { label: "Wind Class:", value: windClass },
    { label: "Capacity Factor:", value: `${capacityFactorPct}%` },
    {
      label: "Turbulence Intensity:",
      value: `${parameters.turbulenceIntensityPct}%`,
    },
    {
      label: "Site Suitability:",
      value: suitability.label,
      valueClassName: suitability.className,
    },
  ];
  const considerations = [
    "Zoning approval required for tower height of 24 meters",
    "Minimum setback distance: 36 meters (1.5× tower height from property lines)",
    "One-year wind data monitoring recommended for final sizing verification",
    "Foundation requirements depend on open terrain type and soil conditions",
  ];
  return (
    <div className="space-y-6">
      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Wind Sizing Results" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <BMiniCard
            icon={Wind}
            label="Turbine Capacity"
            value={systemCapacityKw.toString()}
            des="kW"
            bgClassName="bg-blue-50/70 flex flex-col items-center justify-center"
            iconClassName=" flex! flex-col! items-center! justify-center! "
            iconBgClassName=""
            iconColorClassName="text-blue-600 w-8! h-8!"
            valueClass="text-blue-600 font-bold!"
          />
          <BMiniCard
            icon={TrendingUp}
            label="Annual Production"
            value={annualProductionKwh.toLocaleString()}
            des="kWh/year"
            bgClassName="bg-green-50/70 flex flex-col items-center justify-center"
            iconClassName=" flex! flex-col! items-center! justify-center! "
            iconBgClassName=""
            iconColorClassName="text-green-600 w-8! h-8!"
            valueClass="text-green-600 font-bold!"
          />
          <BMiniCard
            icon={Zap}
            label="Energy Coverage"
            value={`${coveragePct}%`}
            des="of needs"
            bgClassName="bg-emerald-50/70 flex flex-col items-center justify-center"
            iconClassName=" flex! flex-col! items-center! justify-center! "
            iconBgClassName=""
            iconColorClassName="text-emerald-600 w-8! h-8!"
            valueClass="text-emerald-600 font-bold!"
          />
          <BMiniCard
            icon={Gauge}
            label="Capacity Factor"
            value={`${capacityFactorPct}%`}
            des="efficiency"
            bgClassName="bg-purple-50/70 flex flex-col items-center justify-center"
            iconClassName=" flex! flex-col! items-center! justify-center! "
            iconBgClassName=""
            iconColorClassName="text-purple-600 w-8! h-8!"
            valueClass="text-purple-600 font-bold!"
          />
        </div>
      </CommonBorderWrapper>
      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Technical Specifications" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
          <div className="space-y-4">
            <SectionHeader size="lg" title="Turbine Configuration" />
            <dl className="space-y-2">
              {turbineDetails.map((item) => (
                <InfoRow
                  key={item.label}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </dl>
          </div>

          <div className="space-y-4">
            <SectionHeader size="lg" title="Site Analysis" />
            <dl className="space-y-2">
              {siteDetails.map((item) => (
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
        <SectionHeader size="xl" title="Financial Analysis" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <BMiniCard
            className="flex flex-col items-center justify-center bg-[#EAF7E6]/30! "
            label="Equipment Cost"
            value={`$${equipmentCost.toLocaleString()}`}
          />
          <BMiniCard
            className="flex flex-col items-center justify-center bg-[#EAF7E6]/30! "
            label="Installation"
            value={`$${estInstallation.toLocaleString()}`}
          />
          <BMiniCard
            className="flex flex-col items-center justify-center bg-[#EAF7E6]/30! "
            label="Total Investment"
            value={`$${totalInvestment.toLocaleString()}`}
          />
          <BMiniCard
            className="flex flex-col items-center justify-center bg-[#EAF7E6]/30! "
            label="Payback Period"
            value={`${paybackYears} yrs`}
            valueClass="text-green-600! font-bold!"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="Annual Savings"
            value={`$${annualSavings.toLocaleString()}`}
            valueClass="text-green-600! font-bold! text-2xl!"
          />
          <BMiniCard
            className="flex flex-col items-start justify-center bg-[#EAF7E6]/30! "
            label="20-Year Savings"
            value={`$${twentyYearSavings.toLocaleString()}`}
            valueClass="text-green-600! font-bold! text-2xl!"
          />
        </div>
      </CommonBorderWrapper>
      <ConsiderationCard title="Site Considerations" items={considerations} />
    </div>
  );
};

export default WindSystemResults;
