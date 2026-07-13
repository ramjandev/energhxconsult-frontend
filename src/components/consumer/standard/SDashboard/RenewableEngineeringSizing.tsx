import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import { Leaf, Sun, Wind } from "lucide-react";
import React from "react";
import SizingModuleCard from "./SizingModuleCard";

const RenewableEngineeringSizing: React.FC = () => {
  const handleConfigure = (module: string) => {
    console.log("Configure system →", module);
    // TODO: navigate to sizing tool
  };

  return (
    <CommonBorderWrapper isShadow>
      <SectionHeader
        size="xl"
        title="Renewable Engineering Sizing"
        description="Advanced system sizing and optimization tools
"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SizingModuleCard
          icon={Sun}
          iconColor="text-amber-500"
          title="Solar Sizing"
          description="Professional sizing calculations and system optimization"
          bgClassName="bg-amber-50"
          onConfigure={() => handleConfigure("solar")}
        />

        <SizingModuleCard
          icon={Wind}
          iconColor="text-blue-500"
          title="Wind Sizing"
          description="Professional sizing calculations and system optimization"
          bgClassName="bg-blue-50"
          onConfigure={() => handleConfigure("wind")}
        />

        <SizingModuleCard
          icon={Leaf}
          iconColor="text-green-600"
          title="Biomass Sizing"
          description="Professional sizing calculations and system optimization"
          bgClassName="bg-green-50"
          onConfigure={() => handleConfigure("biomass")}
        />
      </div>
    </CommonBorderWrapper>
  );
};

export default RenewableEngineeringSizing;
