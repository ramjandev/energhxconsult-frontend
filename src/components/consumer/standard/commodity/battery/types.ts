import { BaseEquipment } from "../solar/EquipmentCard";

export interface BatteryEquipment extends BaseEquipment {
  category: BatteryCategory;
}
export type BatteryCategory =
  | "batterySystems"
  | "inverters"
  | "chargeControllers"
  | "monitoringSystems"
  | "accessories";

export interface SelectedEquipmentItem {
  equipment: BatteryEquipment;
  quantity: number;
}

export interface SiteBatteryParameters {
  dailyEnergyUsageKwh: number;
  desiredBackupDurationHours: number;
  criticalLoadKw: number;
  depthOfDischargePct: number;
  roundTripEfficiencyPct: number;
  solarSystemSizeKw: number;
}
