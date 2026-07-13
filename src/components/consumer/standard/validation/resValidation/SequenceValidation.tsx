import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import InfoRow from "@/components/consumer/standard/commodity/solar/InfoRow";
import {
  ArrowLeft,
  CheckCircle2,
  DollarSign,
  Leaf,
  ShieldCheck,
  Sun,
  TrendingUp,
  Wind,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import { LuCircleCheck } from "react-icons/lu";
import {
  OVERALL_SYSTEM_READINESS,
  RENEWABLE_SYSTEM_SUMMARY,
  RISK_ASSESSMENT,
  VALIDATION_CHECKLIST,
} from "./data";
import RiskAssessmentCard from "./RiskAssessmentCard";
import ValidationChecklistCard from "./ValidationChecklistCard";

interface ResSequenceValidationProps {
  onBackToBiomassSizing: () => void;
  onContinueToEngineeringReview: () => void;
}

const RISK_LABEL_MAP: Record<string, { label: string; className: string }> = {
  low: { label: "Low", className: "text-green-600" },
  medium: { label: "Medium", className: "text-amber-600" },
  high: { label: "High", className: "text-red-600" },
  passed: { label: "Passed", className: "text-green-600" },
  failed: { label: "Failed", className: "text-red-600" },
  pending: { label: "Pending", className: "text-amber-600" },
};

const SequenceValidation: React.FC<ResSequenceValidationProps> = ({
  onBackToBiomassSizing,
  onContinueToEngineeringReview,
}) => {
  const completedCount = VALIDATION_CHECKLIST.filter(
    (item) => item.status === "complete",
  ).length;

  const readinessScorePct = useMemo(
    () => Math.round((completedCount / VALIDATION_CHECKLIST.length) * 100),
    [completedCount],
  );

  const allValidated = completedCount === VALIDATION_CHECKLIST.length;

  const totalCapacityKw =
    RENEWABLE_SYSTEM_SUMMARY.solarCapacityKw +
    RENEWABLE_SYSTEM_SUMMARY.windCapacityKw +
    RENEWABLE_SYSTEM_SUMMARY.biomassCapacityKw;

  return (
    <div className="space-y-6">
      <Welcome
        title="Renewable Energy System (RES) Sequence Validation"
        description="Validate all renewable energy sizing and engineering calculations before proposal generation"
        Icons={LuCircleCheck}
        iconBg="bg-[#DCFCE7]"
        iconColor="text-[#00A63E]"
        className="border border-[rgba(22,163,74,0.20)]! bg-[linear-gradient(90deg,_rgba(22,163,74,0.08)_0%,_rgba(34,197,94,0.08)_100%)]!"
        size="3xl"
      />

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Overall System Readiness" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <BMiniCard
            layout="stacked"
            icon={CheckCircle2}
            label="System Readiness Score"
            value={`${readinessScorePct}%`}
            des={allValidated ? "All systems validated" : "Validation pending"}
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/50!"
            iconColorClassName="text-primary"
            valueClass="text-primary! font-bold! text-3xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={Zap}
            label="Renewable Coverage"
            value={`${OVERALL_SYSTEM_READINESS.renewableCoveragePct}%`}
            des="Energy offset"
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/50!"
            iconColorClassName="text-primary"
            valueClass="text-primary! font-bold! text-3xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={DollarSign}
            label="Annual Savings"
            value={`$${OVERALL_SYSTEM_READINESS.annualSavings.toLocaleString()}`}
            des="First year"
            className="flex flex-col items-center text-center"
            bgClassName="bg-blue-50/70!"
            iconColorClassName="text-blue-600"
            valueClass="text-blue-600! font-bold! text-3xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={Leaf}
            label="Carbon Reduction"
            value={OVERALL_SYSTEM_READINESS.carbonReductionTonsPerYear.toString()}
            des="tons CO2/year"
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/50!"
            iconColorClassName="text-primary"
            valueClass="text-primary! font-bold! text-3xl!"
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Validation Checklist" />

        <div className="space-y-4">
          {VALIDATION_CHECKLIST.map((item) => (
            <ValidationChecklistCard key={item.id} item={item} />
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Renewable System Summary" />

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-4">
          <BMiniCard
            layout="stacked"
            icon={Sun}
            label="Solar Capacity"
            value={`${RENEWABLE_SYSTEM_SUMMARY.solarCapacityKw} kW`}
            des="Photovoltaic system"
            bgClassName="bg-amber-50/70!"
            iconColorClassName="text-amber-600"
            valueClass="text-[#112518]! font-bold! text-2xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={Wind}
            label="Wind Capacity"
            value={`${RENEWABLE_SYSTEM_SUMMARY.windCapacityKw} kW`}
            des="Wind turbine system"
            bgClassName="bg-blue-50/70!"
            iconColorClassName="text-blue-600"
            valueClass="text-[#112518]! font-bold! text-2xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={Leaf}
            label="Biomass Capacity"
            value={`${RENEWABLE_SYSTEM_SUMMARY.biomassCapacityKw} kW`}
            des="Biomass heating system"
            bgClassName="bg-[#EAF7E6]/50!"
            iconColorClassName="text-primary"
            valueClass="text-[#112518]! font-bold! text-2xl!"
          />
        </div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <InfoRow
            label="Total Annual Production"
            value={`${RENEWABLE_SYSTEM_SUMMARY.totalAnnualProductionKwh.toLocaleString()} kWh`}
          />
          <InfoRow
            label="Total Project Cost"
            value={`$${RENEWABLE_SYSTEM_SUMMARY.totalProjectCost.toLocaleString()}`}
          />
          <InfoRow
            label="Projected ROI"
            value={`${RENEWABLE_SYSTEM_SUMMARY.projectedRoiYears} years`}
            valueClassName="text-green-600"
          />
        </dl>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Risk Assessment" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <RiskAssessmentCard
            icon={ShieldCheck}
            label="Technical Risk"
            value={RISK_LABEL_MAP[RISK_ASSESSMENT.technicalRisk].label}
            valueClassName={
              RISK_LABEL_MAP[RISK_ASSESSMENT.technicalRisk].className
            }
          />
          <RiskAssessmentCard
            icon={DollarSign}
            label="Financial Risk"
            value={RISK_LABEL_MAP[RISK_ASSESSMENT.financialRisk].label}
            valueClassName={
              RISK_LABEL_MAP[RISK_ASSESSMENT.financialRisk].className
            }
          />
          <RiskAssessmentCard
            icon={TrendingUp}
            label="Implementation Risk"
            value={RISK_LABEL_MAP[RISK_ASSESSMENT.implementationRisk].label}
            valueClassName={
              RISK_LABEL_MAP[RISK_ASSESSMENT.implementationRisk].className
            }
          />
          <RiskAssessmentCard
            icon={CheckCircle2}
            label="Compliance Risk"
            value={RISK_LABEL_MAP[RISK_ASSESSMENT.complianceStatus].label}
            valueClassName={
              RISK_LABEL_MAP[RISK_ASSESSMENT.complianceStatus].className
            }
          />
        </div>
      </CommonBorderWrapper>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <CommonButton
          to="../biomass-energy"
          variant="outline"
          onClick={onBackToBiomassSizing}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Biomass Sizing
        </CommonButton>

        <CommonButton
          onClick={onContinueToEngineeringReview}
          disabled={!allValidated}
          to="../engineering-review"
        >
          Continue to Engineering Review
        </CommonButton>
      </div>
    </div>
  );
};

export default SequenceValidation;
