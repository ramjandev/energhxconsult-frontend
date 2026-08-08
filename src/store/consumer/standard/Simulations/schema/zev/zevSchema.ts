import { z } from "zod";

export const zevFormSchema = z.object({
  vehicleType: z.string().min(1, "Vehicle type is required"),
  batteryCapacityKwh: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be greater than 0"),
  dailyDistanceMiles: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be greater than 0"),
  vehicleClass: z.string().min(1, "Vehicle class is required"),
  chargingMethod: z.string().min(1, "Charging method is required"),
  numberOfChargingPorts: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .int("Must be a whole number")
    .positive("Must be greater than 0"),
  chargingDurationHoursPerDay: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be greater than 0")
    .max(24, "Cannot exceed 24 hours"),
  expectedStationUptimePercent: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Cannot be negative")
    .max(100, "Cannot exceed 100%"),
  averageWaitingTimeMinutes: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .min(0, "Cannot be negative"),
  energyTariffPerKwh: z.coerce
    .number({ invalid_type_error: "Must be a number" })
    .positive("Must be greater than 0"),
});

export type ZevFormValues = z.infer<typeof zevFormSchema>;

export const zevFormDefaultValues: ZevFormValues = {
  vehicleType: "sedan",
  batteryCapacityKwh: 75,
  dailyDistanceMiles: 50,
  vehicleClass: "Passenger",
  chargingMethod: "level2",
  numberOfChargingPorts: 12,
  chargingDurationHoursPerDay: 8,
  expectedStationUptimePercent: 98,
  averageWaitingTimeMinutes: 12,
  energyTariffPerKwh: 0.15,
};
