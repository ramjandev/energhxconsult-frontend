import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";

const EfficiencyInsights = () => {
  return (
    <CommonBorderWrapper isShadow className="">
      <SectionHeader size="xl" title="Energy Efficiency Insights" />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-4">
          <div className="space-y-3">
            <SectionHeader size="lg" title=" High Consumption Appliances" />
            <div className="flex items-center justify-between">
              <CommonHeader size="sm">Air Conditioners (2)</CommonHeader>

              <CommonHeader size="md" className="font-bold! text-[#112518]!">
                16.8 kWh/day
              </CommonHeader>
            </div>

            <div className="flex items-center justify-between">
              <CommonHeader size="sm">Refrigerator (1)</CommonHeader>

              <CommonHeader size="md" className="font-bold! text-[#112518]!">
                3.6 kWh/day
              </CommonHeader>
            </div>

            <div className="flex items-center justify-between">
              <CommonHeader size="sm">Dishwasher (1)</CommonHeader>

              <CommonHeader size="md" className="font-bold! text-[#112518]!">
                2.7 kWh/day
              </CommonHeader>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4">
          <div className="space-y-3">
            <SectionHeader size="lg" title="Optimization Opportunities" />
            <CommonHeader size="sm">
              • Replace 2 older ACs with efficient models (save $40/mo)
            </CommonHeader>
            <CommonHeader size="sm">
              • Add smart power strips for entertainment devices
            </CommonHeader>
            <CommonHeader size="sm">
              • Install motion sensors for lighting (save 15%)
            </CommonHeader>
          </div>
        </div>

        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="space-y-3">
            {" "}
            <SectionHeader
              size="lg"
              title="Annual Projections"
              className="mb-4"
            />
            <div>
              <CommonHeader size="sm">Annual Consumption</CommonHeader>
              <CommonHeader size="2xl" className="font-bold! text-[#112518]!">
                9,972 kWh
              </CommonHeader>
            </div>
            <div>
              <CommonHeader size="sm">Annual Cost</CommonHeader>
              <CommonHeader size="2xl" className="font-bold! text-[#00A63E]!">
                $1,475.28
              </CommonHeader>
            </div>
            <div>
              <CommonHeader size="sm">Potential Savings</CommonHeader>
              <CommonHeader size="2xl" className="font-bold! text-[#00A63E]!">
                $684/yr
              </CommonHeader>
            </div>
          </div>
        </div>
      </div>
    </CommonBorderWrapper>
  );
};

export default EfficiencyInsights;
