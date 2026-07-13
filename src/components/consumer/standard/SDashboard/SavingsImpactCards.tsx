import { Leaf, TrendingUp } from "lucide-react";
import React from "react";
import BMiniCard from "../../basic/building/card/BMiniCard";

const SavingsImpactCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <BMiniCard
        icon={TrendingUp}
        iconColorClassName="text-green-600"
        label="Potential Additional Savings"
        value="$2,400/year"
        valueClass="text-green-600"
        des="With advanced optimization and battery storage"
        className=" border-[rgba(45,173,0,0.20)] bg-[linear-gradient(90deg,_rgba(45,173,0,0.10)_0%,_rgba(45,173,0,0.05)_100%)]"
        layout="stacked"
      />

      <BMiniCard
        icon={Leaf}
        iconColorClassName="text-green-600"
        label="Enhanced CO2 Reduction"
        value="+8.5 tons/year"
        valueClass="text-green-600"
        des="Through complete renewable integration"
        className="border-[rgba(0,166,62,0.20)] bg-[linear-gradient(90deg,_rgba(0,166,62,0.10)_0%,_rgba(0,166,62,0.05)_100%)]"
        layout="stacked"
      />
    </div>
  );
};

export default SavingsImpactCards;
