import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import IconSectionHeader from "@/components/consumer/basic/renewable/IconSectionHeader";
import ProgressStat from "@/components/consumer/basic/renewable/ProgressStat";
import SelectableOptionCard from "@/components/consumer/basic/renewable/SelectableOptionCard";
import SpecRow from "@/components/consumer/basic/renewable/SpecRow";
import StatBlock from "@/components/consumer/basic/renewable/StatBlock";

import {
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  Sun,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";

const BSolarEnergy = () => {
  const [interested, setInterested] = useState<"yes" | "no" | null>(null);

  const handleSubmit = () => {
    if (!interested) return;
    console.log("Solar interest →", interested);
    // TODO: dispatch / API call, then navigate next
  };

  return (
    <div className="space-y-6">
      <IconSectionHeader
        icon={Sun}
        title="Solar Energy Potential"
        description="Assess your solar energy potential and savings"
        iconBgClassName="bg-[#FFEDD4]"
        iconClassName="text-[#F54900]"
      />

      <div className="rounded-[14px] border-2 border-[#FFD6A8] bg-gradient-to-br from-[#FFF7ED] to-white-2xl p-6">
        <SectionHeader title="Solar Analysis Results" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <StatBlock
            icon={Sun}
            iconBg="bg-[#FFEDD4]"
            iconColor="text-[#F54900]"
            label="Recommended System"
            value="8.5 kW"
            sub="24 panels"
          />
          <StatBlock
            icon={TrendingUp}
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#00A63E]"
            label="Annual Generation"
            value="12,450 kWh"
            sub="Per year"
          />
          <StatBlock
            icon={DollarSign}
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#155DFC]"
            label="Annual Savings"
            value="$2,100"
            sub="Energy cost reduction"
          />
          <StatBlock
            icon={Calendar}
            iconBg="bg-[#F3E8FF]"
            iconColor="text-[#9810FA]"
            label="Payback Period"
            value="8.8 years"
            sub="Return on investment"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="System Specifications" />

          <div>
            <SpecRow label="Panel Type" value="Monocrystalline" />
            <SpecRow label="Panel Efficiency" value="21.5%" />
            <SpecRow label="Number of Panels" value="24 units" />
            <SpecRow label="Inverter Type" value="String Inverter" />
            <SpecRow
              label="Battery Storage"
              value="13.5 kWh"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Financial Breakdown" />

          <div>
            <SpecRow label="System Cost" value="$18,500" />
            <SpecRow
              label="Federal Tax Credit (30%)"
              value="-$5,550"
              valueClass="text-green-600"
            />
            <SpecRow label="Net Cost" value="$12,950" />
            <SpecRow
              label="Annual Savings"
              value="$2,100"
              valueClass="text-green-600"
            />
            <SpecRow
              label="25-Year Savings"
              value="$52,500"
              valueClass="text-orange-500"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>
      </div>

      <div className="rounded-[14px] border-2 border-[#B9F8CF] bg-gradient-to-br from-[#F0FDF4] to-white p-6 space-y-4">
        <SectionHeader size="xl" title="Environmental Impact" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatBlock
            label="CO₂ Reduction"
            value="6.2 tons/year"
            valueClass="text-green-600"
            sub="Equivalent to planting 145 trees annually"
          />
          <StatBlock
            label="Clean Energy"
            value="100%"
            valueClass="text-green-600"
            sub="Renewable energy source"
          />
          <StatBlock
            label="Energy Independence"
            value="85%"
            valueClass="text-green-600"
            sub="Self-sufficiency rating"
          />
        </div>
      </div>

      <CommonBorderWrapper className="space-y-4">
        <SectionHeader size="lg" title="Site Suitability Analysis" />
        <div className="space-y-4">
          <ProgressStat
            label="Roof Orientation"
            status="Excellent (South-facing)"
            percentage={96}
          />

          <ProgressStat
            label="Solar Irradiance"
            status="Very Good"
            percentage={88}
          />

          <ProgressStat
            label="Shading Analysis"
            status="Minimal Shading"
            percentage={92}
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader
          size="lg"
          title="Are you interested in biomass energy?"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <SelectableOptionCard
            icon={Check}
            title="Yes, I'm interested"
            description="Include solar in my energy plan"
            selected={interested === "yes"}
            onClick={() => setInterested("yes")}
          />
          <SelectableOptionCard
            icon={X}
            title="No, not at this time"
            description="Continue without solar"
            selected={interested === "no"}
            onClick={() => setInterested("no")}
            selectedColor="border-gray-400 bg-gray-50"
          />
        </div>
      </CommonBorderWrapper>

      <div className="flex justify-end">
        <CommonButton
          type="submit"
          onClick={handleSubmit}
          disabled={!interested}
          to="../wind-energy"
        >
          Save with Next
          <ArrowRight className="w-4 h-4" />
        </CommonButton>
      </div>
    </div>
  );
};

export default BSolarEnergy;
