import { BaseEquipment } from "../solar/EquipmentCard";

export interface HvacEquipment extends BaseEquipment {
  category: HvacCategory;
}
export type HvacCategory =
  | "heatPumps"
  | "airConditioners"
  | "airHandlingUnits"
  | "ventilationSystems"
  | "thermostatsControls"
  | "accessories";

export interface SelectedEquipmentItem {
  equipment: HvacEquipment;
  quantity: number;
}

export interface SiteHvacParameters {
  buildingAreaSqFt: number;
  coolingLoadKw: number;
  heatingLoadKw: number;
  occupancyCount: number;
  insulationRatingPct: number;
  systemLossFactorPct: number;
}
