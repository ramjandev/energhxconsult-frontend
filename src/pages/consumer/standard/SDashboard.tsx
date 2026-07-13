import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import AdvancedEngineeringModules from "@/components/consumer/standard/SDashboard/AdvancedEngineeringModules";
import ImplementationWorkflow from "@/components/consumer/standard/SDashboard/ImplementationWorkflow";
import RenewableEngineeringSizing from "@/components/consumer/standard/SDashboard/RenewableEngineeringSizing";
import SavingsImpactCards from "@/components/consumer/standard/SDashboard/SavingsImpactCards";

const SDashboard = () => {
  return (
    <div className="space-y-4 md:space-y-6 lg:space-y-12">
      <Welcome
        title="Standard Plan Dashboard"
        description="Professional energy engineering and sustainability planning platform"
        variant="secondary"
        actions={
          <>
            <CommonButton variant="primaryBlue" size="lg">
              Add Services
            </CommonButton>

            <CommonButton variant="outlineBlue">
              View Basic Analysis
            </CommonButton>
          </>
        }
      />

      <CommonBorderWrapper isShadow>
        <div className="flex items-start flex-col sm:flex-row justify-between gap-3 ">
          <div>
            <SectionHeader
              title="Standard Plan Status"
              description="Building: Main Office Complex • Lagos, Nigeria"
            />
          </div>
          <CommonButton className="bg-[#2DAD001A]/50! text-[#2DAD00]!">
            Active
          </CommonButton>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
          <BMiniCard
            label="Energy Score"
            value="92"
            valueClass="text-green-600"
            des="out of 100"
            className=" border-[#2DAD00]/20! bg-[linear-gradient(135deg,_rgba(45,173,0,0.10)_0%,_rgba(45,173,0,0.05)_100%)]"
          />
          <BMiniCard
            label="ZER Index"
            value="95%"
            valueClass="text-blue-600"
            des="renewable coverage"
            className=" border-[#155DFC]/20 bg-[linear-gradient(135deg,_rgba(21,93,252,0.10)_0%,_rgba(21,93,252,0.05)_100%)]"
          />
          <BMiniCard
            label="Monthly Usage"
            value="1,950"
            des="kWh average"
            className="bg-[#EAF7E6]/50"
          />
          <BMiniCard
            label="Annual Savings"
            value="$8,920"
            valueClass="text-green-600"
            des="first year"
            className="bg-[linear-gradient(135deg,_rgba(0,166,62,0.10)_0%,_rgba(0,166,62,0.05)_100%)] border-[#00A63E]/20! "
          />
          <BMiniCard
            label="Payback Period"
            value="9.8"
            des="years"
            className="bg-[#EAF7E6]/50"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BMiniCard
            label="EUI"
            value="42.3"
            des="kBtu/ft²/yr"
            className="bg-[#EAF7E6]/50"
          />
          <BMiniCard
            label="Efficiency Rating"
            value="A+"
            valueClass="text-green-600"
            des="Top 5% performance"
            className="bg-[#EAF7E6]/50"
          />
          <BMiniCard
            label="CO₂ Reduction"
            value="22.1"
            des="tons/year"
            className="bg-[#EAF7E6]/50"
          />
          <BMiniCard
            label="System Capacity"
            value="52.5"
            des="kW total"
            className="bg-[#EAF7E6]/50"
          />
        </div>
      </CommonBorderWrapper>
      <Welcome
        title="Utility Data Connection Required"
        description=" Connect your utility provider to automatically import electricity and
        gas consumption data."
        variant="secondary"
        isConnected
        actions={
          <>
            <CommonButton variant="primaryBlue" size="lg">
              Request Permission
            </CommonButton>
          </>
        }
      />

      <AdvancedEngineeringModules />
      <RenewableEngineeringSizing />
      <ImplementationWorkflow />
      <SavingsImpactCards />
    </div>
  );
};

export default SDashboard;
