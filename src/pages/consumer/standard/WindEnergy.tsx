import WindSystemDesign from "@/components/consumer/standard/commodity/wind/WindSystemDesign";
import { useState } from "react";

const WindEnergy = () => {
  const [isUtilityConnected, setIsUtilityConnected] = useState(false);

  return (
    <div>
      <WindSystemDesign
        isUtilityConnected={isUtilityConnected}
        onRequestPermission={() => setIsUtilityConnected(true)}
        onBackToSolarSizing={() => console.log("Back to solar sizing")}
        onGenerateDesign={(items, parameters) =>
          console.log("Generated wind design:", { items, parameters })
        }
      />
    </div>
  );
};

export default WindEnergy;
