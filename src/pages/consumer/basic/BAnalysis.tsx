import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import EnergyAnalysisReport from "@/components/consumer/basic/analysis/EnergyAnalysisReport";
import StartEnergyAuditModal from "@/components/consumer/basic/analysis/StartEnergyAuditModal";
import { useEffect, useState } from "react";

const BAnalysis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasStartedAudit, setHasStartedAudit] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const buildings = [
    { label: "Building A", value: "building-a" },
    { label: "Building B", value: "building-b" },
  ];

  const handleStart = (data: {
    buildingId: string;
    auditType: "basic" | "comprehensive";
  }) => {
    console.log("Starting audit:", data);

    // TODO: Call API / Navigate

    setHasStartedAudit(true);
    setIsModalOpen(false);
  };

  return (
    <div>
      {!hasStartedAudit && (
        <div className="flex items-center justify-between mb-6">
          <SectionHeader title="Energy Analysis" />
          <CommonButton onClick={() => setIsModalOpen(true)}>
            Start Audit
          </CommonButton>
        </div>
      )}

      <StartEnergyAuditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        buildings={buildings}
        onStart={handleStart}
      />

      {hasStartedAudit && <EnergyAnalysisReport />}
    </div>
  );
};

export default BAnalysis;
