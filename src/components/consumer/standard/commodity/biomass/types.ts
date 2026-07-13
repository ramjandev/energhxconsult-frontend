export interface BiomassEquipment {
  id: string;
  category: BiomassCategory;
  brand: string;
  model: string;
  imageUrl: string;
  outputSpec: string;
  technology: string;
  additionalSpec: string;
  efficiencyRating: string;
  warrantyYears: number;
  rating: number;
  price: number;
}

export type BiomassCategory =
  | "pelletBoilers"
  | "biogasKits"
  | "conversionSystems"
  | "feedstockEquipment"
  | "accessories";

export interface SelectedEquipmentItem {
  equipment: BiomassEquipment;
  quantity: number;
}

export interface SiteBiomassParameters {
  buildingHeatDemandKw: number;
  availableFeedstockTonsPerYear: number;
  fuelMoistureContentPct: number;
  storageCapacityTons: number;
  systemLossFactorPct: number;
  boilerEfficiencyPct: number;
}
