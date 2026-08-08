export type SimulationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

export interface NzebDetails {
  solarModule: {
    panelAreaM2: number;
    pvEfficiencyPercent: number;
    solarIrradianceKwhM2Day: number;
  };
  windModule: {
    windSpeedMs: number;
    turbineSizeKw: number;
    cutInSpeedMs: number;
    cutOutSpeedMs: number;
  };
  biomassModule: {
    feedstockMassKgDay: number;
    methaneYieldM3Kg: number;
    generatorEfficiencyPercent: number;
  };
  batteryStorageModule: {
    batteryCapacityKwh: number;
    chargeEfficiencyPercent: number;
    dischargeEfficiencyPercent: number;
  };
  financialParameters: {
    capitalCost: number;
    omCostPerYear: number;
    projectLifeYears: number;
    discountRatePercent: number;
  };
  simulationResults: {
    renewableContributionPercent: number;
    annualCostSavings: number;
    annualGenerationKwh: number;
    carbonReductionTonsPerYear: number;
    paybackPeriodYears: number;
    netPresentValue: number;
    roiPercent: number;
  };
  charts: {
    energySourceDistribution: unknown[];
    monthlyGenerationVsDemand: unknown[];
    financialProjection: unknown[];
  };
}

export interface GetNzebSimulationResponse {
  status: SimulationStatus;
  nzeb: NzebDetails;
}

export interface UpdateNzebSimulationPayload {
  status: SimulationStatus;
  nzeb: NzebDetails;
}

export interface RunNzebSimulationPayload {
  solar_inputs: {
    area_pv: number;
    efficiency_pv: number;
    irradiance: number;
  };
  wind_inputs: {
    air_density: number;
    swept_area: number;
    power_coefficient: number;
    wind_speed: number;
    v_cut_in: number;
    v_rated: number;
    v_cut_out: number;
    p_rated: number;
    delta_t: number;
  };
  biogas_inputs: {
    methane_yield: number;
    mass_feedstock: number;
    efficiency_bg: number;
    hhv_ch4: number;
  };
  load_demand: number;
  grid_energy: number;
  battery_inputs: {
    capacity: number;
    initial_soc: number;
    eta_c: number;
    eta_d: number;
  };
  lcca_inputs: {
    c_init: number;
    c_om: number;
    c_rep: number;
    s: number;
    r: number;
    n: number;
  };
  co2_inputs: {
    emission_factor: number;
  };
  scenario: string;
}
