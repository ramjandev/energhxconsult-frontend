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
  TrendingUp,
  Wind,
  X,
} from "lucide-react";
import { useState } from "react";

const BWindEnergy = () => {
  const [interested, setInterested] = useState<"yes" | "no" | null>(null);

  const handleSubmit = () => {
    if (!interested) return;
    console.log("Wind interest →", interested);
    // TODO: dispatch / API call, then navigate next
  };

  return (
    <div className="space-y-6">
      <IconSectionHeader
        icon={Wind}
        title="Wind Energy Potential"
        description="Assess your wind energy potential and savings"
        iconBgClassName="bg-[#DBEAFE]"
        iconClassName="text-[#155DFC]"
      />

      <div className="rounded-[14px] border-2 border-[#BEDBFF] bg-gradient-to-br from-[#EFF6FF] to-white p-6 space-y-6">
        <SectionHeader size="xl" title="Wind Analysis Results" />

        <div className="grid  grid-cols-2 xl:grid-cols-4 gap-6 ">
          <StatBlock
            icon={Wind}
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#155DFC]"
            label="Recommended System"
            value="5.0 kW"
            sub="1 turbine"
          />

          <StatBlock
            icon={TrendingUp}
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#00A63E]"
            label="Annual Generation"
            value="8,200 kWh"
            sub="Per year"
          />

          <StatBlock
            icon={DollarSign}
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#155DFC]"
            label="Annual Savings"
            value="$1,380"
            sub="Energy cost reduction"
          />

          <StatBlock
            icon={Calendar}
            iconBg="bg-[#F3E8FF]"
            iconColor="text-[#9810FA]"
            label="Payback Period"
            value="11.2 years"
            sub="Return on investment"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="System Specifications" />

          <div>
            <SpecRow label="Turbine Type" value="Horizontal Axis" />
            <SpecRow label="Rotor Diameter" value="6.2 m" />
            <SpecRow label="Hub Height" value="18 m" />
            <SpecRow label="Cut-in Wind Speed" value="3.5 m/s" />
            <SpecRow
              label="Rated Wind Speed"
              value="12 m/s"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Financial Breakdown" />

          <div>
            <SpecRow label="System Cost" value="$15,200" />
            <SpecRow
              label="Federal Tax Credit (30%)"
              value="-$4,560"
              valueClass="text-green-600"
            />
            <SpecRow label="Net Cost" value="$10,640" />
            <SpecRow
              label="Annual Savings"
              value="$1,380"
              valueClass="text-green-600"
            />
            <SpecRow
              label="25-Year Savings"
              value="$34,500"
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
            value="4.1 tons/year"
            valueClass="text-green-600"
            sub="Equivalent to planting 95 trees annually"
          />

          <StatBlock
            label="Clean Energy"
            value="100%"
            valueClass="text-green-600"
            sub="Renewable energy source"
          />

          <StatBlock
            label="Energy Independence"
            value="60%"
            valueClass="text-green-600"
            sub="Self-sufficiency rating"
          />
        </div>
      </div>

      <CommonBorderWrapper className="space-y-4">
        <SectionHeader size="lg" title="Wind Resource Assessment" />
        <div className="space-y-4">
          <ProgressStat
            label="Average Wind Speed"
            status="6.5 m/s (Good)"
            percentage={75}
            color="bg-[#155DFC]!"
          />

          <ProgressStat
            label="Site Suitability"
            status="Good"
            percentage={75}
            color="bg-[#155DFC]!"
          />

          <ProgressStat label="Turbulence Level" status="Low" percentage={29} />

          <ProgressStat
            label="Obstacle-Free Zone"
            status="Excellent"
            percentage={87}
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Are you interested in wind energy?" />

        <div className="flex flex-col sm:flex-row gap-4">
          <SelectableOptionCard
            icon={Check}
            title="Yes, I'm interested"
            description="Include wind in my energy plan"
            selected={interested === "yes"}
            onClick={() => setInterested("yes")}
          />

          <SelectableOptionCard
            icon={X}
            title="No, not at this time"
            description="Continue without wind"
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
          to="../biomass-energy"
        >
          Save with Next
          <ArrowRight className="w-4 h-4" />
        </CommonButton>
      </div>
    </div>
  );
};

export default BWindEnergy;
