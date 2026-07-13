import BuildingHvacModelling from "@/components/consumer/standard/commodity/buildingHVAC/BuildingHvacModelling";
import { useState } from "react";

const HvacModelling = () => {
  const [isUtilityConnected, setIsUtilityConnected] = useState(false);

  return (
    <div>
      <BuildingHvacModelling
        isUtilityConnected={isUtilityConnected}
        onRequestPermission={() => setIsUtilityConnected(true)}
        onBackToBiomassSizing={() => console.log("Back to biomass sizing")}
        onGenerateConfiguration={(items, parameters) =>
          console.log("Generated HVAC configuration:", { items, parameters })
        }
      />
    </div>
  );
};

export default HvacModelling;
