import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import IconSectionHeader from "@/components/consumer/basic/renewable/IconSectionHeader";
import ProgressStat from "@/components/consumer/basic/renewable/ProgressStat";
import {
  defaultSolarValues,
  solarFormSchema,
  SolarFormValues,
} from "@/components/consumer/basic/renewable/schema/solarPanelSchema";
import SelectableOptionCard from "@/components/consumer/basic/renewable/SelectableOptionCard";
import SpecRow from "@/components/consumer/basic/renewable/SpecRow";
import StatBlock from "@/components/consumer/basic/renewable/StatBlock";
import { useCalculateSolarMutation } from "@/store/consumer/basic/renewables/renewableEnergyAPI";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import DashboardCardSkeleton from "@/common/loading/DashboardCardSkeleton";
import {
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  Sun,
  TrendingUp,
  X,
} from "lucide-react";

const fmtNumber = (n: number) => n.toLocaleString("en-US");
const fmtCurrency = (n: number, currency = "$") =>
  `${currency}${fmtNumber(Math.round(n))}`;

const BSolarEnergy = () => {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<SolarFormValues>({
    resolver: zodResolver(solarFormSchema),
    defaultValues: defaultSolarValues,
    mode: "onChange",
  });

  const [calculateSolar, { data, isLoading }] = useCalculateSolarMutation();
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [interested, setInterested] = useState<"yes" | "no" | null>(null);

  const handleAnalysisClick = async () => {
    const parsed = solarFormSchema.safeParse(getValues());
    if (!parsed.success) return;
    await calculateSolar(parsed.data);
    setHasAnalyzed(true);
  };

  const onSubmit = (values: SolarFormValues) => {
    if (!values) return;
  };

  const summary = data?.data.summary;
  const impact = data?.data.environmental_impact;
  const site = data?.data.site_suitability;

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <IconSectionHeader
        icon={Sun}
        title="Solar Energy Potential"
        description="Assess your solar energy potential and savings"
        iconBgClassName="bg-[#FFEDD4]"
        iconClassName="text-[#F54900]"
      />
      {isLoading ? (
        <DashboardCardSkeleton />
      ) : (
        summary!! && (
          <div className="rounded-[14px] border-2 border-[#FFD6A8] bg-gradient-to-br from-[#FFF7ED] to-white-2xl p-6 space-y-6">
            <SectionHeader size="xl" title="Solar Analysis Results" />
            <div className="grid  grid-cols-2 xl:grid-cols-4 gap-6">
              <StatBlock
                icon={Sun}
                iconBg="bg-[#FFEDD4]"
                iconColor="text-[#F54900]"
                label="Recommended System"
                value={` ${summary.recommended_system_kw} kW `}
                sub={
                  summary.recommended_system_label ??
                  "Based on your location and energy usage"
                }
              />
              <StatBlock
                icon={TrendingUp}
                iconBg="bg-[#DCFCE7]"
                iconColor="text-[#00A63E]"
                label="Annual Generation"
                value={` ${fmtNumber(summary.annual_generation_kwh)} kWh `}
                sub={"Per year"}
              />
              <StatBlock
                icon={DollarSign}
                iconBg="bg-[#DBEAFE]"
                iconColor="text-[#155DFC]"
                label="Annual Savings"
                value={` ${fmtCurrency(summary.annual_savings_usd)}  `}
                sub={"Energy cost reduction"}
              />
              <StatBlock
                icon={Calendar}
                iconBg="bg-[#F3E8FF]"
                iconColor="text-[#9810FA]"
                label="Payback Period"
                value={` ${summary.payback_period_years} years `}
                sub={"Return on investment"}
              />
            </div>
          </div>
        )
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="System Specifications" />
          <div>
            <SpecRow label="Panel Type" value="Monocrystalline" />
            <SpecRow label="Panel Wattage" value="400 W" />
            <SpecRow label="Panel Efficiency" value="18.5%" />
            <SpecRow label="Number of Panels" value="24 units" />
            <SpecRow label="Inverter Type" value="String" />
            <SpecRow label="Battery Storage" value="0 kWh" showBorder={false} />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Site Conditions" />
          <div>
            <SpecRow label="Daily Irradiance" value="4.4 kWh/m²/day" />
            <SpecRow label="Azimuth" value="180°" />
            <SpecRow label="Tilt" value="20°" />
            <SpecRow label="Shading Factor" value="97%" />
            <SpecRow label="Performance Ratio" value="75%" showBorder={false} />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Demand & Grid" />
          <div>
            <SpecRow label="Annual Load" value="14,650 kWh" />
            <SpecRow
              label="Grid Emission Factor"
              value="0.5 kg/kWh"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Financial Breakdown" />
          <div>
            <SpecRow label="System Cost" value="$18,500" />
            <SpecRow
              label="Federal Tax Credit (30%)"
              value="-$5,550"
              valueClass="text-green-600"
            />
            <SpecRow label="Net Cost" value="$12,950" />
            <SpecRow label="Electricity Tariff Rate" value="$0.169 / kWh" />
            <SpecRow
              label="Annual Savings"
              value="$2,100"
              valueClass="text-green-600"
            />
            <SpecRow
              label="25-Year Savings"
              value="$52,500"
              valueClass="text-orange-500"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>
      </div>
      <div className="rounded-[14px] border-2 border-[#B9F8CF] bg-gradient-to-br from-[#F0FDF4] to-white p-6 space-y-4">
        <SectionHeader size="xl" title="Environmental Impact" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatBlock
            label="CO₂ Reduction"
            value={`${impact?.co2_reduction_tons_per_year ?? 6} tons/year`}
            valueClass="text-green-600!"
            sub={
              impact
                ? `Equivalent to planting ${fmtNumber(
                    impact.equivalent_trees_planted,
                  )} trees`
                : "Equivalent to planting 150 trees"
            }
          />
          <StatBlock
            label="Clean Energy"
            value={impact ? `${impact.clean_energy_percentage}%` : "0%"}
            valueClass="text-green-600!"
            sub="Renewable energy source"
          />
          <StatBlock
            label="Energy Independence"
            value={impact ? `${impact.energy_independence_percentage}%` : "85%"}
            valueClass="text-green-600!"
            sub="Self-sufficiency rating"
          />
        </div>
      </div>
      <CommonBorderWrapper className="space-y-4">
        <SectionHeader size="lg" title="Site Suitability Analysis" />
        <div className="space-y-4">
          <ProgressStat
            label="Roof Orientation"
            status={
              site
                ? `${site.roof_orientation.caption}`
                : "Excellent (South-facing)"
            }
            percentage={site ? site.roof_orientation.score_pct : 0}
          />
          <ProgressStat
            label="Solar Irradiance"
            status={site ? site.solar_irradiance.rating : "Very Good"}
            percentage={site ? site.solar_irradiance.score_pct : 0}
          />
          <ProgressStat
            label="Shading Analysis"
            status={site ? site.shading_analysis.rating : "Minimal Shading"}
            percentage={site ? site.shading_analysis.score_pct : 0}
          />
        </div>
      </CommonBorderWrapper>
      <CommonBorderWrapper isShadow>
        <SectionHeader
          size="lg"
          title="Are you interested in biomass energy?"
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <SelectableOptionCard
            icon={Check}
            title="Yes, I'm interested"
            description="Include solar in my energy plan"
            selected={interested === "yes"}
            onClick={() => setInterested("yes")}
          />
          <SelectableOptionCard
            icon={X}
            title="No, not at this time"
            description="Continue without solar"
            selected={interested === "no"}
            onClick={() => setInterested("no")}
            selectedColor="border-gray-400 bg-gray-50"
          />
        </div>
      </CommonBorderWrapper>
      <div className="flex justify-end gap-3">
        {!hasAnalyzed && (
          <CommonButton
            onClick={handleAnalysisClick}
            isLoading={isLoading}
            loadingText="Analyzing..."
          >
            Analysis
          </CommonButton>
        )}
        <CommonButton
          type="submit"
          disabled={!hasAnalyzed || isLoading || !interested}
          to="../wind-energy"
        >
          Save with Next
          <ArrowRight className="w-4 h-4" />
        </CommonButton>
      </div>
    </form>
  );
};

export default BSolarEnergy;
