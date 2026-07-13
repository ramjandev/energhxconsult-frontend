import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import {
  AlertCircle,
  Battery,
  DollarSign,
  Leaf,
  Sun,
  Wind,
} from "lucide-react";
const ModuleConfigs = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CommonBorderWrapper isShadow>
          <CommonHeader size="xl">
            <Sun className="w-5 h-5 text-amber-500" /> Solar Module
          </CommonHeader>

          <div className="space-y-5">
            <div>
              <label className={inputClass.label}>Panel Area (m²)</label>
              <input
                type="text"
                defaultValue="450"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>PV Efficiency (%)</label>
              <input
                type="text"
                defaultValue="20"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>
                Solar Irradiance (kWh/m²/day)
              </label>
              <input
                type="text"
                defaultValue="5.2"
                className={inputClass.input}
              />
            </div>
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <CommonHeader size="xl">
            <Wind className="w-5 h-5 text-blue-500" />
            Wind Module
          </CommonHeader>
          <div className="space-y-5">
            <div>
              <label className={inputClass.label}>Wind Speed (m/s)</label>
              <input
                type="text"
                defaultValue="6.5"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>Turbine Size (kW)</label>
              <input
                type="text"
                defaultValue="10"
                className={inputClass.input}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={inputClass.label}>Cut-In Speed (m/s)</label>
                <input
                  type="text"
                  defaultValue="3"
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>Cut-Out Speed (m/s)</label>
                <input
                  type="text"
                  defaultValue="25"
                  className={inputClass.input}
                />
              </div>
            </div>
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <CommonHeader size="xl">
            <Leaf className="w-5 h-5 text-green-600" />
            Biomass Module
          </CommonHeader>
          <div className="space-y-5">
            <div>
              <label className={inputClass.label}>
                Feedstock Mass (kg/day)
              </label>
              <input
                type="text"
                defaultValue="500"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>Methane Yield (m³/kg)</label>
              <input
                type="text"
                defaultValue="0.4"
                className={inputClass.input}
              />
            </div>
            <div>
              <label className={inputClass.label}>
                Generator Efficiency (%)
              </label>
              <input
                type="text"
                defaultValue="35"
                className={inputClass.input}
              />
            </div>
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper isShadow>
          <CommonHeader size="xl">
            <Battery className="w-5 h-5 text-purple-600" />
            Battery Storage Module
          </CommonHeader>

          <div className="space-y-5 mb-5">
            <div>
              <label className={inputClass.label}>Battery Capacity (kWh)</label>
              <input
                type="text"
                defaultValue="30"
                className={inputClass.input}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className={inputClass.label}>
                  Charge Efficiency (%)
                </label>
                <input
                  type="text"
                  defaultValue="95"
                  className={inputClass.input}
                />
              </div>
              <div>
                <label className={inputClass.label}>
                  Discharge Efficiency (%)
                </label>
                <input
                  type="text"
                  defaultValue="92"
                  className={inputClass.input}
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#FAF5FF] border border-[#E9D4FF] p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-[#9810FA] shrink-0 mt-0.5" />
            <div>
              <SectionHeader
                size="md"
                title="Storage Optimization"
                description="Battery stores excess renewable energy for peak demand periods"
              />
            </div>
          </div>
        </CommonBorderWrapper>
      </div>
      <CommonBorderWrapper isShadow>
        <CommonHeader size="xl" className="">
          <DollarSign className="w-5 h-5 text-green-600" />
          Financial Parameters
        </CommonHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className={inputClass.label}>Capital Cost ($)</label>
            <input
              type="text"
              defaultValue="125000"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>O&amp;M Cost ($/year)</label>
            <input
              type="text"
              defaultValue="3500"
              className={inputClass.input}
            />
          </div>
          <div>
            <label className={inputClass.label}>Project Life (years)</label>
            <input type="text" defaultValue="25" className={inputClass.input} />
          </div>
          <div>
            <label className={inputClass.label}>Discount Rate (%)</label>
            <input type="text" defaultValue="5" className={inputClass.input} />
          </div>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default ModuleConfigs;
