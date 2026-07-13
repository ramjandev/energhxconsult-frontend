import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  DollarSign,
  Leaf,
  TrendingUp,
  Zap,
} from "lucide-react";
import { LuCircleCheck } from "react-icons/lu";
import ApprovalMatrixRow from "./ApprovalMatrixRow";
import {
  APPROVAL_MATRIX,
  APPROVAL_STATUS,
  FINAL_ENGINEERING_SUMMARY,
  REVIEW_PROGRESS,
} from "./data";
import ReviewProgressCard from "./ReviewProgressCard";

interface EngineeringReviewApprovalProps {
  onBackToValidation: () => void;
  onGenerateFinalProposal: () => void;
}

const ReviewApproval: React.FC<EngineeringReviewApprovalProps> = ({
  onBackToValidation,
  onGenerateFinalProposal,
}) => {
  const isFullyApproved =
    REVIEW_PROGRESS.every((item) => item.status === "approved") &&
    APPROVAL_MATRIX.every((item) => item.status === "approved");

  return (
    <div className="space-y-6">
      <Welcome
        title="Engineering Review & Approval"
        description="Final engineering assessment before contract generation"
        Icons={LuCircleCheck}
        iconBg="bg-[#DCFCE7]"
        iconColor="text-[#00A63E]"
        className="border border-[rgba(22,163,74,0.20)]! bg-[linear-gradient(90deg,_rgba(22,163,74,0.08)_0%,_rgba(34,197,94,0.08)_100%)]!"
        size="3xl"
      />

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Review Progress" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {REVIEW_PROGRESS.map((item) => (
            <ReviewProgressCard key={item.id} item={item} />
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Engineering Approval Matrix" />

        <div className="space-y-4">
          {APPROVAL_MATRIX.map((item) => (
            <ApprovalMatrixRow key={item.id} item={item} />
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Final Engineering Summary" />

        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-5 gap-4">
          <BMiniCard
            layout="stacked"
            icon={Zap}
            label="Total System Capacity"
            value={`${FINAL_ENGINEERING_SUMMARY.totalSystemCapacityKw} kW`}
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/30!"
            iconColorClassName="text-primary"
            valueClass="text-[#112518]! font-bold! text-xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={TrendingUp}
            label="Expected Energy Offset"
            value={`${FINAL_ENGINEERING_SUMMARY.expectedEnergyOffsetPct}%`}
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/30!"
            iconColorClassName="text-primary"
            valueClass="text-[#112518]! font-bold! text-xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={DollarSign}
            label="Annual Savings"
            value={`$${FINAL_ENGINEERING_SUMMARY.annualSavings.toLocaleString()}`}
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/30!"
            iconColorClassName="text-primary"
            valueClass="text-green-600! font-bold! text-xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={Leaf}
            label="Carbon Reduction"
            value={`${FINAL_ENGINEERING_SUMMARY.carbonReductionTons} tons`}
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/30!"
            iconColorClassName="text-primary"
            valueClass="text-green-600! font-bold! text-xl!"
          />
          <BMiniCard
            layout="stacked"
            icon={Clock}
            label="Estimated Payback"
            value={`${FINAL_ENGINEERING_SUMMARY.estimatedPaybackYears} yrs`}
            className="flex flex-col items-center text-center"
            bgClassName="bg-[#EAF7E6]/30!"
            iconColorClassName="text-primary"
            valueClass="text-[#112518]! font-bold! text-xl!"
          />
        </div>
      </CommonBorderWrapper>

      <div className="bg-[#EAF7E6]/40 border border-[rgba(22,163,74,0.25)] rounded-2xl p-4 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-[#112518] text-lg mb-1">
              Approval Status
            </p>
            <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-primary mb-6">
              {APPROVAL_STATUS.status === "approved"
                ? "APPROVED FOR IMPLEMENTATION"
                : APPROVAL_STATUS.status === "pending"
                  ? "PENDING APPROVAL"
                  : "NOT APPROVED"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-[#758179]">Approval Timestamp</p>
                <p className="font-bold text-[#112518]">
                  {APPROVAL_STATUS.approvalTimestamp}
                </p>
              </div>
              <div>
                <p className="text-sm text-[#758179]">Reviewed By</p>
                <p className="font-bold text-[#112518]">
                  {APPROVAL_STATUS.reviewedBy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
        <CommonButton
          to="../res-validation"
          variant="outline"
          onClick={onBackToValidation}
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Validation
        </CommonButton>

        <CommonButton
          onClick={onGenerateFinalProposal}
          disabled={!isFullyApproved}
        >
          Generate Final Proposal
        </CommonButton>
      </div>
    </div>
  );
};

export default ReviewApproval;
