import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import FeatureCard from "@/components/consumer/basic/dashboard/FeatureCard";

import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";

import { PiDropBold, PiLightningBold, PiWindBold } from "react-icons/pi";
const RenewableMicroservices = () => {
  return (
    <div className="space-y-6">
      <div>
        <SectionHeader
          title="Renewable Energy Microservices"
          description="After completing your audit, explore our specialized renewable energy solutions tailored to your building's needs"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 ">
        <FeatureCard
          icon={<PiLightningBold className="w-full h-full" />}
          iconBgClassName="bg-[#F59E0B]/10"
          iconColorClassName="text-[#F59E0B]"
          title="Solar"
          description="Deep analysis of your building's energy consumption patterns and infrastructure"
        />
        <FeatureCard
          icon={<PiWindBold className="w-full h-full" />}
          iconBgClassName="bg-[#3B82F6]/10"
          iconColorClassName="text-[#3B82F6]"
          title="Wind"
          description="Evaluate wind energy opportunities based on location and wind patterns"
        />
        <FeatureCard
          icon={<PiDropBold className="w-full h-full" />}
          iconBgClassName="bg-[#8B5CF6]/10"
          iconColorClassName="text-[#8B5CF6]"
          title="Biomass"
          description="Explore biomass energy solutions for sustainable waste-to-energy conversion"
        />
      </div>
      <CommonBorderWrapper
        isShadow
        className="flex flex-col gap-1 items-center justify-center space-y-3!"
      >
        <CommonHeader
          size="sm"
          className="text-[#1C398E]! font-semibold! flex items-center gap-1"
        >
          🔒 Renewable Energy Evaluation is locked until you complete your
          building audit
        </CommonHeader>

        <CommonButton
          disabled
          shape="rounded"
          size="lg"
          className="bg-[#D1D5DC]! text-[#6A7282]! "
        >
          🔒Complete Audit to Unlock
        </CommonButton>
      </CommonBorderWrapper>
    </div>
  );
};

export default RenewableMicroservices;
