import CommonHeader from "@/common/header/CommonHeader";
import React from "react";
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

interface MonthlyEnergyLoadChartProps {
  data: MonthlyLoadPoint[];
  className?: string;
}

export interface MonthlyLoadPoint {
  month: string;
  cooling: number;
  heating: number;
  baseline: number;
}

const SERIES = [
  { key: "cooling", name: "Cooling Load", color: "#0EA5E9" },
  { key: "heating", name: "Heating Load", color: "#F97316" },
  { key: "baseline", name: "Baseline Load", color: "#8B5CF6" },
] as const;

const MonthlyEnergyLoadChart: React.FC<MonthlyEnergyLoadChartProps> = ({
  data,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-2xl p-6 ${className}`}
    >
      <CommonHeader size="xl" className="mb-6">
        Monthly Energy Load Profile
      </CommonHeader>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 4, right: 8, left: -8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#E5E7EB"
            />
            <XAxis
              dataKey="month"
              axisLine={{ stroke: "#D1D5DB" }}
              tickLine={false}
              tick={{ fill: "#758179", fontSize: 13 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#758179", fontSize: 13 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(17,37,24,0.04)" }}
              contentStyle={{
                borderRadius: 12,
                border: "1px solid #E5E7EB",
                fontSize: 13,
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 13, color: "#758179" }}
            />
            {SERIES.map((s) => (
              <Bar
                key={s.key}
                dataKey={s.key}
                name={s.name}
                fill={s.color}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyEnergyLoadChart;
