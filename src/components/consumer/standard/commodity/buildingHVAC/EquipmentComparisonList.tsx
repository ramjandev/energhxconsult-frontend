import CommonHeader from "@/common/header/CommonHeader";
import { cn } from "@/lib/utils";
import { Check, Thermometer } from "lucide-react";
import React from "react";
import { EfficiencyRating, HVACEquipment } from "./TechnicalSpecifications";

interface EquipmentComparisonListProps {
  equipmentList: HVACEquipment[];
  selectedId: string;
  onSelect: (id: string) => void;
  onCompare?: (id: string) => void;
  className?: string;
}

const ratingStyles: Record<EfficiencyRating, string> = {
  "A+++": "bg-[#EAF7E6] text-[#15803D]",
  "A++": "bg-[#EAF7E6] text-[#15803D]",
  "A+": "bg-[#EAF7E6] text-[#15803D]",
};

const EquipmentComparisonList: React.FC<EquipmentComparisonListProps> = ({
  equipmentList,
  selectedId,
  onSelect,
  onCompare,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden",
        className,
      )}
    >
      <div className="px-6 pt-5 pb-4">
        <CommonHeader size="xl">Recommended HVAC Equipment</CommonHeader>
        <CommonHeader size="sm" className="mt-1">
          Compare and select equipment for your project proposal.
        </CommonHeader>
      </div>

      <div className="divide-y divide-[#E5E7EB]">
        {equipmentList.map((eq) => {
          const isSelected = eq.id === selectedId;
          return (
            <div
              key={eq.id}
              className={cn(
                "flex flex-col lg:flex-row lg:items-center justify-between gap-4 px-6 py-4 transition-colors",
                isSelected && "bg-[#EAF7E6]/50",
              )}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-[#E0F2FE] lg:flex items-center justify-center hidden">
                  <Thermometer className="w-5 h-5 text-[#0EA5E9]" />
                </div>

                <div className="min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center  gap-2">
                    <CommonHeader size="md" className="truncate">
                      {eq.name}
                    </CommonHeader>
                    <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#E0F2FE] text-[#0369A1] w-fit">
                      {eq.category}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit",
                        ratingStyles[eq.rating],
                      )}
                    >
                      {eq.rating}
                    </span>
                  </div>
                  <div className=" mt-1 flex flex-col sm:flex-row sm:items-center">
                    <p className="text-sm text-[#758179] mt-1">
                      Capacity:{" "}
                      <span className="font-semibold text-[#112518]">
                        {eq.capacityTon} Ton
                      </span>
                    </p>
                    <p className="text-sm text-[#758179] mt-1">
                      {"  "}COP:{" "}
                      <span className="font-semibold text-[#112518]">
                        {eq.cop}
                      </span>
                    </p>
                    <p className="text-sm text-[#758179] mt-1">
                      {"  "}Est. Cost:{" "}
                      <span className="font-semibold text-[#15803D]">
                        ${eq.estimatedCost.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onCompare?.(eq.id)}
                  className="px-4 py-2 text-sm font-medium rounded-lg border border-[#E5E7EB] text-[#374151] hover:bg-gray-50 transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Compare
                </button>

                {isSelected ? (
                  <button
                    type="button"
                    disabled
                    className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg bg-[#16A34A] text-white cursor-pointer w-full sm:w-auto"
                  >
                    <Check className="w-4 h-4" />
                    Selected
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSelect(eq.id)}
                    className="px-4 py-2 text-sm font-semibold rounded-lg border border-[#16A34A] text-[#16A34A] hover:bg-[#EAF7E6]/60 transition-colors cursor-pointer w-full sm:w-auto"
                  >
                    Select Equipment
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EquipmentComparisonList;
