import CommonButton from "@/common/button/CommonButton";
import StandardTabs from "@/common/button/StandardTabs";
import Separator from "@/common/form/Separator";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { ArrowLeft, Car } from "lucide-react";
import { useMemo, useState } from "react";
import ColorSearch from "../solar/ColorSearch";
import EquipmentCard from "../solar/EquipmentCard";
import SelectedEquipmentSummary from "../solar/SelectedEquipmentSummary";
import { EV_EQUIPMENT } from "./data";
import EvSystemResults from "./EvSystemResults";
import {
  EvCategory,
  EvEquipment,
  SelectedEquipmentItem,
  SiteEvParameters,
} from "./types";

const CATEGORY_TABS: { key: EvCategory; label: string }[] = [
  { key: "evChargers", label: "EV Chargers" },
  { key: "dcFastChargers", label: "DC Fast Chargers" },
  { key: "chargingStations", label: "Charging Stations" },
  { key: "chargingManagement", label: "Charging Management" },
  { key: "evAccessories", label: "EV Accessories" },
  { key: "electricVehicles", label: "Electric Vehicles" },
];

const DEFAULT_PARAMETERS: SiteEvParameters = {
  numberOfVehicles: 5,
  avgDailyMilesPerVehicle: 60,
  availableElectricalCapacityKw: 50,
  parkingSpaces: 8,
  peakChargingHours: 10,
  systemLossFactorPct: 8,
};

interface EvChargingInfrastructureProps {
  isUtilityConnected: boolean;
  onRequestPermission: () => void;
  onBackToBatteryStorage: () => void;
  onRunAnalysis: (
    items: SelectedEquipmentItem[],
    parameters: SiteEvParameters,
  ) => void;
}

const EvChargingInfrastructure: React.FC<EvChargingInfrastructureProps> = ({
  isUtilityConnected,
  onRequestPermission,
  onBackToBatteryStorage,
  onRunAnalysis,
}) => {
  const [siteParameters, setSiteParameters] =
    useState<SiteEvParameters>(DEFAULT_PARAMETERS);
  const [activeTab, setActiveTab] = useState<EvCategory>("evChargers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedEquipmentItem>
  >({
    "abb-terra-ac-w11-g5-r-0": {
      equipment: EV_EQUIPMENT.find((e) => e.id === "abb-terra-ac-w11-g5-r-0")!,
      quantity: 1,
    },
  });
  const [hasGeneratedDesign, setHasGeneratedDesign] = useState(false);

  const estInstallation = 518;

  const handleAdd = (equipment: EvEquipment) => {
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

  const handleTabChange = (key: EvCategory) => {
    setActiveTab(key);
    setSearchQuery("");
  };

  const filteredEquipment = useMemo(
    () =>
      EV_EQUIPMENT.filter(
        (e) =>
          e.category === activeTab &&
          `${e.brand} ${e.model}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    [activeTab, searchQuery],
  );

  const handleGenerateDesign = () => {
    onRunAnalysis(Object.values(selectedItems), siteParameters);
    setHasGeneratedDesign(true);
  };

  return (
    <div className="space-y-6">
      <Welcome
        title="EV Charging Infrastructure"
        description="Design and size EV charging systems for residential and commercial buildings"
        Icons={Car}
        iconBg="bg-[#DCFCE7]"
        iconColor="text-[#16A34A]"
        className="border border-[rgba(22,163,74,0.20)]! bg-[linear-gradient(90deg,_rgba(22,163,74,0.08)_0%,_rgba(34,197,94,0.08)_100%)]!"
        size="3xl"
      />

      <Welcome
        title="Utility Data Connection"
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
            description="Select products from each category to configure your EV charging infrastructure."
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-3 px-6 py-5">
          <div className="flex  gap-6 ">
            <StandardTabs
              tabs={CATEGORY_TABS}
              activeTab={activeTab}
              onChange={(key) => handleTabChange(key as EvCategory)}
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
        <EvSystemResults
          items={Object.values(selectedItems)}
          parameters={siteParameters}
          estInstallation={estInstallation}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <CommonButton
          to="../engineering-services"
          variant="outline"
          onClick={onBackToBatteryStorage}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Engineering Services
        </CommonButton>
        {hasGeneratedDesign && (
          <CommonButton to="../battery-storage" onClick={handleGenerateDesign}>
            Continue to Battery Storage
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default EvChargingInfrastructure;
