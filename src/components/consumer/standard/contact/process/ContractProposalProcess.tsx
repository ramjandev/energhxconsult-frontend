import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import CheckboxRow from "../report/CheckboxRow";
import ContractDocumentsSection from "./ContractDocumentsSection";
import {
  CONTRACT_DOCUMENTS,
  FINANCIAL_BREAKDOWN,
  NET_INVESTMENT,
  PROJECT_SUMMARY_SYSTEMS,
  PROJECTED_SAVINGS,
  TIMELINE_PHASES,
  TOTAL_PROJECT_COST,
  TOTAL_PROJECT_DURATION,
} from "./data";
import FinancialBreakdownSection from "./FinancialBreakdownSection";
import ImplementationTimelineSection from "./ImplementationTimelineSection";
import ProjectedSavingsSection from "./ProjectedSavingsSection";
import ProjectSummarySection from "./ProjectSummarySection";
import { ContractDocument } from "./types";

interface ContractProposalProcessProps {
  title?: string;
  description?: string;
  onBack: () => void;
  onProceedToCheckout: () => void;
}

const ContractProposalProcess: React.FC<ContractProposalProcessProps> = ({
  title = "Contract & Proposal Process",
  description = "Review your project proposal and agreement documents",
  onBack,
  onProceedToCheckout,
}) => {
  const [hasAgreed, setHasAgreed] = useState(false);

  const handleViewPdf = (document: ContractDocument) => {
    console.log("Viewing document:", document.id);
  };

  return (
    <div className="space-y-6">
      <SectionHeader title={title} description={description} />

      <ProjectSummarySection
        systems={PROJECT_SUMMARY_SYSTEMS}
        totalCost={TOTAL_PROJECT_COST}
      />

      <FinancialBreakdownSection
        lines={FINANCIAL_BREAKDOWN}
        netInvestment={NET_INVESTMENT}
      />

      <ProjectedSavingsSection savings={PROJECTED_SAVINGS} />

      <ContractDocumentsSection
        documents={CONTRACT_DOCUMENTS}
        onViewPdf={handleViewPdf}
      />

      <ImplementationTimelineSection
        phases={TIMELINE_PHASES}
        totalDuration={TOTAL_PROJECT_DURATION}
      />

      <CheckboxRow
        checked={hasAgreed}
        onChange={() => setHasAgreed((prev) => !prev)}
        label="I have reviewed all documents and agree to the terms and conditions"
      />

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <CommonButton variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </CommonButton>

        <CommonButton onClick={onProceedToCheckout} disabled={!hasAgreed}>
          Proceed to Checkout
        </CommonButton>
      </div>
    </div>
  );
};

export default ContractProposalProcess;
