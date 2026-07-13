import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import BMiniCard from "@/components/consumer/basic/building/card/BMiniCard";
import ImageDropzone from "@/components/consumer/basic/building/ImageDropzone";

import Separator from "@/common/form/Separator";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { inputClass } from "@/pages/Login";
import { Building2, TrendingUp, Zap } from "lucide-react";
import React, { useState } from "react";
import EnergyPlanCard from "./EnergyPlanCard";

const PLANS = [
  {
    id: "fixed",
    title: "Fixed Rate",
    rate: "$0.15/kWh",
    description: "Consistent pricing all day",
    features: ["Simple billing", "Predictable costs", "No peak charges"],
  },
  {
    id: "tou",
    title: "Time-of-Use",
    rate: "$0.08-0.22/kWh",
    description: "Variable pricing by time",
    features: [
      "Lower off-peak rates",
      "Higher peak rates",
      "Potential savings",
    ],
  },
  {
    id: "dynamic",
    title: "Dynamic Pricing",
    rate: "Market-based",
    description: "Real-time market rates",
    features: ["Hourly pricing", "Market optimization", "Advanced monitoring"],
  },
  {
    id: "green",
    title: "Green Energy",
    rate: "$0.16/kWh",
    description: "100% renewable sourcing",
    features: ["100% renewable", "Fixed rate", "Environmental benefits"],
  },
];

const Setup: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState("tou");
  const [billFile, setBillFile] = useState<File | null>(null);

  const handleContinue = () => {
    console.log("Continue →", { selectedPlan, billFile });
    // TODO: navigate to Renewable System Sizing
  };

  return (
    <div className="space-y-6">
      <Welcome
        title="Energy Commodity Setup"
        description="Professional utility configuration and rate structure management"
        className="border-[rgba(45,173,0,0.20)] bg-[linear-gradient(90deg,_rgba(45,173,0,0.10)_0%,_#EAF7E6_100%)]"
        Icons={Building2}
        iconColor="text-green-600"
        iconBg="bg-white"
      />

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Electricity Provider Configuration" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <div>
            <label className={inputClass.label}>Electricity Provider</label>
            <input
              type="text"
              defaultValue="Metro Power Company"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Utility Account Number</label>
            <input
              type="text"
              placeholder="EL-2024-892341"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>
              Utility Service Territory
            </label>
            <input
              type="text"
              defaultValue="Lagos Metropolitan Area"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Tariff Type</label>
            <input type="text" className={inputClass.input} />
          </div>
        </div>

        <Separator />
        <div className="space-y-2">
          <SectionHeader size="lg" title="Rate Structure" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
            <div>
              <label className={inputClass.label}>Standard Rate ($/kWh)</label>
              <input
                type="text"
                defaultValue="0.15"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>Peak Rate ($/kWh)</label>
              <input
                type="text"
                defaultValue="0.22"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>Off-Peak Rate ($/kWh)</label>
              <input
                type="text"
                defaultValue="0.08"
                className={inputClass.input}
              />
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <SectionHeader size="lg" title="Consumption Data" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={inputClass.label}>
                Monthly Consumption (kWh)
              </label>
              <input
                type="text"
                defaultValue="2340"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>
                Annual Consumption (kWh)
              </label>
              <input
                type="text"
                defaultValue="28080"
                className={inputClass.input}
              />
            </div>
          </div>
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Natural Gas Provider Configuration" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className={inputClass.label}>Natural Gas Provider</label>
            <input
              type="text"
              defaultValue="City Gas Services"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Utility Account Number</label>
            <input
              type="text"
              placeholder="EL-2024-892341"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>
              Utility Service Territory
            </label>
            <input
              type="text"
              defaultValue="Lagos Metropolitan Area"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Tariff Type</label>
            <input type="text" className={inputClass.input} />
          </div>
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Utility Bill Upload" />
        <ImageDropzone
          accept=".pdf,.jpg,.jpeg,.png"
          label="Drag and drop or click to browse (PDF, JPG, PNG)"
          onFileSelect={setBillFile}
          description="Upload your utility bill"
        />
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="lg" title="Historical Usage Summary" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <BMiniCard
            icon={Zap}
            iconColorClassName="text-green-600"
            iconBgClassName="bg-green-600/20"
            label="Monthly Usage"
            value="2,340 kWh"
          />
          <BMiniCard
            icon={TrendingUp}
            iconColorClassName="text-green-600"
            iconBgClassName="bg-green-600/20"
            label="Peak Usage"
            value="6-9 PM"
          />
          <BMiniCard
            icon={Zap}
            iconColorClassName="text-green-600"
            iconBgClassName="bg-green-600/20"
            label="Current Rate"
            value="$0.15"
          />
          <BMiniCard
            icon={TrendingUp}
            iconColorClassName="text-green-600"
            iconBgClassName="bg-green-600/20"
            label="Monthly Cost"
            value="$351"
          />
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="lg" title="Select Energy Plan (Optional)" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((plan) => (
            <EnergyPlanCard
              key={plan.id}
              title={plan.title}
              rate={plan.rate}
              description={plan.description}
              features={plan.features}
              selected={selectedPlan === plan.id}
              onClick={() => setSelectedPlan(plan.id)}
            />
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonButton to="../zev" className="w-full" onClick={handleContinue}>
        Continue to Renewable System Sizing
      </CommonButton>
    </div>
  );
};

export default Setup;
