import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import SectionHeader from "@/common/header/SectionHeader";
import {
  useRunFVMSimulationMutation,
  useRunNzebSimulationMutation,
  useRunZevSimulationMutation,
} from "@/store/consumer/standard/Simulations/simulationApi";
import {
  AdvancedEngineeringModule,
  ZevPayload,
} from "@/store/consumer/standard/Simulations/types/dashboard";
import { Building2, Car, Thermometer } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import SimulationModuleCard from "./SimulationModuleCard";

interface SimulationModule {
  advancedEngineeringModules: AdvancedEngineeringModule[];
}
const AdvancedEngineeringModules: React.FC<SimulationModule> = ({
  advancedEngineeringModules,
}) => {
  const navigate = useNavigate();

  const zevData = advancedEngineeringModules.find(
    (module) => module.key === "ZEV",
  );

  // ---------- ZEV ----------
  const zevInput = zevData?.metrics as ZevPayload;
  const [runZevSimulation, { isLoading: isRunningZev }] =
    useRunZevSimulationMutation();

  // ---------- NZEB ----------

  const nzebData = advancedEngineeringModules?.find(
    (module) => module.key === "NZEB",
  );
  const [runNzebSimulation, { isLoading: isRunningNzeb }] =
    useRunNzebSimulationMutation();

  //Thermal Comfort
  const [runFvmSimulation, { isLoading: isRunningFvm }] =
    useRunFVMSimulationMutation();
  const thermalData = advancedEngineeringModules?.find(
    (module) => module.key === "THERMAL_COMFORT",
  );

  const handleViewSimulation = (route: string) => {
    navigate(route);
  };

  const runZev = async () => {
    try {
      await runZevSimulation({
        stationUptime: zevInput?.simulationInput?.stationUptime ?? 0.95,
        vehicleUptime: zevInput?.simulationInput?.vehicleUptime ?? 0.9,
        chargingTime: zevInput?.simulationInput?.chargingTime ?? 1.5,
        energyDelivered: zevInput?.simulationInput?.energyDelivered ?? 75,
        tariff: zevInput?.simulationInput?.tariff ?? 0.22,
        income: zevInput?.simulationInput?.income ?? 25,
        stationDensity: zevInput?.simulationInput?.stationDensity ?? 1,
        waitingTime: zevInput?.simulationInput?.waitingTime ?? 10,
      }).unwrap();
      handleViewSimulation("../energy-commodity-setup");
    } catch (err) {
      console.error("Failed to run ZEV simulation:", err);
    }
  };
  const runFvm = async () => {
    try {
      await runFvmSimulation({
        dimension: "2D",
        thermal_conductivity: 0.8,
        domain_length_x: 5,
        domain_length_y: 4,
        num_nodes_x: 20,
        num_nodes_y: 20,
        left_bc_temp: 20,
        right_bc_temp_inf: 32,
        right_bc_h: 10,
        bottom_bc_temp: 22,
        top_bc_temp_inf: 30,
        top_bc_h: 8,
        tolerance: 0.001,
        max_iterations: 500,
      }).unwrap();
      handleViewSimulation("../energy-commodity-setup");
    } catch (err) {
      console.error("Failed to run FVM simulation:", err);
    }
  };

  const runNzeb = async () => {
    try {
      await runNzebSimulation({
        solar_inputs: {
          area_pv: 20,
          efficiency_pv: 0.18,
          irradiance: 1000,
        },
        wind_inputs: {
          air_density: 1.225,
          swept_area: 12,
          power_coefficient: 0.35,
          wind_speed: 6,
          v_cut_in: 3,
          v_rated: 12,
          v_cut_out: 25,
          p_rated: 5,
          delta_t: 1,
        },
        biogas_inputs: {
          methane_yield: 0.35,
          mass_feedstock: 1000,
          efficiency_bg: 0.8,
          hhv_ch4: 55.5,
        },
        load_demand: 25,
        grid_energy: 10,
        battery_inputs: {
          capacity: 75,
          initial_soc: 0.5,
          eta_c: 0.95,
          eta_d: 0.9,
        },
        lcca_inputs: {
          c_init: 10000,
          c_om: 500,
          c_rep: 2000,
          s: 1000,
          r: 0.08,
          n: 20,
        },
        co2_inputs: {
          emission_factor: 0.42,
        },
        scenario: "baseline",
      }).unwrap();
      handleViewSimulation("../energy-commodity-setup");
    } catch (err) {
      console.error("Failed to run NZEB simulation:", err);
    }
  };

  return (
    <CommonBorderWrapper isShadow>
      <SectionHeader
        title="Advanced Engineering Modules"
        description="Specialized computational tools for advanced sustainability analysis"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SimulationModuleCard
          icon={Car}
          iconColor="text-blue-500"
          title="Zero Emission Vehicle"
          description="Advanced vehicle charging simulation and optimization"
          bgClassName="bg-[#EFF6FF]"
          stats={[
            {
              label: "Station Uptime",
              value: zevInput
                ? `${zevInput?.simulationInput?.stationUptime.toFixed(1)}%`
                : "--",
            },
            {
              label: "Vehicle Uptime",
              value: zevInput
                ? `${zevInput?.simulationInput?.vehicleUptime.toFixed(0)}%`
                : "--",
            },
            {
              label: "Energy Delivered",
              value: zevInput
                ? `${zevInput?.simulationInput?.energyDelivered} kWh`
                : "--",
            },
            {
              label: "Charging Time",
              value: zevInput
                ? `${zevInput?.simulationInput?.chargingTime} hrs`
                : "--",
            },
          ]}
          onRunSimulation={runZev}
          isLoading={isRunningZev}
        />

        <SimulationModuleCard
          icon={Building2}
          iconColor="text-green-600"
          title="Net Zero Energy Building"
          description="Hybrid renewable energy simulation and net-zero optimization"
          bgClassName="bg-[#F0FDF4]"
          stats={[
            {
              label: "Renewable Contribution",
              value: "50%",
            },
            {
              label: "Annual Generation",
              value: "21%",
            },
            {
              label: "Annual Savings",
              value: "45%",
            },
            {
              label: "CO2 Reduction",
              value: "30 Kwh",
            },
          ]}
          onRunSimulation={runNzeb}
          isLoading={isRunningNzeb}
        />

        <SimulationModuleCard
          icon={Thermometer}
          iconColor="text-orange-500"
          title="Thermal Comfort Simulation"
          description="FVM heat transfer analysis and building envelope optimization"
          bgClassName="bg-[#FFF7ED]"
          stats={[
            { label: "Thermal Conductivity", value: "0.5 W/m·K" },
            { label: "Heat Transfer", value: "37 W/m²" },
            { label: "Comfort Index", value: "87/100" },
            { label: "Energy Impact", value: "4,450 kWh" },
          ]}
          onRunSimulation={runFvm}
          isLoading={isRunningFvm}
        />
      </div>
    </CommonBorderWrapper>
  );
};

export default AdvancedEngineeringModules;
