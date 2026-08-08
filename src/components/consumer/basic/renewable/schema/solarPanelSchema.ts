import { z } from "zod";

export const solarPanelSchema = z
  .object({
    panel_type: z.string().default("Monocrystalline"),
    panel_wattage_w: z.coerce.number().positive().default(400),
    panel_efficiency: z.coerce.number().min(0).max(1).default(0.185),
    panel_count: z.coerce.number().int().positive().default(24),
  })
  .default({});

export const solarSiteSchema = z
  .object({
    daily_irradiance_kwh_m2_day: z.coerce.number().positive().default(4.4),
    azimuth_deg: z.coerce.number().min(0).max(360).default(180),
    tilt_deg: z.coerce.number().min(0).max(90).default(20),
    shading_factor: z.coerce.number().min(0).max(1).default(0.97),
  })
  .default({});

export const solarSystemSchema = z
  .object({
    performance_ratio: z.coerce.number().min(0).max(1).default(0.75),
    inverter_type: z.string().default("String"),
    battery_storage_kwh: z.coerce.number().min(0).default(0),
  })
  .default({});

export const solarFinanceSchema = z
  .object({
    system_cost: z.coerce.number().positive().default(18500),
    tax_credit_percentage: z.coerce.number().min(0).max(1).default(0.3),
    electricity_tariff_rate: z.coerce.number().positive().default(0.169),
    project_lifetime_years: z.coerce.number().int().positive().default(25),
  })
  .default({});

export const solarDemandSchema = z
  .object({
    annual_load_kwh: z.coerce.number().positive().default(14650),
  })
  .default({});

export const solarGridSchema = z
  .object({
    grid_emission_factor_kg_kwh: z.coerce.number().min(0).default(0.5),
  })
  .default({});

export const solarFormSchema = z.object({
  panel: solarPanelSchema,
  site: solarSiteSchema,
  system: solarSystemSchema,
  finance: solarFinanceSchema,
  demand: solarDemandSchema,
  grid: solarGridSchema,
});

export type SolarFormInput = z.input<typeof solarFormSchema>;

export type SolarFormValues = z.output<typeof solarFormSchema>;

export const defaultSolarValues: SolarFormValues = {
  panel: {
    panel_type: "Monocrystalline",
    panel_wattage_w: 400,
    panel_efficiency: 0.185,
    panel_count: 24,
  },
  site: {
    daily_irradiance_kwh_m2_day: 4.4,
    azimuth_deg: 180,
    tilt_deg: 20,
    shading_factor: 0.97,
  },
  system: {
    performance_ratio: 0.75,
    inverter_type: "String",
    battery_storage_kwh: 0,
  },
  finance: {
    system_cost: 18500,
    tax_credit_percentage: 0.3,
    electricity_tariff_rate: 0.169,
    project_lifetime_years: 25,
  },
  demand: {
    annual_load_kwh: 14650,
  },
  grid: {
    grid_emission_factor_kg_kwh: 0.5,
  },
};
