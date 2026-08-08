import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import BarTooltip from "@/components/consumer/basic/building/management/BarTooltip";
import { ZevDetails } from "@/store/consumer/standard/Simulations/types/zev/zev";
import {
  Battery,
  Clock,
  DollarSign,
  Play,
  TrendingUp,
  Zap,
} from "lucide-react";
import {
  Bar,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Props {
  results: ZevDetails["simulationResults"] | null | undefined;
  charts: ZevDetails["charts"] | null | undefined;
  onRunSimulation: () => void;
  isRunning: boolean;
}

const SimulationResults: React.FC<Props> = ({
  results,
  charts,
  onRunSimulation,
  isRunning,
}) => {
  const utilizationData = charts?.chargingStationUtilization
    ? [
        {
          name: `Charging: ${charts.chargingStationUtilization.chargingPercent}%`,
          value: charts.chargingStationUtilization.chargingPercent,
          color: "#3b82f6",
        },
        {
          name: `Idle: ${charts.chargingStationUtilization.idlePercent}%`,
          value: charts.chargingStationUtilization.idlePercent,
          color: "#10b981",
        },
        {
          name: `Maintenance: ${charts.chargingStationUtilization.maintenancePercent}%`,
          value: charts.chargingStationUtilization.maintenancePercent,
          color: "#f59e0b",
        },
      ]
    : [];

  const dailyChargingData = charts?.dailyChargingPattern ?? [];
  const trendsData = charts?.sixMonthEnergyCostTrends ?? [];

  return (
    <CommonBorderWrapper isShadow>
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-3 ">
        <SectionHeader size="xl" title="Simulation Results" />
        <CommonButton
          onClick={onRunSimulation}
          isLoading={isRunning}
          loadingText="Running..."
        >
          <Play />
          Run Simulation
        </CommonButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 ">
        <BMiniCard
          icon={DollarSign}
          iconColorClassName="text-blue-600"
          label="Charging Cost"
          value={results ? `$${results.chargingCost}` : "--"}
          des={results ? `$${results.monthlyChargingCost}/month` : "--"}
          bgClassName="bg-blue-50"
        />
        <BMiniCard
          icon={Zap}
          iconColorClassName="text-green-600"
          label="Energy Demand"
          value={results ? `${results.energyDemandKwhPerDay}` : "--"}
          des="kWh/day"
          bgClassName="bg-green-50"
        />
        <BMiniCard
          icon={Clock}
          iconColorClassName="text-amber-500"
          label="Vehicle Uptime"
          value={results ? `${results.vehicleUptimePercent}%` : "--"}
          des={
            results
              ? `${((results.vehicleUptimePercent / 100) * 24).toFixed(0)} hrs/day`
              : "--"
          }
          bgClassName="bg-amber-50"
        />
        <BMiniCard
          icon={Battery}
          iconColorClassName="text-purple-600"
          label="Battery Utilization"
          value={results ? `${results.batteryUtilizationPercent}%` : "--"}
          des="Average SOC"
          bgClassName="bg-purple-50"
        />
        <BMiniCard
          icon={TrendingUp}
          iconColorClassName="text-green-600"
          label="Annual Savings"
          value={results ? `$${results.annualSavings}` : "--"}
          valueClass="text-green-600"
          des="vs. gas vehicle"
          bgClassName="bg-green-50"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div>
          <SectionHeader size="lg" title="Daily Charging Pattern" />
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dailyChargingData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="time"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={<BarTooltip />}
                  cursor={{ fill: "#f1f5f9" }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
                <Bar
                  yAxisId="left"
                  dataKey="power"
                  name="Power (kW)"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
                <Bar
                  yAxisId="right"
                  dataKey="cost"
                  name="Cost ($)"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                  barSize={20}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <SectionHeader size="lg" title="Charging Station Utilization" />
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={utilizationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label={({ name }) => name}
                  labelLine={{ stroke: "#94a3b8" }}
                >
                  {utilizationData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Trends chart */}
      <div>
        <SectionHeader size="lg" title="6-Month Energy & Cost Trends" />
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<BarTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="energy"
                name="Energy (kWh)"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="cost"
                name="Cost ($)"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </CommonBorderWrapper>
  );
};

export default SimulationResults;
