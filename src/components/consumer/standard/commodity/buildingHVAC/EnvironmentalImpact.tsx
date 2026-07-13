import CommonHeader from "@/common/header/CommonHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import React from "react";
import { EnvironmentalImpact as EnvironmentalImpactType } from "./vacTypes";

interface EnvironmentalImpactProps {
  impact: EnvironmentalImpactType;
  className?: string;
}

const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({
  impact,
  className = "",
}) => {
  return (
    <div
      className={`bg-white border border-[#E5E7EB] rounded-2xl p-6 ${className}`}
    >
      <CommonHeader size="xl" className="mb-6">
        Environmental Impact
      </CommonHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BMiniCard
          layout="stacked"
          label="CO₂ Reduction"
          value={`${impact.co2ReductionTonsPerYear} tons/year`}
          des="vs. conventional HVAC system"
          valueClass="text-[#15803D]!"
          bgClassName="bg-[#EAF7E6]/60"
        />
        <BMiniCard
          layout="stacked"
          label="Energy Savings"
          value={`${impact.energySavingsPercent}%`}
          des="vs. baseline equipment"
          valueClass="text-[#15803D]!"
          bgClassName="bg-[#EAF7E6]/60"
        />
        <BMiniCard
          layout="stacked"
          label="Refrigerant GWP"
          value={`${impact.refrigerantGwp} GWP`}
          des="R-32 low-GWP refrigerant"
          valueClass="text-[#15803D]!"
          bgClassName="bg-[#EAF7E6]/60"
        />
      </div>
    </div>
  );
};

export default EnvironmentalImpact;
