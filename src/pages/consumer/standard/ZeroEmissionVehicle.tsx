import CommonButton from "@/common/button/CommonButton";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import OptimizationRecommendations from "@/components/consumer/standard/commodity/setup/OptimizationRecommendations";
import VehicleChargingConfiguration from "@/components/consumer/standard/commodity/setup/VehicleChargingConfiguration";
import FooterActions from "@/components/consumer/standard/commodity/zev/FooterActions";
import SimulationResults from "@/components/consumer/standard/commodity/zev/SimulationResults";
import { Car } from "lucide-react";
import React from "react";

const ZeroEmissionVehicle: React.FC = () => {
  return (
    <div className="space-y-6">
      <Welcome
        title="Zero Emission Vehicle (ZEV)"
        description="Advanced vehicle charging simulation and optimization"
        className="border-[#155DFC]/20 bg-gradient-to-r from-[#155DFC]/10 to-[#0092B8]/10!"
        Icons={Car}
        iconColor="text-[#155DFC]"
        iconBg="bg-[#155DFC]/10"
      />
      <Welcome
        title="Utility Data Connection Required"
        description="Connect your utility provider to automatically import electricity and
          gas consumption data."
        variant="secondary"
        isConnected
        actions={
          <CommonButton variant="primaryBlue" className="">
            Request Permission
          </CommonButton>
        }
      />
      <VehicleChargingConfiguration />
      <SimulationResults />
      <OptimizationRecommendations />
      <FooterActions
        backText="Back to Dashboard"
        continueText="Continue to NZEB Analysis"
        to="../nzeb"
      />
    </div>
  );
};

export default ZeroEmissionVehicle;
