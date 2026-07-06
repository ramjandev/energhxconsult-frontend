import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BuildingEmpty from "@/components/consumer/basic/building/BuildingEmpty";
import BuildingCard, {
  BuildingType,
} from "@/components/consumer/basic/building/card/BuildingCard";
import { useState } from "react";

const INITIAL_BUILDINGS: BuildingType[] = [
  {
    id: 1,
    name: "Ramjan's Building",
    type: "Bungalow",
    subType: "Software",
    rooms: 8,
    evs: 4,
    energy: "2,340 kWh/month",
    buildType: "Concrete Building",
    info: "4 batteries installed",
  },
  {
    id: 2,
    name: "USA",
    type: "Software",
    subType: "Software",
    rooms: 8,
    evs: 4,
    energy: "2,340 kWh/month",
    buildType: "Educational",
    info: "4 batteries installed",
  },
  {
    id: 3,
    name: "Happy House",
    type: "Software",
    subType: "Software",
    rooms: 8,
    evs: 4,
    energy: "2,340 kWh/month",
    buildType: "Educational",
    info: "2 Pets avenues Lagos, 3032020",
  },
];

const BuildingList = () => {
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(
    null,
  );
  const [buildings, setBuildings] = useState<BuildingType[]>(INITIAL_BUILDINGS);

  const addBuilding = (b: BuildingType) => setBuildings((prev) => [...prev, b]);

  if (buildings?.length === 0) {
    return <BuildingEmpty />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <SectionHeader
            title="Building Information"
            description="Manage your buildings and their energy data"
          />
        </div>
        <CommonButton shape="rounded" to="./create-building" showDefaultIcon>
          Create Building
        </CommonButton>
      </div>

      {buildings.map((b) => (
        <BuildingCard key={b.id} building={b} />
      ))}
    </div>
  );
};

export default BuildingList;
