import CommonButton from "@/common/button/CommonButton";
import StandardTabs from "@/common/button/StandardTabs";
import Separator from "@/common/form/Separator";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { ArrowLeft, Sun } from "lucide-react";
import { useMemo, useState } from "react";
import ColorSearch from "./ColorSearch";
import { SOLAR_EQUIPMENT } from "./data";
import EquipmentCard from "./EquipmentCard";
import SelectedEquipmentSummary from "./SelectedEquipmentSummary";
import SiteParametersForm from "./SiteParametersForm";
import SolarSystemResults from "./SolarSystemResults";
import {
  SelectedEquipmentItem,
  SiteSolarParameters,
  SolarCategory,
  SolarEquipment,
} from "./types";

const CATEGORY_TABS: { key: SolarCategory; label: string }[] = [
  { key: "pvModules", label: "Solar PV Modules" },
  { key: "inverters", label: "Inverters" },
  { key: "mountingSystems", label: "Mounting Systems" },
  { key: "monitoringDevices", label: "Monitoring Devices" },
  { key: "accessories", label: "Solar Accessories" },
];

const DEFAULT_PARAMETERS: SiteSolarParameters = {
  totalRoofAreaSqFt: 800,
  availableRoofAreaSqFt: 600,
  solarIrradiance: 5.2,
  tiltAngleDegrees: 15,
  azimuthDegrees: 180,
  systemLossFactorPct: 14,
  panelEfficiencyPct: 20,
};

const MONTHLY_DATA = [
  { month: "Jan", consumption: 1200, production: 850 },
  { month: "Feb", consumption: 1100, production: 900 },
  { month: "Mar", consumption: 950, production: 1120 },
  { month: "Apr", consumption: 900, production: 1250 },
  { month: "May", consumption: 1320, production: 1350 },
  { month: "Jun", consumption: 1500, production: 1330 },
];

interface SolarSystemDesignProps {
  isUtilityConnected: boolean;
  onRequestPermission: () => void;
  onBackToCommoditySetup: () => void;
  onContinueToWindSizing: () => void;
  onGenerateDesign: (
    items: SelectedEquipmentItem[],
    parameters: SiteSolarParameters,
  ) => void;
}

const SolarSystemDesign: React.FC<SolarSystemDesignProps> = ({
  isUtilityConnected,
  onRequestPermission,
  onBackToCommoditySetup,
  onContinueToWindSizing,
  onGenerateDesign,
}) => {
  const [siteParameters, setSiteParameters] =
    useState<SiteSolarParameters>(DEFAULT_PARAMETERS);
  const [activeTab, setActiveTab] = useState<SolarCategory>("pvModules");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<
    Record<string, SelectedEquipmentItem>
  >({
    "jinko-tiger-neo-n-type-400w": {
      equipment: SOLAR_EQUIPMENT.find(
        (e) => e.id === "jinko-tiger-neo-n-type-400w",
      )!,
      quantity: 1,
    },
  });
  const [hasGeneratedDesign, setHasGeneratedDesign] = useState(false);

  const estInstallation = 52;

  const handleAdd = (equipment: SolarEquipment) => {
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

  const handleTabChange = (key: SolarCategory) => {
    setActiveTab(key);
    setSearchQuery("");
  };

  // Single source of truth: filter one flat array by category + search
  const filteredEquipment = useMemo(
    () =>
      SOLAR_EQUIPMENT.filter(
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
        title="Professional Solar System Design & Equipment Configuration"
        description="Configure installation deliverables and engineering parameters for the proposed solar energy system."
        Icons={Sun}
        iconBg="bg-[#FEF9C2]"
        iconColor="text-[#D08700]"
        className="border border-[rgba(240,177,0,0.20)]! bg-[linear-gradient(90deg,_rgba(240,177,0,0.10)_0%,_rgba(255,105,0,0.10)_100%)]!"
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

      <SiteParametersForm
        parameters={siteParameters}
        onChange={setSiteParameters}
      />

      <div className="bg-white border border-[#E7E9E8] rounded-2xl ">
        <div className="px-6 py-5">
          <SectionHeader
            size="xl"
            title="Recommended Equipment & Components"
            description="Select products from each category to configure your solar energy
          system."
          />
        </div>
        <Separator />
        <div className="flex flex-col lg:flex-row lg:items-center  justify-between gap-3 px-6 py-5 ">
          <div className="flex gap-6 ">
            <StandardTabs
              tabs={CATEGORY_TABS}
              activeTab={activeTab}
              onChange={(key) => handleTabChange(key as SolarCategory)}
            />
          </div>
          <ColorSearch value={searchQuery} onChange={setSearchQuery} />
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
        <SolarSystemResults
          items={Object.values(selectedItems)}
          parameters={siteParameters}
          estInstallation={estInstallation}
          monthlyData={MONTHLY_DATA}
        />
      )}

      <div className="flex flex-col sm:items-center justify-between gap-3">
        <CommonButton
          to="../energy-commodity-setup"
          variant="outline"
          onClick={onBackToCommoditySetup}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Commodity Setup
        </CommonButton>

        {hasGeneratedDesign && (
          <CommonButton onClick={onContinueToWindSizing} to="../wind-energy">
            Continue to Wind Sizing
          </CommonButton>
        )}
      </div>
    </div>
  );
};

export default SolarSystemDesign;
