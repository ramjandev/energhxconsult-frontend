import { BaseEquipment } from "../solar/EquipmentCard";

export interface EvEquipment extends BaseEquipment {
  category: EvCategory;
}
export type EvCategory =
  | "evChargers"
  | "dcFastChargers"
  | "chargingStations"
  | "chargingManagement"
  | "evAccessories"
  | "electricVehicles";

export interface SelectedEquipmentItem {
  equipment: EvEquipment;
  quantity: number;
}

export interface SiteEvParameters {
  numberOfVehicles: number;
  avgDailyMilesPerVehicle: number;
  availableElectricalCapacityKw: number;
  parkingSpaces: number;
  peakChargingHours: number;
  systemLossFactorPct: number;
}
