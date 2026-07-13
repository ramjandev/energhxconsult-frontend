import CommonButton from "@/common/button/CommonButton";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import ModuleConfigs from "@/components/consumer/standard/commodity/nzeb/ModuleConfigs";
import SimulationResultsNZEB from "@/components/consumer/standard/commodity/nzeb/SimulationResultsNZEB";
import FooterActions from "@/components/consumer/standard/commodity/zev/FooterActions";
import { Building2 } from "lucide-react";
import React from "react";

const NetZeroEnergyBuilding: React.FC = () => {
  return (
    <div className="space-y-6">
      <Welcome
        title="Net Zero Energy Building (NZEB)"
        description="Advanced hybrid renewable energy simulation and optimization"
        className="border-[#00A63E]/20 bg-gradient-to-r from-[#00A63E]/10 to-[#155DFC]/10!"
        Icons={Building2}
        iconColor="text-[#00A63E]"
        iconBg="bg-[#00A63E]/20"
      />
      <Welcome
        title="Utility Data Connection Required"
        description="Connect your utility provider to automatically import electricity and
        gas consumption data."
        isConnected
        variant="secondary"
        actions={
          <CommonButton variant="primaryBlue" className="">
            Request Permission
          </CommonButton>
        }
      />

      <ModuleConfigs />
      <SimulationResultsNZEB />

      <FooterActions
        backText="Back to ZEV"
        continueText="Continue to Thermal Comfort"
        to="../thermal-comfort-simulation"
      />
    </div>
  );
};

export default NetZeroEnergyBuilding;
