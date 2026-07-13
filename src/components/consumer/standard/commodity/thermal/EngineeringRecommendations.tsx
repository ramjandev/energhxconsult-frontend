import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";
import React from "react";
import RecommendationCard from "../zev/RecommendationCard";

const EngineeringRecommendations: React.FC = () => {
  return (
    <CommonBorderWrapper isShadow>
      <CommonHeader size="xl">Engineering Recommendations</CommonHeader>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecommendationCard
          number={1}
          title="Upgrade Roof Insulation"
          description="Add R-38 insulation to reduce heat flux by 60% and save 1,200 kWh/year"
          footer="Est. Savings: $180/year"
          wrapperClassName="bg-orange-50"
          borderClassName="border-orange-100"
          badgeClassName="bg-orange-500"
          footerClassName="text-orange-600"
        />

        <RecommendationCard
          number={2}
          title="Install Thermal Barriers"
          description="Add thermal breaks in north and south walls to improve comfort score to 94"
          footer="Comfort Improvement: +7 points"
          wrapperClassName="bg-blue-50"
          borderClassName="border-blue-100"
          badgeClassName="bg-blue-600"
          footerClassName="text-blue-600"
        />
      </div>
    </CommonBorderWrapper>
  );
};

export default EngineeringRecommendations;
