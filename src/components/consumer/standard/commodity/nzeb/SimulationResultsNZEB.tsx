import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import BarTooltip from "@/components/consumer/basic/building/management/BarTooltip";
import { DollarSign, Leaf, Play, TrendingUp, Zap } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
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

const distributionData = [
  { name: "Solar: 55%", value: 55, color: "#f59e0b" },
  { name: "Wind: 25%", value: 25, color: "#3b82f6" },
  { name: "Biomass: 15%", value: 15, color: "#10b981" },
  { name: "Grid: 5%", value: 5, color: "#64748b" },
];

const monthlyData = [
  { month: "Jan", solar: 1150, wind: 480, biomass: 380, demand: 1900 },
  { month: "Feb", solar: 1300, wind: 500, biomass: 380, demand: 1950 },
  { month: "Mar", solar: 1550, wind: 550, biomass: 400, demand: 2050 },
  { month: "Apr", solar: 1800, wind: 600, biomass: 400, demand: 2100 },
  { month: "May", solar: 1900, wind: 600, biomass: 420, demand: 2150 },
  { month: "Jun", solar: 1750, wind: 650, biomass: 420, demand: 2200 },
];

const financialProjectionData = [
  { year: "Year 1", savings: 6200 },
  { year: "Year 3", savings: 19500 },
  { year: "Year 5", savings: 34500 },
  { year: "Year 10", savings: 74000 },
  { year: "Year 15", savings: 128000 },
  { year: "Year 20", savings: 183000 },
  { year: "Year 25", savings: 258000 },
];

const SimulationResultsNZEB = () => {
  const handleRunSimulation = () => {
    console.log("Run NZEB simulation");
    // TODO: trigger simulation API call
  };
  return (
    <CommonBorderWrapper isShadow>
      <div className="flex sm:items-center justify-between  flex-col sm:flex-row gap-3">
        <SectionHeader size="xl" title="Simulation Results" />
        <CommonButton onClick={handleRunSimulation}>
          <Play className="w-4 h-4 mr-1.5" />
          Run NZEB Simulation
        </CommonButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ">
        <BMiniCard
          icon={TrendingUp}
          iconColorClassName="text-green-600"
          label="Renewable Contribution"
          value="95%"
          valueClass="text-green-600"
          des="of annual demand"
          bgClassName="bg-green-50"
        />
        <BMiniCard
          icon={DollarSign}
          iconColorClassName="text-green-600"
          label="Annual Cost Savings"
          value="$6,200"
          valueClass="text-green-600"
          des="first year"
          bgClassName="bg-green-50"
        />
        <BMiniCard
          icon={Zap}
          iconColorClassName="text-amber-500"
          label="Annual Generation"
          value="19,200"
          valueClass="text-amber-500"
          des="kWh/year"
          bgClassName="bg-amber-50"
        />
        <BMiniCard
          icon={Leaf}
          iconColorClassName="text-blue-600"
          label="Carbon Reduction"
          value="14.5"
          valueClass="text-blue-600"
          des="tons CO₂/year"
          bgClassName="bg-blue-50"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
        <div>
          <SectionHeader size="lg" title="Energy Source Distribution" />
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={95}
                  label={({ name }) => name}
                  labelLine={{ stroke: "#94a3b8" }}
                >
                  {distributionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <SectionHeader size="lg" title="Monthly Generation vs Demand" />
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
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
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  content={<BarTooltip />}
                  cursor={{ fill: "#f1f5f9" }}
                />
                <Legend wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
                <Bar dataKey="solar" name="Solar" stackId="a" fill="#f59e0b" />
                <Bar dataKey="wind" name="Wind" stackId="a" fill="#3b82f6" />
                <Bar
                  dataKey="biomass"
                  name="Biomass"
                  stackId="a"
                  fill="#10b981"
                />
                <Bar
                  dataKey="demand"
                  name="Demand"
                  fill="#64748b"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Financial projection */}
      <div className="">
        <SectionHeader size="lg" title="25-Year Financial Projection" />
        <div className="h-72 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={financialProjectionData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />
              <XAxis
                dataKey="year"
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<BarTooltip />} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
              <Line
                type="monotone"
                dataKey="savings"
                name="Cumulative Savings ($)"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Financial summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6  ">
        <BMiniCard label="Payback Period" value="8.2 years" />
        <BMiniCard
          label="Net Present Value"
          value="$89,450"
          valueClass="text-primary"
        />
        <BMiniCard label="ROI (25 years)" value="197%" />
      </div>
    </CommonBorderWrapper>
  );
};

export default SimulationResultsNZEB;
