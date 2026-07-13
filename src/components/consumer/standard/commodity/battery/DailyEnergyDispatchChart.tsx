import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface DispatchPoint {
  hour: string;
  solarKw: number;
  windKw: number;
  demandKw: number;
  batteryKw: number;
}

const HOURS = [0, 6, 9, 12, 15, 18, 21];

const buildDispatchData = (
  solarSystemSizeKw: number,
  avgDemandKw: number,
): DispatchPoint[] => {
  return HOURS.map((h) => {
    // Solar: bell curve peaking near midday
    const solarShape = Math.max(0, Math.sin(((h - 6) / 12) * Math.PI) ** 1.4);
    const solarKw = Math.round(solarSystemSizeKw * solarShape * 10) / 10;

    // Wind: fairly flat with a small evening pickup
    const windKw = Math.round((avgDemandKw * 0.35 + h * 0.02) * 10) / 10;

    // Demand: rises through the day, peaks in the evening
    const demandShape = 0.4 + 0.6 * Math.sin(((h + 3) / 24) * Math.PI * 1.3);
    const demandKw = Math.round(avgDemandKw * (0.7 + demandShape) * 10) / 10;

    // Battery: positive = discharging to cover shortfall, negative = charging
    const batteryKw =
      Math.round((solarKw + windKw - demandKw) * -1 * 0.6 * 10) / 10;

    return {
      hour: h.toString().padStart(2, "0"),
      solarKw,
      windKw,
      demandKw,
      batteryKw,
    };
  });
};

interface DailyEnergyDispatchChartProps {
  solarSystemSizeKw?: number;
  avgDemandKw?: number;
}

const DailyEnergyDispatchChart: React.FC<DailyEnergyDispatchChartProps> = ({
  solarSystemSizeKw = 8,
  avgDemandKw = 6,
}) => {
  const data = buildDispatchData(solarSystemSizeKw, avgDemandKw);

  return (
    <CommonBorderWrapper isShadow>
      <h3 className="text-xl font-bold text-[#112518] mb-4">
        Daily Energy Dispatch Profile
      </h3>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 16, left: -8, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="#E5E7EB"
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={{ stroke: "#E5E7EB" }}
              tick={{ fill: "#758179", fontSize: 13 }}
            />
            <YAxis
              domain={[-10, 10]}
              ticks={[-10, -5, 0, 5, 10]}
              tickLine={false}
              axisLine={false}
              tick={{ fill: "#758179", fontSize: 13 }}
            />
            <Line
              type="monotone"
              dataKey="solarKw"
              name="Solar (kW)"
              stroke="#F59E0B"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#F59E0B", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="windKw"
              name="Wind (kW)"
              stroke="#38BDF8"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#38BDF8", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="demandKw"
              name="Demand (kW)"
              stroke="#6B7280"
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={{ r: 3, fill: "#fff", stroke: "#6B7280", strokeWidth: 1.5 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="batteryKw"
              name="Battery (kW)"
              stroke="#8B5CF6"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#8B5CF6", strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center flex-wrap gap-5 mt-2">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="text-sm font-medium text-[#F59E0B]">Solar (kW)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#38BDF8]" />
          <span className="text-sm font-medium text-[#38BDF8]">Wind (kW)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#6B7280]" />
          <span className="text-sm font-medium text-[#6B7280]">
            Demand (kW)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
          <span className="text-sm font-medium text-[#8B5CF6]">
            Battery (kW)
          </span>
        </div>
      </div>
    </CommonBorderWrapper>
  );
};

export default DailyEnergyDispatchChart;
