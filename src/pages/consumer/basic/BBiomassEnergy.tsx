import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import IconSectionHeader from "@/components/consumer/basic/renewable/IconSectionHeader";

import FeatureCard from "@/components/consumer/basic/dashboard/FeatureCard";
import ProgressStat from "@/components/consumer/basic/renewable/ProgressStat";
import {
  biomassFormSchema,
  BiomassFormValues,
  defaultBiomassValues,
} from "@/components/consumer/basic/renewable/schema/biomassFormSchema"; // adjust path to wherever you place the schema
import SelectableOptionCard from "@/components/consumer/basic/renewable/SelectableOptionCard";
import SolarPanelConfiguration from "@/components/consumer/basic/renewable/SolarPanelConfiguration";
import SpecRow from "@/components/consumer/basic/renewable/SpecRow";
import StatBlock from "@/components/consumer/basic/renewable/StatBlock";
import { useCalculateBiomassMutation } from "@/store/consumer/basic/renewables/renewableEnergyAPI";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import DashboardCardSkeleton from "@/common/loading/DashboardCardSkeleton";
import {
  ArrowRight,
  Calendar,
  Check,
  DollarSign,
  Droplet,
  Leaf,
  RefreshCw,
  ShieldCheck,
  TrendingUp,
  X,
} from "lucide-react";

const fmtNumber = (n: number) => n.toLocaleString("en-US");
const fmtCurrency = (n: number, currency = "$") =>
  `${currency}${fmtNumber(Math.round(n))}`;

