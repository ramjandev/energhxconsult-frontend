import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import {
  ArrowLeft,
  DollarSign,
  Download,
  FileText,
  TrendingUp,
} from "lucide-react";
import { FaRegCircleCheck } from "react-icons/fa6";
import CostSummarySection from "./CostSummarySection";
import {
  COST_SUMMARY,
  CUMULATIVE_SAVINGS,
  ENGINEERING_SERVICES,
  PROPOSAL_TOP_STATS,
  RECOMMENDED_SYSTEMS,
  SAVINGS_FORECAST,
  SAVINGS_FORECAST_SUMMARY,
  TIMELINE_PHASES,
} from "./data";
import EngineeringServicesList from "./EngineeringServicesList";
import ProjectTimelineList from "./ProjectTimelineList";
import RecommendedSystemCard from "./RecommendedSystemCard";
import SavingsForecastSection from "./SavingsForecastSection";

interface ProjectProposalProps {
  onBackToSystemSizing: () => void;
  onDownloadProposalPdf: () => void;
  onApproveAndContinue: () => void;
}

const ProjectProposal: React.FC<ProjectProposalProps> = ({
  onBackToSystemSizing,
  onDownloadProposalPdf,
  onApproveAndContinue,
}) => {
  return (
    <div className="space-y-6">
      <Welcome
        title="Project Proposal"
        description="Comprehensive renewable energy implementation plan"
        Icons={FileText}
        iconBg="bg-primary/20"
        iconColor="text-primary"
        className="border border-[rgba(45,173,0,0.2)]! bg-[linear-gradient(90deg,rgba(45,173,0,0.1)_0%,rgba(21,93,252,0.1)_100%)]!"
        size="3xl"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BMiniCard
          layout="stacked"
          icon={DollarSign}
          label="Total Investment"
          value={`$${PROPOSAL_TOP_STATS.totalInvestment.toLocaleString()}`}
          des="Equipment & systems"
          className="flex flex-col items-start"
          bgClassName="bg-white!"
          iconColorClassName="text-primary"
          valueClass="text-[#112518]! font-bold! text-2xl!"
        />
        <BMiniCard
          layout="stacked"
          icon={TrendingUp}
          label="Tax Credits"
          value={`$${PROPOSAL_TOP_STATS.taxCredits.toLocaleString()}`}
          des={`${PROPOSAL_TOP_STATS.taxCreditPct}% federal ITC`}
          className="flex flex-col items-start"
          bgClassName="bg-white!"
          iconColorClassName="text-green-600"
          valueClass="text-green-600! font-bold! text-2xl!"
        />
        <BMiniCard
          layout="stacked"
          icon={DollarSign}
          label="Net Project Cost"
          value={`$${PROPOSAL_TOP_STATS.netProjectCost.toLocaleString()}`}
          des="After incentives"
          className="flex flex-col items-start"
          bgClassName="bg-white!"
          iconColorClassName="text-blue-600"
          valueClass="text-blue-600! font-bold! text-2xl!"
        />
        <BMiniCard
          layout="stacked"
          icon={TrendingUp}
          label="Annual Savings"
          value={`$${PROPOSAL_TOP_STATS.annualSavings.toLocaleString()}`}
          des="Year 1 projection"
          className="flex flex-col items-start"
          bgClassName="bg-white!"
          iconColorClassName="text-green-600"
          valueClass="text-green-600! font-bold! text-2xl!"
        />
      </div>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Recommended Systems" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {RECOMMENDED_SYSTEMS.map((system) => (
            <RecommendedSystemCard key={system.id} system={system} />
          ))}
        </div>
      </CommonBorderWrapper>

      <EngineeringServicesList items={ENGINEERING_SERVICES} />

      <ProjectTimelineList phases={TIMELINE_PHASES} />

      <SavingsForecastSection
        forecastData={SAVINGS_FORECAST}
        cumulativeData={CUMULATIVE_SAVINGS}
        summary={SAVINGS_FORECAST_SUMMARY}
      />

      <CostSummarySection summary={COST_SUMMARY} />

      <Welcome
        title="Ready to Approve Your Proposal?"
        description="Review all systems, services, timeline, and financial projections.
        Once approved, we'll proceed to contract agreement."
        Icons={FaRegCircleCheck}
        iconColor="text-[#155DFC]"
        className="border  border-[#155DFC33]! bg-[linear-gradient(90deg,rgba(21,93,252,0.10)_0%,rgba(152,16,250,0.10)_100%)]!"
        size="3xl"
        actions={
          <>
            <CommonButton
              variant="outline"
              className=" border-[#155DFC]! text-[#155DFC]! bg-white! hover:bg-white/10"
              onClick={onDownloadProposalPdf}
            >
              <Download className="w-4 h-4 hidden sm:flex " />
              Download Proposal PDF
            </CommonButton>
            <CommonButton className="" onClick={onApproveAndContinue}>
              Approve & Continue to Contract
              <FaRegCircleCheck className="w-4 h-4 hidden sm:block " />
            </CommonButton>
          </>
        }
      />

      <CommonButton
        to="../solar-energy"
        variant="outline"
        onClick={onBackToSystemSizing}
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to System Sizing
      </CommonButton>
    </div>
  );
};

export default ProjectProposal;
