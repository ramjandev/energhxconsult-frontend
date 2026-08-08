import { z } from "zod";

export const windResourceSchema = z
  .object({
    mean_wind_speed_ms: z.coerce.number().min(0).default(5.5),
    measurement_height_m: z.coerce.number().min(0).default(10),
    weibull_k: z.coerce.number().min(0).default(2),
    air_density_kg_m3: z.coerce.number().min(0).default(1.225),
    turbulence_intensity: z.coerce.number().min(0).default(0.098),
    terrain_roughness_class: z.coerce.number().min(0).default(2),
    nearest_obstacle_height_m: z.coerce.number().min(0).default(8),
    nearest_obstacle_distance_m: z.coerce.number().min(0).default(250),
  })
  .default({});

export const turbineSchema = z
  .object({
    turbine_type: z.string().default("Horizontal Axis"),
    rotor_diameter_m: z.coerce.number().min(0).default(6.2),
    hub_height_m: z.coerce.number().min(0).default(18),
    rated_power_kw: z.coerce.number().min(0).default(5),
    power_coefficient_cp: z.coerce.number().min(0).max(1).default(0.4),
    cut_in_speed_ms: z.coerce.number().min(0).default(3.5),
    cut_out_speed_ms: z.coerce.number().min(0).default(25),
    system_efficiency: z.coerce.number().min(0).max(1).default(0.857),
  })
  .default({});

export const systemSchema = z
  .object({
    turbine_count: z.coerce.number().int().min(1).default(1),
  })
  .default({});

export const demandSchema = z
  .object({
    monthly_energy_kwh: z.coerce.number().min(0).default(1520),
    annual_energy_kwh: z.coerce.number().min(0).default(18250),
  })
  .default({});

export const operatingSchema = z
  .object({
    annual_operating_hours: z.coerce.number().min(0).default(8760),
    availability_factor: z.coerce.number().min(0).max(1).default(1),
  })
  .default({});

export const financialSchema = z
  .object({
    system_cost: z.coerce.number().min(0).default(15200),
    tax_credit_percentage: z.coerce.number().min(0).max(1).default(0.3),
    electricity_tariff_rate: z.coerce.number().min(0).default(0.168),
    om_cost_annual: z.coerce.number().min(0).default(200),
    project_lifetime_years: z.coerce.number().int().min(1).default(25),
  })
  .default({});

export const gridSchema = z
  .object({
    connection_type: z.string().default("Grid-Tied with Net Metering"),
    emissions_factor_kg_co2_per_kwh: z.coerce.number().min(0).default(0.5),
    kg_co2_absorbed_per_tree_year: z.coerce.number().min(0).default(21.8),
  })
  .default({});

export const windFormSchema = z.object({
  wind_resource: windResourceSchema,
  turbine: turbineSchema,
  system: systemSchema,
  demand: demandSchema,
  operating: operatingSchema,
  financial: financialSchema,
  grid: gridSchema,
});

export type WindFormInput = z.input<typeof windFormSchema>;
export type WindFormValues = z.output<typeof windFormSchema>;

export const defaultWindValues: WindFormValues = {
  wind_resource: {
    mean_wind_speed_ms: 5.5,
    measurement_height_m: 10,
    weibull_k: 2,
    air_density_kg_m3: 1.225,
    turbulence_intensity: 0.098,
    terrain_roughness_class: 2,
    nearest_obstacle_height_m: 8,
    nearest_obstacle_distance_m: 250,
  },
  turbine: {
    turbine_type: "Horizontal Axis",
    rotor_diameter_m: 6.2,
    hub_height_m: 18,
    rated_power_kw: 5,
    power_coefficient_cp: 0.4,
    cut_in_speed_ms: 3.5,
    cut_out_speed_ms: 25,
    system_efficiency: 0.857,
  },
  system: {
    turbine_count: 1,
  },
  demand: {
    monthly_energy_kwh: 1520,
    annual_energy_kwh: 18250,
  },
  operating: {
    annual_operating_hours: 8760,
    availability_factor: 1,
  },
  financial: {
    system_cost: 15200,
    tax_credit_percentage: 0.3,
    electricity_tariff_rate: 0.168,
    om_cost_annual: 200,
    project_lifetime_years: 25,
  },
  grid: {
    connection_type: "Grid-Tied with Net Metering",
    emissions_factor_kg_co2_per_kwh: 0.5,
    kg_co2_absorbed_per_tree_year: 21.8,
  },
};
