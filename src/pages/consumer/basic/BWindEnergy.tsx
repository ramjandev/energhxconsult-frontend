import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import IconSectionHeader from "@/components/consumer/basic/renewable/IconSectionHeader";
import ProgressStat from "@/components/consumer/basic/renewable/ProgressStat";
import {
  defaultWindValues,
  windFormSchema,
  WindFormValues,
} from "@/components/consumer/basic/renewable/schema/windFormSchema";
import SelectableOptionCard from "@/components/consumer/basic/renewable/SelectableOptionCard";
import SpecRow from "@/components/consumer/basic/renewable/SpecRow";
import StatBlock from "@/components/consumer/basic/renewable/StatBlock";
import { useCalculateWindMutation } from "@/store/consumer/basic/renewables/renewableEnergyAPI";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import DashboardCardSkeleton from "@/common/loading/DashboardCardSkeleton";
import {
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  TrendingUp,
  Wind,
  X,
} from "lucide-react";

const fmtNumber = (n: number) => n.toLocaleString("en-US");
const fmtCurrency = (n: number, currency = "$") =>
  `${currency}${fmtNumber(Math.round(n))}`;

const BWindEnergy = () => {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<WindFormValues>({
    resolver: zodResolver(windFormSchema),
    defaultValues: defaultWindValues,
    mode: "onChange",
  });

  const [calculateWind, { data, isLoading }] = useCalculateWindMutation();
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [interested, setInterested] = useState<"yes" | "no" | null>(null);

  const handleAnalysisClick = async () => {
    const parsed = windFormSchema.safeParse(getValues());
    if (!parsed.success) return;
    await calculateWind(parsed.data);
    setHasAnalyzed(true);
  };

  const onSubmit = (values: WindFormValues) => {
    if (!values) return;
  };

  const impact = data?.data.environmental_impact;
  const summary = data?.data.summary;
  const site = data?.data.wind_resource_assessment;

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <IconSectionHeader
        icon={Wind}
        title="Wind Energy Potential"
        description="Assess your wind energy potential and savings"
        iconBgClassName="bg-[#DBEAFE]"
        iconClassName="text-[#155DFC]"
      />

      {isLoading ? (
        <DashboardCardSkeleton />
      ) : (
        summary && (
          <div className="rounded-[14px] border-2 border-[#BEDBFF] bg-gradient-to-br from-[#EFF6FF] to-white p-6 space-y-6">
            <SectionHeader size="xl" title="Wind Analysis Results" />

            <div className="grid  grid-cols-2 xl:grid-cols-4 gap-6 ">
              <StatBlock
                icon={Wind}
                iconBg="bg-[#DBEAFE]"
                iconColor="text-[#155DFC]"
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
                value={` ${fmtCurrency(summary.annual_savings_usd)} `}
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
            <SpecRow label="Turbine Type" value="Horizontal Axis" />
            <SpecRow label="Rated Power" value="5 kW per turbine" />
            <SpecRow label="Number of Turbines" value="1" />
            <SpecRow label="Rotor Diameter" value="6.2 meters" />
            <SpecRow label="Hub Height" value="18 meters" />
            <SpecRow
              label="Grid Connection"
              value="Grid-Tied with Net Metering"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Wind Resource" />

          <div>
            <SpecRow label="Mean Wind Speed" value="5.5 m/s" />
            <SpecRow label="Measurement Height" value="10 meters" />
            <SpecRow label="Weibull k" value="2" />
            <SpecRow label="Air Density" value="1.225 kg/m³" />
            <SpecRow label="Turbulence Intensity" value="9.8%" />
            <SpecRow
              label="Terrain Roughness Class"
              value="2"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Turbine Performance" />

          <div>
            <SpecRow label="Power Coefficient (Cp)" value="0.4" />
            <SpecRow label="Cut-in Speed" value="3.5 m/s" />
            <SpecRow label="Cut-out Speed" value="25 m/s" />
            <SpecRow label="System Efficiency" value="85.7%" />
            <SpecRow label="Annual Operating Hours" value="8,760 hrs" />
            <SpecRow
              label="Availability Factor"
              value="100%"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Demand & Grid Impact" />

          <div>
            <SpecRow label="Monthly Energy" value="1,520 kWh" />
            <SpecRow label="Annual Energy" value="18,250 kWh" />
            <SpecRow label="Emissions Factor" value="0.5 kg CO₂/kWh" />
            <SpecRow
              label="CO₂ Absorbed per Tree/Year"
              value="21.8 kg"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Financial Breakdown" />

          <div>
            <SpecRow label="System Cost" value="$15,200" />
            <SpecRow
              label="Federal Tax Credit (30%)"
              value="-$4,560"
              valueClass="text-green-600"
            />
            <SpecRow label="Net Cost" value="$10,640" />
            <SpecRow label="Electricity Tariff Rate" value="$0.168 / kWh" />
            <SpecRow label="Annual O&M Cost" value="$200" />
            <SpecRow
              label="Annual Savings"
              value="$1,380"
              valueClass="text-green-600"
            />
            <SpecRow
              label="25-Year Savings"
              value="$34,500"
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
            value={`${impact?.co2_reduction_tons_per_year ?? 0} tons/year`}
            valueClass="text-green-600!"
            sub={
              impact
                ? `Equivalent to planting ${fmtNumber(
                    impact.equivalent_trees_planted,
                  )} trees annually`
                : "Equivalent to planting 95 trees annually"
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
            value={impact ? `${impact.energy_independence_percentage}%` : "0%"}
            valueClass="text-green-600!"
            sub="Self-sufficiency rating"
          />
        </div>
      </div>

      <CommonBorderWrapper className="space-y-4">
        <SectionHeader size="lg" title="Wind Resource Assessment" />
        <div className="space-y-4">
          <ProgressStat
            label="Average Wind Speed"
            status={
              site
                ? `${site.hub_height_wind_speed_ms} m/s (${site.average_wind_speed.rating})`
                : "6.5 m/s (Good)"
            }
            percentage={site ? site.average_wind_speed.score_pct : 0}
            color="bg-[#155DFC]!"
          />

          <ProgressStat
            label="Site Suitability"
            status={site ? site.site_suitability.rating : "Good"}
            percentage={site ? site.site_suitability.score_pct : 0}
            color="bg-[#155DFC]!"
          />

          <ProgressStat
            label="Turbulence Level"
            status={site ? site.turbulence_level.rating : "Low"}
            percentage={site ? site.turbulence_level.score_pct : 0}
          />

          <ProgressStat
            label="Obstacle-Free Zone"
            status={site ? site.obstacle_free_zone.rating : "Excellent"}
            percentage={site ? site.obstacle_free_zone.score_pct : 0}
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Are you interested in wind energy?" />

        <div className="flex flex-col sm:flex-row gap-4">
          <SelectableOptionCard
            icon={Check}
            title="Yes, I'm interested"
            description="Include wind in my energy plan"
            selected={interested === "yes"}
            onClick={() => setInterested("yes")}
          />

          <SelectableOptionCard
            icon={X}
            title="No, not at this time"
            description="Continue without wind"
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
          to="../biomass-energy"
        >
          Save with Next
          <ArrowRight className="w-4 h-4" />
        </CommonButton>
      </div>
    </form>
  );
};

export default BWindEnergy;
