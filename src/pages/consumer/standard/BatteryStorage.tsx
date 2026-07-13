import BatteryStorageDesign from "@/components/consumer/standard/commodity/battery/BatteryStorageDesign";
import { useState } from "react";

const BatteryStorage = () => {
  const [isUtilityConnected, setIsUtilityConnected] = useState(false);

  return (
    <div>
      <BatteryStorageDesign
        isUtilityConnected={isUtilityConnected}
        onRequestPermission={() => setIsUtilityConnected(true)}
        onBackToEngineeringServices={() =>
          console.log("Back to engineering services")
        }
        onGenerateDesign={(items, parameters) =>
          console.log("Generated battery design:", { items, parameters })
        }
      />
    </div>
  );
};

export default BatteryStorage;