const BBiomassEnergy = () => {
  const {
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<BiomassFormValues>({
    resolver: zodResolver(biomassFormSchema),
    defaultValues: defaultBiomassValues,
    mode: "onChange",
  });

  const [calculateBiomass, { data, isLoading }] = useCalculateBiomassMutation();
  const [panelCapacity, setPanelCapacity] = useState("");
  const [interested, setInterested] = useState<"yes" | "no" | null>(null);

  useEffect(() => {
    const parsed = biomassFormSchema.safeParse(getValues());
    if (!parsed.success) return;
    const payload = parsed.data;
    calculateBiomass(payload);
  }, []);

  const onSubmit = (values: BiomassFormValues) => {
    if (!interested) return;
  };

  const impact = data?.data.environmental_impact;
  const summary = data?.data.summary;
  const feedstockAvailability = data?.data.feedstock_availability;

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <IconSectionHeader
        icon={Leaf}
        title="Biomass Energy Potential"
        description="Assess your biomass energy potential and savings"
        iconBgClassName="bg-[#F3E8FF]"
        iconClassName="text-[#9810FA]"
      />
      <SolarPanelConfiguration
        panelCapacity={panelCapacity}
        onPanelCapacityChange={setPanelCapacity}
      />

      {isLoading ? (
        <DashboardCardSkeleton />
      ) : (
        summary && (
          <div className="rounded-[14px] border-2 border-[#E9D4FF] bg-gradient-to-br from-[#FAF5FF] to-white p-6 space-y-6">
            <SectionHeader size="xl" title="Biomass Energy Potential" />

            <div className="grid  grid-cols-2 xl:grid-cols-4 gap-6">
              <StatBlock
                icon={Leaf}
                iconBg="bg-[#FFEDD4]"
                iconColor="text-[#F54900]"
                label="Recommended System"
                value={` ${summary.recommended_system_kw} kW `}
                sub="1 biomass boiler"
              />

              <StatBlock
                icon={TrendingUp}
                iconBg="bg-[#DCFCE7]"
                iconColor="text-[#00A63E]"
                label="Annual Generation"
                value={` ${fmtNumber(summary.annual_generation_kwh)} kWh `}
                sub="Per year"
              />

              <StatBlock
                icon={DollarSign}
                iconBg="bg-[#DBEAFE]"
                iconColor="text-[#155DFC]"
                label="Annual Savings"
                value={` ${fmtCurrency(summary.annual_savings_usd)} `}
                sub="Energy cost reduction"
              />

              <StatBlock
                icon={Calendar}
                iconBg="bg-[#F3E8FF]"
                iconColor="text-[#9810FA]"
                label="Payback Period"
                value={
                  summary.payback_period_years != null
                    ? ` ${summary.payback_period_years} years `
                    : " N/A "
                }
                sub="Return on investment"
              />
            </div>
          </div>
        )
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="System Specifications" />

          <div>
            <SpecRow label="Feedstock Type" value="Animal Dung" />
            <SpecRow label="Energy Priority" value="Electricity" />
            <SpecRow label="Generator Efficiency" value="42%" />
            <SpecRow label="Methane Calorific Value" value="35.8 MJ/m³" />
            <SpecRow
              label="Annual Operating Hours"
              value="8,000 hrs"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Digestion Process" />

          <div>
            <SpecRow label="Digester Temperature" value="30°C" />
            <SpecRow label="Total Solids (TS)" value="30%" />
            <SpecRow label="Volatile Solids (VS)" value="80%" />
            <SpecRow label="Feedstock Added Daily" value="120 kg/day" />
            <SpecRow label="Methane Yield (VS)" value="236 m³/ton" />
            <SpecRow
              label="Digestion Retention Time"
              value="86,400 sec"
              showBorder={false}
            />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Demand & Market" />

          <div>
            <SpecRow label="Electricity Demand" value="5 kW" />
            <SpecRow label="Gas Demand" value="300 liters/day" />
            <SpecRow label="Annual Electricity Demand" value="40,000 kWh" />
            <SpecRow label="Local Supplier Count" value="3" />
            <SpecRow label="Moisture Content" value="12%" showBorder={false} />
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <SectionHeader size="xl" title="Financial Breakdown" />

          <div>
            <SpecRow label="System Cost" value="$9,300" />
            <SpecRow
              label="Federal Tax Credit (26%)"
              value="-$2,418"
              valueClass="text-green-600"
            />
            <SpecRow label="Net Cost" value="$6,882" />
            <SpecRow label="Electricity Tariff Rate" value="$0.16 / kWh" />
            <SpecRow label="Annual O&M Cost" value="$250" />
            <SpecRow
              label="Annual Savings"
              value="$980"
              valueClass="text-green-600"
            />
            <SpecRow
              label="20-Year Savings"
              value="$24,500"
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
            value={
              impact
                ? `${impact.co2_neutral_percentage}% neutral`
                : "3.0 tons/year"
            }
            valueClass="text-green-600!"
            sub="Equivalent to planting 70 trees annually"
          />

          <StatBlock
            label="Renewable Content"
            value={impact ? `${impact.renewable_content_percentage}%` : "90%"}
            valueClass="text-green-600!"
            sub="Sustainably sourced feedstock"
          />

          <StatBlock
            label="Energy Independence"
            value={impact ? `${impact.energy_independence_percentage}%` : "45%"}
            valueClass="text-green-600!"
            sub="Self-sufficiency rating"
          />
        </div>
      </div>

      <CommonBorderWrapper className="space-y-4">
        <SectionHeader size="xl" title="Feedstock Availability" />
        <div className="space-y-4">
          <ProgressStat
            label="Local Availability"
            status={feedstockAvailability?.local_availability_status ?? "Good"}
            percentage={feedstockAvailability ? 75 : 0}
            description="3 suppliers within 50 miles"
          />
          <ProgressStat
            label="Price Stability"
            status={feedstockAvailability?.price_stability_status ?? "Adequate"}
            percentage={feedstockAvailability ? 65 : 0}
            description="$250/ton average market price"
          />
          <ProgressStat
            label="Quality (Moisture Content)"
            status={
              feedstockAvailability?.quality_moisture_compliance ?? "Compliant"
            }
            percentage={feedstockAvailability ? 85 : 0}
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Key System Features" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            isRow
            icon={<RefreshCw />}
            title="Automatic Feeding"
            description="500 kg fuel storage with automatic feed system"
            iconBgClassName="bg-[#F3E8FF] w-10! h-10!"
            iconColorClassName="text-purple-600 w-6! h-6!"
          />
          <FeatureCard
            isRow
            icon={<Leaf />}
            title="Emission Control"
            description="Advanced filtration and emission control system"
            iconBgClassName="bg-[#DCFCE7] w-10! h-10!"
            iconColorClassName="text-green-600 w-6! h-6!"
          />
          <FeatureCard
            isRow
            icon={<Droplet />}
            title="Hydronic Integration"
            description="Compatible with existing hot water heating systems"
            iconBgClassName="bg-[#DBEAFE] w-10! h-10!"
            iconColorClassName="text-blue-600 w-6! h-6!"
          />
          <FeatureCard
            isRow
            icon={<ShieldCheck />}
            title="15-Year Warranty"
            description="Comprehensive system warranty"
            iconBgClassName="bg-[#FFEDD4] w-10! h-10!"
            iconColorClassName="text-orange-600 w-6! h-6!"
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader
          size="xl"
          title="Are you interested in biomass energy?"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <SelectableOptionCard
            icon={Check}
            title="Yes, I'm interested"
            description="Include biomass in my energy plan"
            selected={interested === "yes"}
            onClick={() => setInterested("yes")}
          />

          <SelectableOptionCard
            icon={X}
            title="No, not at this time"
            description="Continue without biomass"
            selected={interested === "no"}
            onClick={() => setInterested("no")}
            selectedColor="border-gray-400 bg-gray-50"
          />
        </div>
      </CommonBorderWrapper>

      <div className="flex justify-end">
        <CommonButton
          type="submit"
          disabled={!interested || isLoading}
          to="../analysis"
        >
          Save with Next
          <ArrowRight className="w-4 h-4" />
        </CommonButton>
      </div>
    </form>
  );
};

export default BBiomassEnergy;
