import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";
import RadioOptionCard from "@/components/consumer/standard/commodity/thermal/RadioOptionCard";
import { inputClass } from "@/pages/Login";
import { Box } from "lucide-react";
import React, { useState } from "react";
import { TbBoxMargin } from "react-icons/tb";

const SimulationSettings: React.FC = () => {
  const [solverMethod, setSolverMethod] = useState<"fvm" | "fem">("fvm");
  const [dimension, setDimension] = useState<"2d" | "3d">("3d");

  return (
    <CommonBorderWrapper isShadow>
      <CommonHeader size="xl">Simulation Settings</CommonHeader>

      <div>
        <label className={inputClass.label}>Convergence Tolerance</label>
        <input type="text" defaultValue="0.001" className={inputClass.input} />
        <p className="text-xs text-[#758179] mt-1">
          Maximum acceptable error threshold
        </p>
      </div>

      <div>
        <label className={inputClass.label}>Maximum Iterations</label>
        <input type="text" defaultValue="1000" className={inputClass.input} />
        <p className="text-xs text-[#758179] mt-1">
          Computational limit for convergence
        </p>
      </div>

      <div className="rounded-xl bg-white border border-[#E7E9E8] ">
        <div className="flex items-center gap-2 mb-4 bg-[#EAF7E6]/40 p-4">
          <TbBoxMargin className="text-2xl text-primary" />
          <SectionHeader size="md" title="Simulation Solver Configuration" />
        </div>

        <div className="space-y-3 p-4">
          <p className="text-xs font-semibold text-[#758179] uppercase mb-2">
            Simulation Method
          </p>
          <RadioOptionCard
            title="Finite Volume Method (FVM)"
            description="Suitable for heat transfer, airflow, and energy conservation simulations."
            selected={solverMethod === "fvm"}
            onClick={() => setSolverMethod("fvm")}
          />
          <RadioOptionCard
            title="Finite Element Method (FEM)"
            description="Suitable for complex geometries and high-precision thermal analysis."
            selected={solverMethod === "fem"}
            onClick={() => setSolverMethod("fem")}
          />
        </div>

        <p className="text-xs font-semibold text-[#758179] uppercase mb-2 px-4">
          Simulation Dimension
        </p>
        <div className="grid grid-cols-2 gap-0 border border-[#E7E9E8] rounded-xl overflow-hidden m-4">
          <button
            type="button"
            onClick={() => setDimension("2d")}
            className={`flex cursor-pointer items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors ${
              dimension === "2d"
                ? "bg-[#EAF7E6]/50 text-[#112518]"
                : "bg-white text-[#758179] hover:bg-gray-50"
            }`}
          >
            <Box className="w-4 h-4" />
            2D Simulation
          </button>
          <button
            type="button"
            onClick={() => setDimension("3d")}
            className={`flex cursor-pointer items-center justify-center gap-2 py-3 text-sm font-semibold transition-colors border-l border-[#E7E9E8] ${
              dimension === "3d"
                ? "bg-[#EAF7E6]/50 text-[#112518]"
                : "bg-white text-[#758179] hover:bg-gray-50"
            }`}
          >
            <Box className="w-4 h-4" />
            3D Simulation
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-green-50 border border-[#E7E9E8] p-5">
        <SectionHeader size="md" title="Simulation Configuration" />
        <div className="grid grid-cols-2 gap-4 text-sm mt-4">
          <div>
            <p className="text-[#758179] mb-1">Grid Resolution</p>
            <p className="font-bold text-[#112518]">100 × 30 × 30 nodes</p>
          </div>
          <div>
            <p className="text-[#758179] mb-1">Analysis Type</p>
            <p className="font-bold text-[#112518]">3D Steady State</p>
          </div>
          <div>
            <p className="text-[#758179] mb-1">Solver Type</p>
            <p className="font-bold text-[#112518]">Gauss-Seidel</p>
          </div>
          <div>
            <p className="text-[#758179] mb-1">Est. Runtime</p>
            <p className="font-bold text-[#112518]">~6 sec</p>
          </div>
        </div>
      </div>
    </CommonBorderWrapper>
  );
};

export default SimulationSettings;
