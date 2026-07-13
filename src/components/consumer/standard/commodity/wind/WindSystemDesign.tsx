import CommonButton from "@/common/button/CommonButton";
import StandardTabs from "@/common/button/StandardTabs";
import Separator from "@/common/form/Separator";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { ArrowLeft, Wind } from "lucide-react";
import { useMemo, useState } from "react";
import ColorSearch from "../solar/ColorSearch";
import EquipmentCard from "../solar/EquipmentCard";
import SelectedEquipmentSummary from "../solar/SelectedEquipmentSummary";
import { WIND_EQUIPMENT } from "./data";
import {
  SelectedEquipmentItem,
  SiteWindParameters,
  WindCategory,
  WindEquipment,
} from "./types";
import WindSystemResults from "./WindSystemResults";

const CATEGORY_TABS: { key: WindCategory; label: string }[] = [
  { key: "windTurbines", label: "Wind Turbines" },
  { key: "inverters", label: "Inverters" },
  { key: "controllers", label: "Controllers" },
  { key: "monitoringSystems", label: "Monitoring Systems" },
  { key: "accessories", label: "Wind Accessories" },
];

const DEFAULT_PARAMETERS: SiteWindParameters = {
  averageWindSpeed: 6.5,
  hubHeightMeters: 24,
  turbulenceIntensityPct: 12,
  airDensity: 1.225,
  systemLossFactorPct: 15,
  availableLandAreaSqFt: 5000,
};

interface WindSystemDesignProps {
  isUtilityConnected: boolean;
  onRequestPermission: () => void;
  onBackToSolarSizing: () => void;
  onGenerateDesign: (
    items: SelectedEquipmentItem[],
    parameters: SiteWindParameters,
  ) => void;
}

const WindSystemDesign: React.FC<WindSystemDesignProps> = ({
  isUtilityConnected,
  onRequestPermission,
  onBackToSolarSizing,
  onGenerateDesign,
}) => {
  const [siteParameters, setSiteParameters] =
    useState<SiteWindParameters>(DEFAULT_PARAMETERS);
  const [activeTab, setActiveTab] = useState<WindCategory>("windTurbines");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedEquipmentItem>
  >({
    "northern-power-nps-60-24-60kw": {
      equipment: WIND_EQUIPMENT.find(
        (e) => e.id === "northern-power-nps-60-24-60kw",
      )!,
      quantity: 1,
    },
  });
  const [hasGeneratedDesign, setHasGeneratedDesign] = useState(false);

  const estInstallation = 26600;

  const handleAdd = (equipment: WindEquipment) => {
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

  const handleTabChange = (key: WindCategory) => {
    setActiveTab(key);
    setSearchQuery("");
  };

  const filteredEquipment = useMemo(
    () =>
      WIND_EQUIPMENT.filter(
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
        title="Professional Wind System Design & Sizing"
        description="Advanced turbine selection and site analysis"
        Icons={Wind}
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
            description="Select products from each category to configure your wind energy system."
          />
        </div>
        <Separator />
        <div className="flex flex-col lg:flex-row lg:items-center  justify-between gap-3 px-6 py-5 w-full">
          <div className="flex gap-6 ">
            <StandardTabs
              tabs={CATEGORY_TABS}
              activeTab={activeTab}
              onChange={(key) => handleTabChange(key as WindCategory)}
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
        <WindSystemResults
          items={Object.values(selectedItems)}
          parameters={siteParameters}
          estInstallation={estInstallation}
        />
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <CommonButton
          to="../solar-energy"
          variant="outline"
          onClick={onBackToSolarSizing}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Solar Sizing
        </CommonButton>
        {hasGeneratedDesign && (
          <CommonButton to="../biomass-energy">
            Continue to Biomass Sizing
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default WindSystemDesign;
