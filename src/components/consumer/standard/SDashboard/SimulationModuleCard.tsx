import SectionHeader from "@/common/header/SectionHeader";
import ButtonWithLoading from "@/common/loading/ButtonWithLoading";
import { ChevronRight, LucideIcon } from "lucide-react";
import React from "react";
import BMiniCard from "../../basic/building/card/BMiniCard";

export interface SimulationStat {
  label: string;
  value: string;
}

interface SimulationModuleCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  stats: [SimulationStat, SimulationStat, SimulationStat, SimulationStat];
  bgClassName: string;
  onRunSimulation: () => void;
  isLoading?: boolean;
}

const SimulationModuleCard: React.FC<SimulationModuleCardProps> = ({
  icon: Icon,
  iconColor,
  title,
  description,
  stats,
  bgClassName,
  onRunSimulation,
  isLoading,
}) => {
  return (
    <div
      className={`${bgClassName} rounded-2xl p-6 flex flex-col border border-[#E7E9E8]`}
    >
      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center mb-5">
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>

      <SectionHeader
        size="lg"
        title={title}
        description={description}
        className="mb-2"
      />

      <div className="grid grid-cols-1  sm:grid-cols-2 gap-3 mb-6">
        {stats.map((stat) => (
          <BMiniCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            valueClass="text-sm!"
            className="bg-white/60 p-3!"
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onRunSimulation}
        disabled={isLoading}
        className="mt-auto flex items-center justify-center gap-1.5 border border-gray-300 bg-white hover:bg-gray-50 rounded-xl py-3 font-semibold text-foreground transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none"
      >
        {isLoading ? (
          <ButtonWithLoading
            title="Processing..."
            textColor="text-primary!"
            borderColor="border-primary!"
          />
        ) : (
          <>
            Run Simulation
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default SimulationModuleCard;
