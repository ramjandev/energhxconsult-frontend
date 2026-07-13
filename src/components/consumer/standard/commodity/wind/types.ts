import { BaseEquipment } from "../solar/EquipmentCard";

export interface WindEquipment extends BaseEquipment {
  category: WindCategory;
}
export type WindCategory =
  | "windTurbines"
  | "inverters"
  | "controllers"
  | "monitoringSystems"
  | "accessories";

export interface SelectedEquipmentItem {
  equipment: WindEquipment;
  quantity: number;
}

export interface SiteWindParameters {
  averageWindSpeed: number; // m/s
  hubHeightMeters: number;
  turbulenceIntensityPct: number;
  airDensity: number; // kg/m³
  systemLossFactorPct: number;
  availableLandAreaSqFt: number;
}
