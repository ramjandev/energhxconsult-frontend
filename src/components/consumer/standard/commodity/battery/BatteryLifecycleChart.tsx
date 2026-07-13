import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface LifecyclePoint {
  year: string;
  retentionPct: number;
}

const buildLifecycleData = (warrantyYears: number): LifecyclePoint[] => {
  // Typical LFP/NMC degradation curve, roughly 2%/yr early, tapering.
  const curve: { year: string; yearsElapsed: number }[] = [
    { year: "Y1", yearsElapsed: 1 },
    { year: "Y3", yearsElapsed: 3 },
    { year: "Y5", yearsElapsed: 5 },
    { year: "Y8", yearsElapsed: 8 },
    { year: "Y10", yearsElapsed: 10 },
    { year: "Y12", yearsElapsed: Math.max(12, warrantyYears) },
  ];

  return curve.map(({ year, yearsElapsed }) => ({
    year,
    retentionPct:
      Math.round((100 - yearsElapsed * 1.6 - yearsElapsed ** 1.15) * 10) / 10,
  }));
};

interface BatteryLifecycleChartProps {
  warrantyYears?: number;
}

const BatteryLifecycleChart: React.FC<BatteryLifecycleChartProps> = ({
  warrantyYears = 10,
}) => {
  const data = buildLifecycleData(warrantyYears);

  return (
    <CommonBorderWrapper isShadow>
      <h3 className="text-xl font-bold text-[#112518] mb-4">
        Battery Lifecycle Analysis
      </h3>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 12, left: -8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
              tick={{ fill: "#758179", fontSize: 13 }}
            />
            <YAxis
              domain={[60, 100]}
              ticks={[60, 70, 80, 90, 100]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#758179", fontSize: 13 }}
            />
            <Bar
              dataKey="retentionPct"
              name="Capacity Retention (%)"
              fill="#8B5CF6"
              radius={[6, 6, 0, 0]}
              maxBarSize={72}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-2 mt-2">
        <span className="w-3 h-3 rounded-sm bg-[#8B5CF6]" />
        <span className="text-sm font-medium text-[#8B5CF6]">
          Capacity Retention (%)
        </span>
      </div>
    </CommonBorderWrapper>
  );
};

export default BatteryLifecycleChart;
