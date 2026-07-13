import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import BarTooltip from "@/components/consumer/basic/building/management/BarTooltip";
import { Activity, Check, CheckCircle2, Play, Thermometer } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tempDistributionData = [
  { distance: "0m", temperature: 35, comfort: 45 },
  { distance: "2m", temperature: 30, comfort: 65 },
  { distance: "4m", temperature: 26, comfort: 80 },
  { distance: "6m", temperature: 24, comfort: 90 },
  { distance: "8m", temperature: 22.5, comfort: 96 },
  { distance: "10m", temperature: 22, comfort: 98 },
];

const heatFluxData = [
  { zone: "North Wall", heatFlux: 42, annualLoss: 1100 },
  { zone: "South Wall", heatFlux: 38, annualLoss: 950 },
  { zone: "East Wall", heatFlux: 35, annualLoss: 900 },
  { zone: "West Wall", heatFlux: 33, annualLoss: 850 },
  { zone: "Roof", heatFlux: 55, annualLoss: 1350 },
  { zone: "Floor", heatFlux: 15, annualLoss: 400 },
];

const convergenceData = [
  { iteration: 100, residual: 1 },
  { iteration: 200, residual: 0.5 },
  { iteration: 300, residual: 0.1 },
  { iteration: 400, residual: 0.05 },
  { iteration: 500, residual: 0.01 },
  { iteration: 600, residual: 0.003 },
  { iteration: 678, residual: 0.0009 },
];

const SimulationResultsThermal = () => {
  const handleRunSimulation = () => {
    console.log("Run thermal simulation");
    // TODO: trigger simulation API call
  };

  return (
    <CommonBorderWrapper isShadow>
      <div className="flex flex-col  sm:flex-row gap-3 sm:items-center justify-between">
        <SectionHeader size="xl" title="Simulation Results" />
        <CommonButton onClick={handleRunSimulation}>
          <Play className="w-4 h-4 mr-1.5" />
          Run Simulation
        </CommonButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:sm:grid-cols-4 gap-4">
        <BMiniCard
          icon={CheckCircle2}
          iconColorClassName="text-green-600"
          label="Simulation Status"
          value="Converged"
          valueClass="text-green-600"
          des="678 iterations"
          bgClassName="bg-green-50"
        />
        <BMiniCard
          icon={Activity}
          iconColorClassName="text-blue-600"
          label="Comfort Score"
          value="87"
          des="out of 100"
          bgClassName="bg-blue-50"
        />
        <BMiniCard
          icon={Thermometer}
          iconColorClassName="text-orange-500"
          label="Avg Heat Flux"
          value="37"
          valueClass="text-orange-500"
          des="W/m²"
          bgClassName="bg-orange-50"
        />
        <BMiniCard
          icon={Activity}
          iconColorClassName="text-red-500"
          label="Energy Impact"
          value="4,450"
          valueClass="text-red-500"
          des="kWh/year loss"
          bgClassName="bg-red-50"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <SectionHeader
            size="lg"
            title="Temperature Distribution Across Building"
          />
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tempDistributionData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="distance"
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
                  dataKey="temperature"
                  name="Temperature (°C)"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="comfort"
                  name="Comfort Index"
                  stroke="#22c55e"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-[#758179] mt-3 bg-green-50 rounded-lg p-3">
            Temperature gradient from exterior (left) to interior (right).
            Comfort index improves toward building core.
          </p>
        </div>

        <div>
          <SectionHeader size="lg" title="Heat Flux by Building Zone" />
          <div className="h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={heatFluxData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="zone"
                  tick={{ fontSize: 11, fill: "#64748b" }}
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
                  dataKey="heatFlux"
                  name="Heat Flux (W/m²)"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                />
                <Bar
                  yAxisId="right"
                  dataKey="annualLoss"
                  name="Annual Loss (kWh)"
                  fill="#ef4444"
                  radius={[4, 4, 0, 0]}
                  barSize={16}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-[#758179] mt-3 bg-green-50 rounded-lg p-3">
            Roof shows highest heat flux. Consider improved insulation for
            maximum impact.
          </p>
        </div>
      </div>

      {/* Convergence Analysis */}
      <div>
        <SectionHeader size="lg" title="Convergence Analysis" />
        <div className="h-64 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={convergenceData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="iteration"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                scale="log"
                domain={["auto", "auto"]}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<BarTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
              <Line
                type="monotone"
                dataKey="residual"
                name="Residual Error"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Convergence summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <BMiniCard
          label="Convergence Achieved"
          value="Yes"
          icon={Check}
          iconColorClassName="text-green-600"
          valueClass="text-green-600"
        />
        <BMiniCard label="Final Residual" value="0.0009" />
        <BMiniCard label="Iterations Used" value="678" />
      </div>
    </CommonBorderWrapper>
  );
};

export default SimulationResultsThermal;
