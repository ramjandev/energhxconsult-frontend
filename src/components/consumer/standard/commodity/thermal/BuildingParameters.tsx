import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import React from "react";

const BuildingParameters: React.FC = () => {
  return (
    <CommonBorderWrapper className="bg-[#EAF7E6]/30! border-[#E7E9E8]! space-y-6">
      <CommonHeader size="lg">Building Parameters</CommonHeader>

      <div>
        <label className={inputClass.label}>Thermal Conductivity (W/m·K)</label>
        <input type="text" defaultValue="0.5" className={inputClass.input} />
        <p className="text-xs text-[#758179] mt-1">
          Material heat conduction property
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={inputClass.label}>Domain Width (m)</label>
          <input type="text" defaultValue="10" className={inputClass.input} />
        </div>
        <div>
          <label className={inputClass.label}>Domain Height (m)</label>
          <input type="text" defaultValue="3" className={inputClass.input} />
        </div>
      </div>

      <div className="rounded-xl bg-green-50 border border-green-100 p-5">
        <SectionHeader size="md" title="Boundary Conditions" />

        <div className="space-y-4 mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="text-sm text-[#758179] shrink-0">
              Interior Temperature (°C)
            </label>
            <input
              type="text"
              defaultValue="22"
              className="w-24 border border-gray-200 p-2 rounded-lg outline-none text-right"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <label className="text-sm text-[#758179] shrink-0">
              Exterior Temperature (°C)
            </label>
            <input
              type="text"
              defaultValue="35"
              className="w-24 border border-gray-200 p-2 rounded-lg outline-none text-right"
            />
          </div>
          <div className="flex flex-col sm:flex-row  sm:items-center justify-between pt-2 border-t border-[#E7E9E8]">
            <span className="text-sm font-semibold text-foreground">
              Temperature Delta (ΔT)
            </span>
            <span className="text-lg font-bold text-green-600">13°C</span>
          </div>
        </div>
      </div>
    </CommonBorderWrapper>
  );
};

export default BuildingParameters;
