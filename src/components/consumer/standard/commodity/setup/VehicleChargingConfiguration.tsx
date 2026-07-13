import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonSelect from "@/common/button/CommonSelect";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { AlertCircle } from "lucide-react";
import { useState } from "react";

const VEHICLE_TYPES = [
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Truck", value: "truck" },
  { label: "Van", value: "van" },
];

const CHARGING_METHODS = [
  { label: "Level 1 (120V)", value: "level1" },
  { label: "Level 2 (240V)", value: "level2" },
  { label: "DC Fast Charging", value: "dcfc" },
];

const VehicleChargingConfiguration = () => {
  const [vehicleType, setVehicleType] = useState("");
  const [chargingMethod, setChargingMethod] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Vehicle Configuration" />
        <div className="space-y-5">
          <div>
            <label className={inputClass.label}>Vehicle Type</label>
            <CommonSelect
              value={vehicleType}
              onValueChange={setVehicleType}
              item={VEHICLE_TYPES}
              placeholder="select"
              className="w-full"
            />
          </div>

          <div>
            <label className={inputClass.label}>Battery Capacity (kWh)</label>
            <input type="text" defaultValue="75" className={inputClass.input} />
          </div>

          <div>
            <label className={inputClass.label}>Daily Distance (miles)</label>
            <input type="text" defaultValue="50" className={inputClass.input} />
          </div>

          <div>
            <label className={inputClass.label}>Vehicle Class</label>
            <input type="text" className={inputClass.input} />
          </div>
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Charging Configuration" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <div>
            <label className={inputClass.label}>Charging Method</label>
            <CommonSelect
              value={chargingMethod}
              onValueChange={setChargingMethod}
              item={CHARGING_METHODS}
              placeholder="select"
              className="w-full"
            />
          </div>

          <div>
            <label className={inputClass.label}>Number of Charging Ports</label>
            <input type="text" defaultValue="12" className={inputClass.input} />
          </div>

          <div>
            <label className={inputClass.label}>
              Charging Duration (hours/day)
            </label>
            <input type="text" defaultValue="8" className={inputClass.input} />
          </div>

          <div>
            <label className={inputClass.label}>
              Expected Station Uptime (%)
            </label>
            <input
              type="text"
              defaultValue="98%"
              className={inputClass.input}
            />
          </div>
        </div>

        <p className="text-sm font-semibold text-primary ">
          Average Waiting Time: 12 min
        </p>

        <div className="">
          <label className={inputClass.label}>Energy Tariff ($/kWh)</label>
          <input type="text" defaultValue="0.15" className={inputClass.input} />
        </div>

        <div className="rounded-xl bg-[#EFF6FF] border border-[#BEDBFF] p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <SectionHeader
              size="md"
              title="Off-Peak Charging Recommended"
              description="Save up to 40% by charging between 11PM-7AM"
            />
          </div>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default VehicleChargingConfiguration;
