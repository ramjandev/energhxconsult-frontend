import CommonButton from "@/common/button/CommonButton";
import StandardTabs from "@/common/button/StandardTabs";
import Separator from "@/common/form/Separator";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { ArrowLeft, Leaf } from "lucide-react";
import { useMemo, useState } from "react";
import ColorSearch from "../solar/ColorSearch";
import BiomassSystemResults from "./BiomassSystemResults";
import { BIOMASS_EQUIPMENT } from "./data";

import EquipmentCard from "../solar/EquipmentCard";
import SelectedEquipmentSummary from "../solar/SelectedEquipmentSummary";
import {
  BiomassCategory,
  BiomassEquipment,
  SelectedEquipmentItem,
  SiteBiomassParameters,
} from "./types";

const CATEGORY_TABS: { key: BiomassCategory; label: string }[] = [
  { key: "pelletBoilers", label: "Pellet Boilers" },
  { key: "biogasKits", label: "Biogas Generator Kits" },
  { key: "conversionSystems", label: "Biomass Conversion Systems" },
  { key: "feedstockEquipment", label: "Feedstock Equipment" },
  { key: "accessories", label: "Biomass Accessories" },
];

const DEFAULT_PARAMETERS: SiteBiomassParameters = {
  buildingHeatDemandKw: 25,
  availableFeedstockTonsPerYear: 12,
  fuelMoistureContentPct: 18,
  storageCapacityTons: 5,
  systemLossFactorPct: 10,
  boilerEfficiencyPct: 94,
};

interface BiomassSystemDesignProps {
  isUtilityConnected: boolean;
  onRequestPermission: () => void;
  onBackToWindSizing: () => void;
  onGenerateDesign: (
    items: SelectedEquipmentItem[],
    parameters: SiteBiomassParameters,
  ) => void;
}

const BiomassSystemDesign: React.FC<BiomassSystemDesignProps> = ({
  isUtilityConnected,
  onRequestPermission,
  onBackToWindSizing,
  onGenerateDesign,
}) => {
  const [siteParameters, setSiteParameters] =
    useState<SiteBiomassParameters>(DEFAULT_PARAMETERS);
  const [activeTab, setActiveTab] = useState<BiomassCategory>("pelletBoilers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedEquipmentItem>
  >({
    "froling-p4-pellet-30kw": {
      equipment: BIOMASS_EQUIPMENT.find(
        (e) => e.id === "froling-p4-pellet-30kw",
      )!,
      quantity: 1,
    },
  });
  const [hasGeneratedDesign, setHasGeneratedDesign] = useState(false);

  const estInstallation = 3600;

  const handleAdd = (equipment: BiomassEquipment) => {
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

  const handleTabChange = (key: BiomassCategory) => {
    setActiveTab(key);
    setSearchQuery("");
  };

  const filteredEquipment = useMemo(
    () =>
      BIOMASS_EQUIPMENT.filter(
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
        title="Professional Biomass System Design and Sizing"
        description="Advanced system design and feedstock analysis"
        Icons={Leaf}
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
            description="Select products from each category to configure your biomass energy system."
          />
        </div>
        <Separator />
        <div className="flex flex-col   gap-3 px-6 py-5 ">
          <div className="flex gap-6 ">
            <StandardTabs
              tabs={CATEGORY_TABS}
              activeTab={activeTab}
              onChange={(key) => handleTabChange(key as BiomassCategory)}
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
        <BiomassSystemResults
          items={Object.values(selectedItems)}
          parameters={siteParameters}
          estInstallation={estInstallation}
        />
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <CommonButton
          to="../wind-energy"
          variant="outline"
          onClick={onBackToWindSizing}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Wind Sizing
        </CommonButton>
        {hasGeneratedDesign && (
          <CommonButton to="../res-sequence-validation" variant="primary">
            Next: System Validation
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default BiomassSystemDesign;
