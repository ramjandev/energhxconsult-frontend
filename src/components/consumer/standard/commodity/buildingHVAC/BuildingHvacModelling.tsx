import CommonButton from "@/common/button/CommonButton";
import StandardTabs from "@/common/button/StandardTabs";
import Separator from "@/common/form/Separator";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { ArrowLeft, Thermometer } from "lucide-react";
import { useMemo, useState } from "react";
import { HVAC_EQUIPMENT } from "./data";

import ColorSearch from "../solar/ColorSearch";
import EquipmentCard from "../solar/EquipmentCard";
import SelectedEquipmentSummary from "../solar/SelectedEquipmentSummary";
import HvacSystemResults from "./HvacSystemResults";
import {
  HvacCategory,
  HvacEquipment,
  SelectedEquipmentItem,
  SiteHvacParameters,
} from "./types";

const CATEGORY_TABS: { key: HvacCategory; label: string }[] = [
  { key: "heatPumps", label: "Heat Pumps" },
  { key: "airConditioners", label: "Air Conditioners" },
  { key: "airHandlingUnits", label: "Air Handling Units" },
  { key: "ventilationSystems", label: "Ventilation Systems" },
  { key: "thermostatsControls", label: "Thermostats & Controls" },
  { key: "accessories", label: "HVAC Accessories" },
];

const DEFAULT_PARAMETERS: SiteHvacParameters = {
  buildingAreaSqFt: 2400,
  coolingLoadKw: 10.5,
  heatingLoadKw: 14,
  occupancyCount: 4,
  insulationRatingPct: 75,
  systemLossFactorPct: 10,
};

interface BuildingHvacModellingProps {
  isUtilityConnected: boolean;
  onRequestPermission: () => void;
  onBackToBiomassSizing: () => void;
  onGenerateConfiguration: (
    items: SelectedEquipmentItem[],
    parameters: SiteHvacParameters,
  ) => void;
}

const BuildingHvacModelling: React.FC<BuildingHvacModellingProps> = ({
  isUtilityConnected,
  onRequestPermission,
  onBackToBiomassSizing,
  onGenerateConfiguration,
}) => {
  const [siteParameters, setSiteParameters] =
    useState<SiteHvacParameters>(DEFAULT_PARAMETERS);
  const [activeTab, setActiveTab] = useState<HvacCategory>("heatPumps");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedEquipmentItem>
  >({
    "daikin-altherma-3-h-ht-16kw": {
      equipment: HVAC_EQUIPMENT.find(
        (e) => e.id === "daikin-altherma-3-h-ht-16kw",
      )!,
      quantity: 1,
    },
  });
  const [hasGeneratedDesign, setHasGeneratedDesign] = useState(false);

  const estInstallation = 2400;

  const handleAdd = (equipment: HvacEquipment) => {
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

  const handleTabChange = (key: HvacCategory) => {
    setActiveTab(key);
    setSearchQuery("");
  };

  const filteredEquipment = useMemo(
    () =>
      HVAC_EQUIPMENT.filter(
        (e) =>
          e.category === activeTab &&
          `${e.brand} ${e.model}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      ),
    [activeTab, searchQuery],
  );

  const handleGenerateDesign = () => {
    onGenerateConfiguration(Object.values(selectedItems), siteParameters);
    setHasGeneratedDesign(true);
  };

  return (
    <div className="space-y-6">
      <Welcome
        title="Building HVAC Modelling"
        description="Analyse cooling and heating loads and configure recommended HVAC equipment"
        Icons={Thermometer}
        iconBg="bg-[#DBEAFE]"
        iconColor="text-[#1D4ED8]"
        className="border border-[rgba(29,78,216,0.20)]! bg-[linear-gradient(90deg,_rgba(29,78,216,0.08)_0%,_rgba(59,130,246,0.08)_100%)]!"
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
            description="Select products from each category to configure your HVAC system."
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-3 px-6 py-5 w-full">
          <div className="flex gap-6 ">
            <StandardTabs
              tabs={CATEGORY_TABS}
              activeTab={activeTab}
              onChange={(key) => handleTabChange(key as HvacCategory)}
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
              buttonLabel="Generate Solar System Design"
            />
          )}
        </div>
      </div>

      {hasGeneratedDesign && (
        <HvacSystemResults
          items={Object.values(selectedItems)}
          parameters={siteParameters}
          estInstallation={estInstallation}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <CommonButton
          to="../engineering-services"
          variant="outline"
          onClick={onBackToBiomassSizing}
        >
          <ArrowLeft className="w-4 h-4 " />
          Back to Engineering Services
        </CommonButton>

        {hasGeneratedDesign && (
          <CommonButton to="../battery-storage">
            Continue to Battery Storage
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default BuildingHvacModelling;
