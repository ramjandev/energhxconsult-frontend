import ActionButton from "@/common/button/ActionButton";
import BackButton from "@/common/button/BackButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";
import { Battery, Car, Zap } from "lucide-react";
import { useState } from "react";
import BMiniCard from "./card/BMiniCard";
import Counter from "./Counter";
const ADDED_VEHICLES = [
  {
    name: "Tesla Model 3",
    battery: "75 kWh",
    range: "358 mi",
    charging: "Level 2/DC",
    icon: "🚗",
  },
  {
    name: "Nissan Leaf",
    battery: "62 kWh",
    range: "226 mi",
    charging: "Level 2",
    icon: "🚗",
  },
];

const RECOMMENDATIONS = [
  "Consider Level 2 charging installation for overnight charging",
  "Solar panels can offset 80% of your EV charging needs",
  "Time-of-use electricity rates can reduce charging costs by 40%",
];

const EVManagement = () => {
  const [quantities, setQuantities] = useState<Record<number, number>>({
    0: 1,
    1: 1,
  });

  const changeQty = (idx: number, delta: number) =>
    setQuantities((q) => ({ ...q, [idx]: Math.max(0, (q[idx] ?? 1) + delta) }));

  const stats = [
    {
      label: "Total Vehicles",
      value: "2",
      sub: "",
      icon: Car,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Battery",
      value: "137",
      sub: "kWh capacity",
      icon: Battery,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      label: "Monthly Demand",
      value: "850",
      sub: "kWh",
      icon: Zap,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];
  const chargingStats = [
    {
      label: "Monthly Charging Cost",
      value: "$128",
      des: "at $0.15/kWh",
      valueClass: "text-primary",
    },
    {
      label: "Average Charging Time",
      value: "8 Hours",
      des: "Per Charging Session",
      valueClass: "text-primary",
    },
    {
      label: "Building Energy Impact",
      value: "+36%",
      des: "increase in monthly usage",
      valueClass: "text-orange-500",
    },
  ];
  return (
    <div className=" space-y-6">
      <BackButton />

      <CommonBorderWrapper isShadow className="">
        <div className="flex items-start justify-between">
          <div>
            <SectionHeader
              title="Added Electric Vehicles"
              description="Manage electric vehicles for this building"
            />
          </div>
          <CommonButton to="../add-ev-database" showDefaultIcon>
            Add More
          </CommonButton>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {stats.map((s) => (
            <BMiniCard
              key={s.label}
              icon={s.icon}
              label={s.label}
              value={s.value}
              des={s.sub}
            />
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow className="">
        <SectionHeader title="Vehicle List" />

        <div className="space-y-4">
          {ADDED_VEHICLES.map((v, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-[#EAF7E6]/30 rounded-xl p-6 w-full gap-4 "
            >
              <div className="flex items-center gap-4 w-full">
                <div className="text-4xl">{v.icon}</div>
                <div className="flex-1 flex flex-col gap-2 w-full ">
                  <CommonHeader className="font-bold!">{v.name}</CommonHeader>

                  <div className="w-full flex justify-between ">
                    <div className="flex">
                      <CommonHeader size="sm">Battery:</CommonHeader>
                      <CommonHeader
                        size="sm"
                        className="font-bold! text-[#112518]!"
                      >
                        {v.battery}
                      </CommonHeader>
                    </div>
                    <div className="flex">
                      <CommonHeader size="sm">Range:</CommonHeader>
                      <CommonHeader
                        size="sm"
                        className="font-bold! text-primary!"
                      >
                        {v.range}
                      </CommonHeader>
                    </div>
                    <div className="flex mr-10">
                      <CommonHeader size="sm">Charging:</CommonHeader>
                      <CommonHeader
                        size="sm"
                        className="font-bold! text-[#112518]!"
                      >
                        {v.charging}
                      </CommonHeader>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Counter
                  value={quantities[i] ?? 1}
                  onChange={(value) =>
                    changeQty(i, value - (quantities[i] ?? 1))
                  }
                  min={1}
                  max={10}
                />
                <ActionButton type="delete" onClick={() => {}} />
              </div>
            </div>
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow className="">
        <SectionHeader title="Charging Impact Summary" />

        <div className="grid grid-cols-3 gap-3">
          {chargingStats.map((stat) => (
            <BMiniCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              des={stat.des}
              valueClass={stat.valueClass}
            />
          ))}
        </div>

        <CommonBorderWrapper className="bg-[#EFF6FF]! border-[#BEDBFF]!">
          <CommonHeader size="md" className="font-bold! text-[#112518]! mb-2">
            Charging Recommendations
          </CommonHeader>
          {RECOMMENDATIONS.map((r, i) => (
            <CommonHeader key={i} size="sm" className=" mb-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#155DFC] shrink-0" />
              {r}
            </CommonHeader>
          ))}
        </CommonBorderWrapper>

        <div className="flex gap-3">
          <CommonButton
            variant="outline"
            to="../add-ev-database"
            className="w-full"
          >
            Add More Vehicles
          </CommonButton>
          <CommonButton type="submit" className="w-full">
            Save &amp; Continue
          </CommonButton>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default EVManagement;
