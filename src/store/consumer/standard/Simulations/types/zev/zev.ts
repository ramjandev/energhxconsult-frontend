export type SimulationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

export interface ZevDetails {
  vehicleConfiguration: {
    vehicleType: string;
    batteryCapacityKwh: number;
    dailyDistanceMiles: number;
    vehicleClass: string;
  };
  chargingConfiguration: {
    chargingMethod: string;
    numberOfChargingPorts: number;
    chargingDurationHoursPerDay: number;
    expectedStationUptimePercent: number;
    averageWaitingTimeMinutes: number;
    energyTariffPerKwh: number;
  };
  simulationInput: {
    stationUptime: number;
    vehicleUptime: number;
    chargingTime: number;
    energyDelivered: number;
    tariff: number;
    income: number;
    stationDensity: number;
    waitingTime: number;
  };
  simulationResults: {
    chargingCost: number;
    monthlyChargingCost: number;
    energyDemandKwhPerDay: number;
    vehicleUptimePercent: number;
    batteryUtilizationPercent: number;
    annualSavings: number;
  };
  charts: {
    dailyChargingPattern: unknown[];
    chargingStationUtilization: {
      chargingPercent: number;
      idlePercent: number;
      maintenancePercent: number;
    };
    sixMonthEnergyCostTrends: unknown[];
  };
  recommendations: unknown[];
}

export interface GetZevSimulationResponse {
  status: SimulationStatus;
  zev: ZevDetails | null;
}

export interface UpdateZevSimulationPayload {
  status: SimulationStatus;
  zev: ZevDetails;
}

export interface RunZevSimulationPayload {
  stationUptime: number;
  vehicleUptime: number;
  chargingTime: number;
  energyDelivered: number;
  tariff: number;
  income: number;
  stationDensity: number;
  waitingTime: number;
}
