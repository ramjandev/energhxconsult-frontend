import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import RecommendationCard from "../zev/RecommendationCard";

const OptimizationRecommendations = () => {
  return (
    <CommonBorderWrapper isShadow>
      <SectionHeader size="xl" title="Optimization Recommendations" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecommendationCard
          title="Switch to Time-of-Use Rate"
          description="Charge during off-peak hours (11PM-7AM) to reduce costs by $28/month"
          footer="Apply Recommendation"
          footerClassName="text-[#00A63E]"
          wrapperClassName="bg-green-50"
          borderClassName="border-green-100"
        />

        <RecommendationCard
          title="Solar Integration Opportunity"
          description="Add 3 kW solar array to offset 75% of charging costs"
          footer=" Explore Solar Sizing"
          footerClassName="text-[#155DFC]"
          wrapperClassName="bg-blue-50"
          borderClassName="border-blue-100"
        />
      </div>
    </CommonBorderWrapper>
  );
};

export default OptimizationRecommendations;
