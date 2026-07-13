import CommonButton from "@/common/button/CommonButton";
import StandardTabs from "@/common/button/StandardTabs";
import Separator from "@/common/form/Separator";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { ArrowLeft, BatteryCharging } from "lucide-react";
import { useMemo, useState } from "react";
import ColorSearch from "../solar/ColorSearch";
import EquipmentCard from "../solar/EquipmentCard";
import SelectedEquipmentSummary from "../solar/SelectedEquipmentSummary";
import BatterySystemResults from "./BatterySystemResults";
import { BATTERY_EQUIPMENT } from "./data";
import {
  BatteryCategory,
  BatteryEquipment,
  SelectedEquipmentItem,
  SiteBatteryParameters,
} from "./types";

const CATEGORY_TABS: { key: BatteryCategory; label: string }[] = [
  { key: "batterySystems", label: "Battery Systems" },
  { key: "inverters", label: "Inverters" },
  { key: "chargeControllers", label: "Charge Controllers" },
  { key: "monitoringSystems", label: "Monitoring Systems" },
  { key: "accessories", label: "Battery Accessories" },
];

const DEFAULT_PARAMETERS: SiteBatteryParameters = {
  dailyEnergyUsageKwh: 30,
  desiredBackupDurationHours: 12,
  criticalLoadKw: 3,
  depthOfDischargePct: 95,
  roundTripEfficiencyPct: 90,
  solarSystemSizeKw: 8,
};

interface BatteryStorageDesignProps {
  isUtilityConnected: boolean;
  onRequestPermission: () => void;
  onBackToEngineeringServices: () => void;
  onGenerateDesign: (
    items: SelectedEquipmentItem[],
    parameters: SiteBatteryParameters,
  ) => void;
}

const BatteryStorageDesign: React.FC<BatteryStorageDesignProps> = ({
  isUtilityConnected,
  onRequestPermission,
  onBackToEngineeringServices,
  onGenerateDesign,
}) => {
  const [siteParameters, setSiteParameters] =
    useState<SiteBatteryParameters>(DEFAULT_PARAMETERS);
  const [activeTab, setActiveTab] = useState<BatteryCategory>("batterySystems");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedEquipmentItem>
  >({
    "tesla-powerwall-3": {
      equipment: BATTERY_EQUIPMENT.find((e) => e.id === "tesla-powerwall-3")!,
      quantity: 1,
    },
  });
  const [hasGeneratedDesign, setHasGeneratedDesign] = useState(false);

  const estInstallation = 3200;

  const handleAdd = (equipment: BatteryEquipment) => {
    setSelectedItems((prev) => ({
      ...prev,
      [equipment.id]: { equipment, quantity: 1 },
    }));
  };

  const handleQuantityChange = (equipmentId: string, quantity: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [equipmentId]: { ...prev[equipmentId], quantity },
    }));
  };

  const handleTabChange = (key: BatteryCategory) => {
    setActiveTab(key);
    setSearchQuery("");
  };

  const filteredEquipment = useMemo(
    () =>
      BATTERY_EQUIPMENT.filter(
        (e) =>
          e.category === activeTab &&
          `${e.brand} ${e.model}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    [activeTab, searchQuery],
  );

  const handleGenerateDesign = () => {
    onGenerateDesign(Object.values(selectedItems), siteParameters);
    setHasGeneratedDesign(true);
  };

  return (
    <div className="space-y-6">
      <Welcome
        title="Battery Storage Design"
        description="Design battery storage systems for renewable energy integration"
        Icons={BatteryCharging}
        iconBg="bg-[#F3E8FF]"
        iconColor="text-[#9810FA]"
        className="border border-[rgba(152,16,250,0.20)]! bg-[linear-gradient(90deg,_rgba(152,16,250,0.08)_0%,_rgba(192,38,211,0.08)_100%)]!"
        size="3xl"
      />

      <Welcome
        title="Utility Data Connection Required"
        description="Connect your utility provider to automatically import electricity and gas consumption data."
        variant="secondary"
        isConnected
        actions={
          <CommonButton variant="primaryBlue" className="">
            Request Permission
          </CommonButton>
        }
      />

      <div className="bg-white border border-[#E7E9E8] rounded-2xl ">
        <div className="px-6 py-5">
          <SectionHeader
            size="xl"
            title="Recommended Equipment & Components"
            description="Select products from each category to configure your battery storage system."
          />
        </div>
        <Separator />
        <div className=" flex flex-col gap-3 px-6 py-5 ">
          <div className="flex gap-6 ">
            <StandardTabs
              tabs={CATEGORY_TABS}
              activeTab={activeTab}
              onChange={(key) => handleTabChange(key as BatteryCategory)}
            />
          </div>
          <ColorSearch
            className="w-full"
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {filteredEquipment.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-5 px-6">
            {filteredEquipment.map((equipment) => {
              const selected = selectedItems[equipment.id];
              return (
                <EquipmentCard
                  key={equipment.id}
                  equipment={equipment}
                  isSelected={!!selected}
                  quantity={selected?.quantity ?? 1}
                  onAdd={() => handleAdd(equipment)}
                  onQuantityChange={(qty) =>
                    handleQuantityChange(equipment.id, qty)
                  }
                  onViewDetails={() => {}}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-[#758179] text-sm py-8 text-center">
            {searchQuery
              ? `No products match "${searchQuery}" in this category.`
              : "No products available in this category yet."}
          </p>
        )}

        <div className="px-6 py-5">
          {Object.keys(selectedItems).length > 0 && (
            <SelectedEquipmentSummary
              items={Object.values(selectedItems)}
              estInstallation={estInstallation}
              onGenerateDesign={handleGenerateDesign}
            />
          )}
        </div>
      </div>

      {hasGeneratedDesign && (
        <BatterySystemResults
          items={Object.values(selectedItems)}
          parameters={siteParameters}
          estInstallation={estInstallation}
        />
      )}

      <div className="flex sm:items-center flex-col sm:flex-row gap-3 justify-between">
        <CommonButton
          to="../hvac-modelling"
          variant="outline"
          onClick={onBackToEngineeringServices}
        >
          <ArrowLeft className="w-4 h-4 " />
          Back to HVAC Modelling
        </CommonButton>
        {hasGeneratedDesign && (
          <CommonButton to="../ev-charging" variant="primary">
            Continue to EV Charging
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default BatteryStorageDesign;
