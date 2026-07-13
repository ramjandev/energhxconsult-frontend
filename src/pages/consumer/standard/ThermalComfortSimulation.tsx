import CommonButton from "@/common/button/CommonButton";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import BuildingParameters from "@/components/consumer/standard/commodity/thermal/BuildingParameters";
import EngineeringRecommendations from "@/components/consumer/standard/commodity/thermal/EngineeringRecommendations";

import SimulationResultsThermal from "@/components/consumer/standard/commodity/thermal/SimulationResultsThermal";
import SimulationSettings from "@/components/consumer/standard/commodity/thermal/SimulationSettings";
import FooterActions from "@/components/consumer/standard/commodity/zev/FooterActions";
import { Thermometer } from "lucide-react";
import React from "react";

const ThermalComfortSimulation: React.FC = () => {
  return (
    <div className="space-y-6">
      <Welcome
        title="Thermal Comfort Simulation"
        description="Advanced FVM heat transfer analysis and building envelope optimization"
        className="border-[#F5490033]! bg-[linear-gradient(90deg,rgba(245,73,0,0.10)_0%,rgba(231,0,11,0.10)_100%)]!"
        Icons={Thermometer}
        iconColor="text-[#F54900]"
        iconBg="bg-[#F54900]/20"
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

      <BuildingParameters />
      <SimulationSettings />
      <SimulationResultsThermal />
      <EngineeringRecommendations />

      <FooterActions
        backText="Back to NZEB"
        continueText="Continue to Services"
        to="../engineering-services"
      />
    </div>
  );
};

export default ThermalComfortSimulation;
