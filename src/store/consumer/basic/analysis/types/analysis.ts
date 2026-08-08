export type AuditType = "BASIC_AUDIT" | "COMPREHENSIVE_AUDIT";

export interface CreateAuditPayload {
  buildingId: string;
  auditType: AuditType;
}

// audit reposonse
// types/energyAuditTypes.ts

// ---- Shared envelope (reuse from renewableEnergyTypes if you prefer a single source) ----

export interface ApiEnvelope<T> {
  status: number;
  message: string;
  data: T;
}

// ---- Audit type enum ----

// ---- Hourly profile ----
// Keys are hour-of-day as string "1".."24", values are load in watts (can be negative).

export type HourlyProfile = Record<string, number>;

// ---- Cooling load ----

export type CoolingLoadCalculation = HourlyProfile;

// ---- EV / Battery sizing ----
// Empty array in sample payloads; shape unknown/unpopulated so far.

export type EvBatterySizing = unknown[];

// ---- Energy audit optimization ----

export interface OptimalParameters {
  IAC: number;
  IACD: number;
  SHGCB: number;
  SHGCD: number;
  "U-value-of-fenestration": number;
  "U-value-of-roof": number;
  "U-value-of-wall": number;
  "air-conditioning-power-density": number;
  "equipment-power-density": number;
  "fenestration-to-wall-ratio": number;
  "infiltration-rate": number;
  "lighting-power-density": number;
  "occupant-density": number;
  "outdoor-air-temperature": number;
  "outdoor-humidity-ratio": number;
  "space-air-temperature": number;
  "space-humidity-ratio": number;
}

export interface RoomEnergyAudit {
  "EUI total": number;
  IAC: number;
  IACD: number;
  SHGCB: number;
  SHGCD: number;
  "U-value of fenestration": number;
  "U-value of roof": number;
  "U-value of wall": number;
  "air-conditioning power density": number;
  "equipment power density": number;
  "fenestration-to-wall ratio": number;
  "floor area": number;
  "infiltration rate": number;
  "lighting power density": number;
  "occupant density": number;
  "outdoor air temperature": number;
  "outdoor humidity ratio": number;
  "space air temperature": number;
  "space humidity ratio": number;
}

export interface RoomCoolingLoad {
  "total cooling load profile": HourlyProfile;
}

export interface AuditRoom {
  id: string;
  title: string;
  "cooling load": RoomCoolingLoad;
  "energy audit": RoomEnergyAudit;
}

export interface EnergyAuditCharacterizationOptimization {
  "Objective-Function-Value-(EUI)": number;
  "Optimal-Parameters": OptimalParameters;
  rooms: AuditRoom[];
}

// ---- Assumptions ----

export interface AuditAssumption {
  room: string;
  applied: string[];
}

// ---- Substitutions ----

export interface AuditSubstitution {
  room: string;
  substituted: string[];
}

// ---- Per-item audit result ----

export interface AuditResultItem {
  title: string;
  idx: string;
  substituted: boolean;
  "Cooling Load Calculation": CoolingLoadCalculation;
  "EV-Battery Sizing": EvBatterySizing;
  "Energy Audit, Characterization, Optimization": EnergyAuditCharacterizationOptimization;
  assumptions: AuditAssumption[];
  substitutions: AuditSubstitution[];
}

// ---- Result wrapper ----

export type AuditComputationStatus = "computed" | "pending" | "failed" | string;

export interface AuditResultData {
  computed_at: number; // unix timestamp (seconds, fractional)
  value: AuditResultItem[];
}

export interface AuditResult {
  data: AuditResultData;
  status: AuditComputationStatus;
}

// ---- Top-level payload (the "data" in the envelope) ----

export interface EnergyAuditResult {
  auditType: AuditType;
  result: AuditResult;
}

// ---- Full response envelope ----

export type EnergyAuditResponse = ApiEnvelope<EnergyAuditResult>;
