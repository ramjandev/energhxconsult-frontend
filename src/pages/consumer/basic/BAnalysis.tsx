import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import EnergyAnalysisReport from "@/components/consumer/basic/analysis/EnergyAnalysisReport";
import StartEnergyAuditModal from "@/components/consumer/basic/analysis/StartEnergyAuditModal";
import { useStartAuditMutation } from "@/store/consumer/basic/analysis/analysisApi";
import {
  AuditType,
  EnergyAuditResponse,
} from "@/store/consumer/basic/analysis/types/analysis";
import { useGetAllBuildingsQuery } from "@/store/consumer/basic/building/buildingApi";
import { useEffect, useState } from "react";

const BAnalysis = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasStartedAudit, setHasStartedAudit] = useState(false);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const { data, isLoading } = useGetAllBuildingsQuery();
  const buildings =
    data?.data?.map((building) => ({
      label: building.building_name,
      value: building.user_building_details_id,
    })) ?? [];

  const [startAudit, { isLoading: isAuditLoading }] = useStartAuditMutation();

  const [selectedReport, setSelectedReport] =
    useState<EnergyAuditResponse | null>(null);

  const handleStart = async (data: {
    buildingId: string;
    auditType: AuditType;
  }) => {
    try {
      const result = await startAudit(data).unwrap();
      setSelectedReport(result);
      setHasStartedAudit(true);
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to start audit:", err);
    }
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
        isLoading={isAuditLoading}
      />

      {hasStartedAudit && <EnergyAnalysisReport report={selectedReport} />}
    </div>
  );
};

export default BAnalysis;
