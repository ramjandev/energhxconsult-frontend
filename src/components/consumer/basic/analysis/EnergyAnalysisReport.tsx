import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";

import { BarChart3, DollarSign, Leaf, TrendingUp, Zap } from "lucide-react";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import BMiniCard from "../building/card/BMiniCard";
import HeaderBanner from "../building/HeaderBanner";
import StatBlock from "../renewable/StatBlock";
import InsightStat from "./InsightStat";
import RecommendationItem from "./RecommendationItem";

const usageData = [
  { month: "Jan", usage: 1200 },
  { month: "Feb", usage: 1100 },
  { month: "Mar", usage: 1000 },
  { month: "Apr", usage: 950 },
  { month: "May", usage: 1300 },
  { month: "Jun", usage: 1520 },
];

const distributionData = [
  { name: "Solar", value: 55, color: "#f59e0b" },
  { name: "Wind", value: 25, color: "#3b82f6" },
  { name: "Grid", value: 20, color: "#64748b" },
];

const recommendations = [
  {
    title: "Add Battery Storage",
    description:
      "Store excess solar energy for nighttime use. Est. additional savings: $800/year",
  },
  {
    title: "Upgrade to LED Lighting",
    description: "Replace remaining traditional bulbs. Est. savings: $150/year",
  },
  {
    title: "Smart Thermostat",
    description: "Optimize heating/cooling schedules. Est. savings: $200/year",
  },
];

function BarTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <div className="font-medium text-slate-700">{label}</div>
      <div className="text-slate-500">{payload[0].value} kWh</div>
    </div>
  );
}

const summaryCards = [
  {
    icon: Zap,
    iconColorClassName: "text-[#2DAD00]",
    iconBgClassName: "bg-[#2DAD00]/10",
    label: "Total Appliances",
    value: 19,
    des: "Across 4 rooms",
  },
  {
    icon: TrendingUp,
    iconColorClassName: "text-[#D08700]",
    iconBgClassName: "bg-[#FEF9C2]",
    label: "Daily Usage",
    value: "27.32 kWh",
    des: "kWh per day",
  },
  {
    icon: BarChart3,
    iconColorClassName: "text-[#155DFC]",
    iconBgClassName: "bg-[#DBEAFE]",
    label: "Monthly Usage",
    value: "820",
    des: "kWh",
  },
  {
    icon: DollarSign,
    iconColorClassName: "text-[#00A63E]",
    iconBgClassName: "bg-[#DCFCE7]",
    label: "Monthly Cost",
    value: "$122.94",
    valueClass: "text-emerald-600",
    des: "at $0.15/kWh",
  },
];
const analysisCards = [
  {
    icon: TrendingUp,
    iconColorClassName: "text-[#16A34A]",
    iconBgClassName: "bg-[#DCFCE7]",
    label: "Energy Score",
    value: "85/100",
    des: "Excellent Performance",
  },
  {
    icon: Leaf,
    iconColorClassName: "text-[#16A34A]",
    iconBgClassName: "bg-[#DCFCE7]",
    label: "Renewable %",
    value: "80%",
    des: "Above Target",
  },
  {
    icon: DollarSign,
    iconColorClassName: "text-[#D08700]",
    iconBgClassName: "bg-[#FEF3C7]",
    label: "Annual Savings",
    value: "$3,250",
    valueClass: "text-[#00A63E]",
    des: "vs. Grid Only",
  },
  {
    icon: Leaf,
    iconColorClassName: "text-[#16A34A]",
    iconBgClassName: "bg-[#DCFCE7]",
    label: "CO₂ Avoided",
    value: "13.6",
    des: "tons/year",
  },
];
const EnergyAnalysisReport: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header */}

      <HeaderBanner
        title="Energy Analysis Report"
        description="Comprehensive insights for your building's energy performance"
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card, index) => (
          <BMiniCard
            key={index}
            className="border-[#E7E9E8]! bg-white! shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]"
            icon={card.icon}
            iconColorClassName={card.iconColorClassName}
            iconBgClassName={card.iconBgClassName}
            label={card.label}
            value={card.value}
            valueClass={card.valueClass}
            des={card.des}
          />
        ))}
      </div>
      {/* Analysis Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {analysisCards.map((card, index) => (
          <BMiniCard
            key={index}
            className="border-[#E7E9E8]! bg-white! shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)]"
            icon={card.icon}
            iconColorClassName={card.iconColorClassName}
            iconBgClassName={card.iconBgClassName}
            label={card.label}
            value={card.value}
            valueClass={card.valueClass}
            des={card.des}
          />
        ))}
      </div>
      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatBlock
          icon={TrendingUp}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Energy Score"
          value="85/100"
          valueClass="text-foreground"
          sub="Excellent Performance"
          className="items-start text-left"
        />
        <StatBlock
          icon={Leaf}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="Renewable %"
          value="80%"
          sub="Above Target"
          className="items-start text-left"
        />
        <StatBlock
          icon={DollarSign}
          iconBg="bg-amber-100"
          iconColor="text-amber-600"
          label="Annual Savings"
          value="$3,250"
          sub="vs. Grid Only"
          className="items-start text-left"
        />
        <StatBlock
          icon={Leaf}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          label="CO2 Avoided"
          value="13.6"
          sub="tons/year"
          className="items-start text-left"
        />
      </div>

      {/* Energy Generation & Usage */}
      <CommonBorderWrapper isShadow>
        <h2 className="text-lg font-bold text-foreground mb-4">
          Energy Generation &amp; Usage
        </h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={usageData}>
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
              <Tooltip content={<BarTooltip />} cursor={{ fill: "#f1f5f9" }} />
              <Legend wrapperStyle={{ fontSize: 12, color: "#64748b" }} />
              <Bar
                dataKey="usage"
                name="Usage"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CommonBorderWrapper>

      {/* Distribution + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonBorderWrapper isShadow>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Energy Source Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distributionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}%`}
                  labelLine={{ stroke: "#94a3b8" }}
                >
                  {distributionData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <h2 className="text-lg font-bold text-foreground mb-4">
            Recommendations
          </h2>
          <div className="space-y-5">
            {recommendations.map((rec, index) => (
              <RecommendationItem
                key={rec.title}
                index={index + 1}
                title={rec.title}
                description={rec.description}
              />
            ))}
          </div>
        </CommonBorderWrapper>
      </div>

      {/* Building Insights */}
      <CommonBorderWrapper isShadow>
        <h2 className="text-lg font-bold text-foreground mb-4">
          Building Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <InsightStat label="Total Appliances" value="41" />
          <InsightStat label="Peak Usage Time" value="6-9 PM" />
          <InsightStat
            label="Efficiency Rating"
            value="A+"
            valueClass="text-green-600"
          />
        </div>
      </CommonBorderWrapper>

      {/* Upgrade CTA */}
      <div
        className="rounded-2xl p-6"
        style={{
          border: "1px solid rgba(45, 173, 0, 0.2)",
          background:
            "linear-gradient(90deg, rgba(45, 173, 0, 0.1) 0%, #EAF7E6 100%)",
        }}
      >
        <h2 className="text-lg font-bold text-foreground mb-2">
          Upgrade to Standard Plan
        </h2>
        <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
          Get access to advanced engineering modules, thermal comfort
          simulation, and professional contract services.
        </p>
        <CommonButton>Upgrade Now</CommonButton>
      </div>
    </div>
  );
};

export default EnergyAnalysisReport;
