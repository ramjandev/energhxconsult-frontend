import React, { useMemo, useState } from "react";
import EnvironmentalImpact from "./EnvironmentalImpact";
import EquipmentComparisonList from "./EquipmentComparisonList";
import MonthlyEnergyLoadChart from "./MonthlyEnergyLoadChart";
import TechnicalSpecifications from "./TechnicalSpecifications";
import { hvacEquipmentList } from "./vacData";

const RecommendedHVACEquipment: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(hvacEquipmentList[0].id);

  const selectedEquipment = useMemo(
    () =>
      hvacEquipmentList.find((eq) => eq.id === selectedId) ??
      hvacEquipmentList[0],
    [selectedId],
  );

  return (
    <div className="">
      <div className="space-y-6">
        <MonthlyEnergyLoadChart data={selectedEquipment.monthlyLoadProfile} />
        <TechnicalSpecifications equipment={selectedEquipment} />{" "}
        <EnvironmentalImpact impact={selectedEquipment.environmentalImpact} />
        <EquipmentComparisonList
          equipmentList={hvacEquipmentList}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCompare={(id) => console.log("compare", id)}
        />
      </div>
    </div>
  );
};

export default RecommendedHVACEquipment;
