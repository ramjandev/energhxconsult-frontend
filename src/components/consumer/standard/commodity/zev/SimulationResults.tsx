import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import BarTooltip from "@/components/consumer/basic/building/management/BarTooltip";
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

const VEHICLE_TYPES = [
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Truck", value: "truck" },
  { label: "Van", value: "van" },
];

const CHARGING_METHODS = [
  { label: "Level 1 (120V)", value: "level1" },
  { label: "Level 2 (240V)", value: "level2" },
  { label: "DC Fast Charging", value: "dcfc" },
];

const dailyChargingData = [
  { time: "12AM", power: 7.5, cost: 0.5 },
  { time: "3AM", power: 7.2, cost: 0.55 },
  { time: "6AM", power: 7.5, cost: 0.5 },
  { time: "9AM", power: 0, cost: 0 },
  { time: "12PM", power: 0, cost: 0 },
  { time: "3PM", power: 0, cost: 0 },
  { time: "6PM", power: 3.5, cost: 0.45 },
  { time: "9PM", power: 7.2, cost: 0.58 },
];

const utilizationData = [
  { name: "Charging: 65%", value: 65, color: "#3b82f6" },
  { name: "Idle: 25%", value: 25, color: "#10b981" },
  { name: "Maintenance: 10%", value: 10, color: "#f59e0b" },
];

const trendsData = [
  { month: "Jan", energy: 450, cost: 65 },
  { month: "Feb", energy: 430, cost: 62 },
  { month: "Mar", energy: 460, cost: 68 },
  { month: "Apr", energy: 445, cost: 64 },
  { month: "May", energy: 455, cost: 67 },
  { month: "Jun", energy: 465, cost: 70 },
];
const SimulationResults = () => {
  const handleRunSimulation = () => {
    console.log("Run simulation");
    // TODO: trigger simulation API call
  };
  return (
    <CommonBorderWrapper isShadow>
      <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-3 ">
        <SectionHeader size="xl" title="Simulation Results" />
        <CommonButton onClick={handleRunSimulation}>
          <Play className="w-4 h-4 mr-1.5" />
          Run Simulation
        </CommonButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 ">
        <BMiniCard
          icon={DollarSign}
          iconColorClassName="text-blue-600"
          label="Charging Cost"
          value="$2.43"
          des="$72.90/month"
          bgClassName="bg-blue-50"
        />
        <BMiniCard
          icon={Zap}
          iconColorClassName="text-green-600"
          label="Energy Demand"
          value="16.2"
          des="kWh/day"
          bgClassName="bg-green-50"
        />
        <BMiniCard
          icon={Clock}
          iconColorClassName="text-amber-500"
          label="Vehicle Uptime"
          value="96%"
          des="23 hrs/day"
          bgClassName="bg-amber-50"
        />
        <BMiniCard
          icon={Battery}
          iconColorClassName="text-purple-600"
          label="Battery Utilization"
          value="68%"
          des="Average SOC"
          bgClassName="bg-purple-50"
        />
        <BMiniCard
          icon={TrendingUp}
          iconColorClassName="text-green-600"
          label="Annual Savings"
          value="$1,850"
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
