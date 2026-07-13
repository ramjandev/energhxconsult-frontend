import { BaseEquipment } from "./EquipmentCard";

export interface SolarEquipment extends BaseEquipment {
  category: SolarCategory;
}

export type SolarCategory =
  | "pvModules"
  | "inverters"
  | "mountingSystems"
  | "monitoringDevices"
  | "accessories";

export interface SelectedEquipmentItem {
  equipment: SolarEquipment;
  quantity: number;
}

export interface SiteSolarParameters {
  totalRoofAreaSqFt: number;
  availableRoofAreaSqFt: number;
  solarIrradiance: number; // kWh/m²/day
  tiltAngleDegrees: number;
  azimuthDegrees: number;
  systemLossFactorPct: number;
  panelEfficiencyPct: number;
}
