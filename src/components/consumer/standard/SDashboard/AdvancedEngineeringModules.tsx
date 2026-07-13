import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import { Building2, Car, Thermometer } from "lucide-react";
import React from "react";
import SimulationModuleCard from "./SimulationModuleCard";

const AdvancedEngineeringModules: React.FC = () => {
  const handleRunSimulation = (module: string) => {
    console.log("Run simulation →", module);
    // TODO: navigate / trigger simulation
  };

  return (
    <CommonBorderWrapper isShadow>
      <SectionHeader
        title="Advanced Engineering Modules"
        description="Specialized computational tools for advanced sustainability analysis"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SimulationModuleCard
          icon={Car}
          iconColor="text-blue-500"
          title="Zero Emission Vehicle"
          description="Advanced vehicle charging simulation and optimization"
          bgClassName="bg-[#EFF6FF]"
          stats={[
            { label: "Station Uptime", value: "98.2%" },
            { label: "Vehicle Uptime", value: "96%" },
            { label: "Energy Delivered", value: "485 kWh" },
            { label: "Charging Time", value: "8 hrs" },
          ]}
          onRunSimulation={() => handleRunSimulation("zev")}
        />

        <SimulationModuleCard
          icon={Building2}
          iconColor="text-green-600"
          title="Net Zero Energy Building"
          description="Hybrid renewable energy simulation and net-zero optimization"
          bgClassName="bg-[#F0FDF4]"
          stats={[
            { label: "Solar Contribution", value: "55%" },
            { label: "Wind Contribution", value: "25%" },
            { label: "Biomass Contribution", value: "15%" },
            { label: "Battery Storage", value: "30 kWh" },
          ]}
          onRunSimulation={() => handleRunSimulation("nzeb")}
        />

        <SimulationModuleCard
          icon={Thermometer}
          iconColor="text-orange-500"
          title="Thermal Comfort Simulation"
          description="FVM heat transfer analysis and building envelope optimization"
          bgClassName="bg-[#FFF7ED]"
          stats={[
            { label: "Thermal Conductivity", value: "0.5 W/m·K" },
            { label: "Heat Transfer", value: "37 W/m²" },
            { label: "Comfort Index", value: "87/100" },
            { label: "Energy Impact", value: "4,450 kWh" },
          ]}
          onRunSimulation={() => handleRunSimulation("thermal")}
        />
      </div>
    </CommonBorderWrapper>
  );
};

export default AdvancedEngineeringModules;
