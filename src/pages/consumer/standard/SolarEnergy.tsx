import SolarSystemDesign from "@/components/consumer/standard/commodity/solar/SolarSystemDesign";
import { useState } from "react";

const SolarEnergy = () => {
  const [isUtilityConnected, setIsUtilityConnected] = useState(false);

  return (
    <div>
      <SolarSystemDesign
        isUtilityConnected={isUtilityConnected}
        onRequestPermission={() => setIsUtilityConnected(true)}
        onBackToCommoditySetup={() => console.log("Back to commodity setup")}
        onContinueToWindSizing={() => console.log("Continue to wind sizing")}
        onGenerateDesign={(items, parameters) =>
          console.log("Generated design:", { items, parameters })
        }
      />
    </div>
  );
};

export default SolarEnergy;
