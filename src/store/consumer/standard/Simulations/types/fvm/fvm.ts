export type SimulationStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

export interface FvmRecommendation {
  title: string;
  description: string;
  estimatedSavings?: string;
  comfortImprovement?: string;
}

export interface FvmDetails {
  buildingParameters: {
    thermalConductivityWmK: number;
    domainWidthM: number;
    domainHeightM: number;
    interiorTemperatureC: number;
    exteriorTemperatureC: number;
    temperatureDeltaC: number;
  };
  simulationSettings: {
    convergenceTolerance: number;
    maximumIterations: number;
    simulationMethod: string;
    simulationDimension: string;
    gridResolution: string;
    solverType: string;
    analysisType: string;
    estimatedRuntimeSeconds: number;
  };
  simulationResults: {
    simulationStatus: string;
    iterationsUsed: number;
    comfortScore: number;
    avgHeatFluxWm2: number;
    energyImpactKwhYearLoss: number;
    convergenceAchieved: boolean;
    finalResidual: number;
  };
  charts: {
    temperatureDistributionAcrossBuilding: unknown[];
    heatFluxByBuildingZone: unknown[];
    convergenceAnalysis: unknown[];
  };
  recommendations: FvmRecommendation[];
}

export interface GetFvmSimulationResponse {
  status: SimulationStatus;
  thermalComfort: FvmDetails;
}

export interface UpdateFvmSimulationPayload {
  status: SimulationStatus;
  thermalComfort: FvmDetails;
}

export interface RunFvmSimulationPayload {
  dimension: string; // e.g. "2D"
  thermal_conductivity: number; // W/m·K
  domain_length_x: number; // m
  domain_length_y: number; // m
  num_nodes_x: number;
  num_nodes_y: number;
  left_bc_temp: number; // °C — fixed temperature boundary
  right_bc_temp_inf: number; // °C — ambient temp for convective boundary
  right_bc_h: number; // W/m²·K — convection coefficient
  bottom_bc_temp: number; // °C — fixed temperature boundary
  top_bc_temp_inf: number; // °C — ambient temp for convective boundary
  top_bc_h: number; // W/m²·K — convection coefficient
  tolerance: number;
  max_iterations: number;
}
