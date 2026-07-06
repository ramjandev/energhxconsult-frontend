import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import IconSectionHeader from "@/components/consumer/basic/renewable/IconSectionHeader";

import FeatureCard from "@/components/consumer/basic/dashboard/FeatureCard";
import ProgressStat from "@/components/consumer/basic/renewable/ProgressStat";
import SelectableOptionCard from "@/components/consumer/basic/renewable/SelectableOptionCard";
import SolarPanelConfiguration from "@/components/consumer/basic/renewable/SolarPanelConfiguration";
import SpecRow from "@/components/consumer/basic/renewable/SpecRow";
import StatBlock from "@/components/consumer/basic/renewable/StatBlock";
import {
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  Droplet,
  Leaf,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";
import { useState } from "react";

const BBiomassEnergy = () => {
  const [interested, setInterested] = useState<"yes" | "no" | null>(null);

  const handleSubmit = () => {
    if (!interested) return;
    console.log("Biomass interest →", interested);
  };

  return (
    <div className="space-y-6">
      <IconSectionHeader
        icon={Leaf}
        title="Biomass Energy Potential"
        description="Assess your biomass energy potential and savings"
        iconBgClassName="bg-[#F3E8FF]"
        iconClassName="text-[#9810FA]"
      />
      <SolarPanelConfiguration
        panelCapacity=""
        onPanelCapacityChange={() => {}}
      />
      <div className="rounded-[14px] border-2 border-[#E9D4FF] bg-gradient-to-br from-[#FAF5FF] to-white p-6">
        <SectionHeader title="Biomass Energy Potential" />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <StatBlock
            icon={Leaf}
            iconBg="bg-[#FFEDD4]"
            iconColor="text-[#F54900]"
            label="Recommended System"
            value="3.5 kW"
            sub="1 biomass boiler"
          />

          <StatBlock
            icon={TrendingUp}
            iconBg="bg-[#DCFCE7]"
            iconColor="text-[#00A63E]"
            label="Annual Generation"
            value="6,100 kWh"
            sub="Per year"
          />

          <StatBlock
            icon={DollarSign}
            iconBg="bg-[#DBEAFE]"
            iconColor="text-[#155DFC]"
            label="Annual Savings"
            value="$980"
            sub="Energy cost reduction"
          />

          <StatBlock
            icon={Calendar}
            iconBg="bg-[#F3E8FF]"
            iconColor="text-[#9810FA]"
            label="Payback Period"
            value="9.5 years"
            sub="Return on investment"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="System Specifications" />

          <div>
            <SpecRow label="Feedstock Type" value="Wood Pellets" />
            <SpecRow label="Boiler Efficiency" value="88%" />
            <SpecRow label="Storage Capacity" value="2.5 tons" />
            <SpecRow label="Fuel Consumption" value="1.2 tons/month" />
            <SpecRow
              label="Emission Control"
              value="Catalytic Filter"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Financial Breakdown" />

          <div>
            <SpecRow label="System Cost" value="$9,300" />
            <SpecRow
              label="Federal Tax Credit (26%)"
              value="-$2,418"
              valueClass="text-green-600"
            />
            <SpecRow label="Net Cost" value="$6,882" />
            <SpecRow
              label="Annual Savings"
              value="$980"
              valueClass="text-green-600"
            />
            <SpecRow
              label="25-Year Savings"
              value="$24,500"
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
            value="3.0 tons/year"
            valueClass="text-green-600"
            sub="Equivalent to planting 70 trees annually"
          />

          <StatBlock
            label="Renewable Content"
            value="90%"
            valueClass="text-green-600"
            sub="Sustainably sourced feedstock"
          />

          <StatBlock
            label="Energy Independence"
            value="45%"
            valueClass="text-green-600"
            sub="Self-sufficiency rating"
          />
        </div>
      </div>

      <CommonBorderWrapper className="space-y-4">
        <SectionHeader size="lg" title="Feedstock Availability" />
        <div className="space-y-4">
          <ProgressStat
            label="Local Availability"
            status="Good"
            percentage={75}
            description="3 suppliers within 50 miles"
          />
          <ProgressStat
            label="Price Stability"
            status="Adequate"
            percentage={65}
            description="$250/ton average market price"
          />
          <ProgressStat
            label="Quality (Moisture Content)"
            status="Compliant"
            percentage={85}
          />
        </div>
      </CommonBorderWrapper>
      <CommonBorderWrapper isShadow>
        <h2 className="text-lg font-bold text-foreground mb-4">
          Key System Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            isRow
            icon={<RefreshCw />}
            title="Automatic Feeding"
            description="500 kg fuel storage with automatic feed system"
            iconBgClassName="bg-[#F3E8FF] w-10! h-10!"
            iconColorClassName="text-purple-600 w-6! h-6!"
          />
          <FeatureCard
            isRow
            icon={<Leaf />}
            title="Emission Control"
            description="Advanced filtration and emission control system"
            iconBgClassName="bg-[#DCFCE7] w-10! h-10!"
            iconColorClassName="text-green-600 w-6! h-6!"
          />
          <FeatureCard
            isRow
            icon={<Droplet />}
            title="Hydronic Integration"
            description="Compatible with existing hot water heating systems"
            iconBgClassName="bg-[#DBEAFE] w-10! h-10!"
            iconColorClassName="text-blue-600 w-6! h-6!"
          />
          <FeatureCard
            isRow
            icon={<ShieldCheck />}
            title="15-Year Warranty"
            description="Comprehensive system warranty"
            iconBgClassName="bg-[#FFEDD4] w-10! h-10!"
            iconColorClassName="text-orange-600 w-6! h-6!"
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
            description="Include biomass in my energy plan"
            selected={interested === "yes"}
            onClick={() => setInterested("yes")}
          />

          <SelectableOptionCard
            icon={X}
            title="No, not at this time"
            description="Continue without biomass"
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
          to="../analysis"
        >
          Save with Next
          <ArrowRight className="w-4 h-4" />
        </CommonButton>
      </div>
    </div>
  );
};

export default BBiomassEnergy;
