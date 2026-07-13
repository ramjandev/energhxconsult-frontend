import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import { DollarSign, Sun, TrendingUp, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import InfoRow from "./InfoRow";
import { SelectedEquipmentItem, SiteSolarParameters } from "./types";

interface MonthlyDataPoint {
  month: string;
  consumption: number;
  production: number;
}

interface SystemResultsProps {
  items: SelectedEquipmentItem[];
  parameters: SiteSolarParameters;
  estInstallation: number;
  monthlyData: MonthlyDataPoint[];
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  bgClass: string;
  valueClass: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  suffix,
  bgClass,
  valueClass,
}) => (
  <div className={`rounded-xl p-5 ${bgClass}`}>
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <p className="text-sm text-[#758179]">{label}</p>
    </div>
    <p className={`text-3xl font-bold ${valueClass}`}>{value}</p>
    {suffix && <p className="text-xs text-[#758179] mt-1">{suffix}</p>}
  </div>
);

const SolarSystemResults: React.FC<SystemResultsProps> = ({
  items,
  parameters,
  estInstallation,
  monthlyData,
}) => {
  const totalPanels = items.reduce((sum, item) => sum + item.quantity, 0);

  const wattMatch = items[0]?.equipment.outputSpec.match(/(\d+)W/);
  const panelWattage = wattMatch ? parseInt(wattMatch[1], 10) : 360;

  const systemCapacityKw = (totalPanels * panelWattage) / 1000;

  const annualProductionKwh = Math.round(
    systemCapacityKw *
      parameters.solarIrradiance *
      365 *
      (1 - parameters.systemLossFactorPct / 100),
  );

  const equipmentCost = items.reduce(
    (sum, item) => sum + item.equipment.price * item.quantity,
    0,
  );
  const systemCost = equipmentCost + estInstallation;

  const electricityRate = 0.15;
  const annualSavings = Math.round(annualProductionKwh * electricityRate);

  const paybackYears =
    annualSavings > 0 ? (systemCost / annualSavings).toFixed(1) : "—";

  const twentyFiveYearRoi =
    annualSavings > 0
      ? Math.round(((annualSavings * 25 - systemCost) / systemCost) * 100)
      : 0;

  const roofCoverageSqFt = Math.round(totalPanels * (panelWattage / 100));
  const arrayRows = Math.ceil(Math.sqrt(totalPanels || 1));
  const arrayCols = Math.ceil((totalPanels || 1) / arrayRows);

  const totalConsumption = monthlyData.reduce(
    (sum, m) => sum + m.consumption,
    0,
  );
  const totalProduction = monthlyData.reduce((sum, m) => sum + m.production, 0);
  const coveragePct =
    totalConsumption > 0
      ? Math.min(100, Math.round((totalProduction / totalConsumption) * 100))
      : 0;

  const panelDetails = [
    {
      label: "Total Panels:",
      value: `${totalPanels} units`,
    },
    {
      label: "Panel Wattage:",
      value: `${panelWattage}W each`,
    },
    {
      label: "Array Configuration:",
      value: `${arrayRows} × ${arrayCols} layout`,
    },
    {
      label: "Roof Coverage:",
      value: `${roofCoverageSqFt} sq ft`,
    },
  ];
  const financialDetails = [
    {
      label: "System Cost:",
      value: `$${systemCost.toLocaleString()}`,
    },
    {
      label: "Annual Savings:",
      value: `$${annualSavings.toLocaleString()}`,
      valueClassName: "text-green-600",
    },
    {
      label: "Payback Period:",
      value: `${paybackYears} years`,
    },
    {
      label: "25-Year ROI:",
      value: `${twentyFiveYearRoi}%`,
      valueClassName: "text-green-600",
    },
  ];

  return (
    <div className="space-y-6">
      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Solar Sizing Results" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <BMiniCard
            icon={Sun}
            label="System Capacity"
            value={`${systemCapacityKw.toFixed(1)} kW`}
            des="kW"
            bgClassName="bg-amber-50/70 flex flex-col items-center justify-center"
            iconClassName=" flex! flex-col! items-center! justify-center! "
            iconBgClassName=""
            iconColorClassName="text-amber-600 w-8! h-8!"
            valueClass="text-amber-600 font-bold!"
          />
          <BMiniCard
            icon={Zap}
            label="Panel Count"
            value={totalPanels.toString()}
            des={`panels × ${panelWattage}W`}
            bgClassName="bg-green-50/70 flex flex-col items-center justify-center"
            iconClassName=" flex! flex-col! items-center! justify-center! "
            iconBgClassName=""
            iconColorClassName="text-green-600 w-8! h-8!"
            valueClass="text-green-600 font-bold!"
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
            icon={DollarSign}
            label="Coverage"
            value={`${coveragePct}%`}
            des="of needs"
            bgClassName="bg-blue-50/70 flex flex-col items-center justify-center"
            iconClassName=" flex! flex-col! items-center! justify-center! "
            iconBgClassName=""
            iconColorClassName="text-blue-600 w-8! h-8!"
            valueClass="text-blue-600 font-bold!"
          />
        </div>
      </CommonBorderWrapper>
      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Technical Specifications" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
          <div className="space-y-4">
            <SectionHeader size="lg" title="System Configuration" />
            <dl className="space-y-2">
              {panelDetails.map((item) => (
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
              {financialDetails.map((item) => (
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
        <SectionHeader size="xl" title="Monthly Production vs. Consumption" />

        <div className="h-72 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend
                formatter={(value) =>
                  value === "consumption"
                    ? "Consumption (kWh)"
                    : "Solar Production (kWh)"
                }
              />
              <Bar dataKey="consumption" fill="#6b7280" radius={[3, 3, 0, 0]} />
              <Bar dataKey="production" fill="#f59e0b" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default SolarSystemResults;
