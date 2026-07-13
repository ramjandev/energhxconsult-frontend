import { Leaf, Users } from "lucide-react";

const EnvironmentalBenefits = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#EAF7E6] flex items-center justify-center shrink-0">
          <Leaf className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-[#112518]">Carbon Neutral</p>
          <p className="text-sm text-green-600 font-medium">
            ~0 net CO2 emissions
          </p>
          <p className="text-xs text-[#758179] mt-0.5">
            When sourced from sustainably managed forests
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg bg-[#EAF7E6] flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-[#112518]">Local Economy</p>
          <p className="text-sm text-green-600 font-medium">
            Supports local jobs
          </p>
          <p className="text-xs text-[#758179] mt-0.5">
            Pellets sourced from regional suppliers
          </p>
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalBenefits;
