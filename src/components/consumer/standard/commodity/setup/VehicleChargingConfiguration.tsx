import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonSelect from "@/common/button/CommonSelect";
import SectionHeader from "@/common/header/SectionHeader";
import { inputClass } from "@/pages/Login";
import { ZevFormValues } from "@/store/consumer/standard/Simulations/schema/zev/zevSchema";
import { AlertCircle } from "lucide-react";
import { Controller, UseFormReturn } from "react-hook-form";

const VEHICLE_TYPES = [
  { label: "Sedan", value: "sedan" },
  { label: "SUV", value: "suv" },
  { label: "Truck", value: "truck" },
  { label: "Van", value: "van" },
];

const CHARGING_METHODS = [
  { label: "Level 1 (120V)", value: "level1" },
  { label: "Level 2 (240V)", value: "level2" },
  { label: "DC Fast Charging", value: "dcfc" },
];

interface Props {
  form: UseFormReturn<ZevFormValues>;
}

const VehicleChargingConfiguration = ({ form }: Props) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = form;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Vehicle Configuration" />
        <div className="space-y-5">
          <div>
            <label className={inputClass.label}>Vehicle Type</label>
            <Controller
              control={control}
              name="vehicleType"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={VEHICLE_TYPES}
                  placeholder="select"
                  className="w-full"
                />
              )}
            />
            {errors.vehicleType && (
              <p className="text-sm text-red-500 mt-1">
                {errors.vehicleType.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Battery Capacity (kWh)</label>
            <input
              type="text"
              className={inputClass.input}
              {...register("batteryCapacityKwh")}
            />
            {errors.batteryCapacityKwh && (
              <p className="text-sm text-red-500 mt-1">
                {errors.batteryCapacityKwh.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Daily Distance (miles)</label>
            <input
              type="text"
              className={inputClass.input}
              {...register("dailyDistanceMiles")}
            />
            {errors.dailyDistanceMiles && (
              <p className="text-sm text-red-500 mt-1">
                {errors.dailyDistanceMiles.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Vehicle Class</label>
            <input
              type="text"
              className={inputClass.input}
              {...register("vehicleClass")}
            />
            {errors.vehicleClass && (
              <p className="text-sm text-red-500 mt-1">
                {errors.vehicleClass.message}
              </p>
            )}
          </div>
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow>
        <SectionHeader size="xl" title="Charging Configuration" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 ">
          <div>
            <label className={inputClass.label}>Charging Method</label>
            <Controller
              control={control}
              name="chargingMethod"
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={CHARGING_METHODS}
                  placeholder="select"
                  className="w-full"
                />
              )}
            />
            {errors.chargingMethod && (
              <p className="text-sm text-red-500 mt-1">
                {errors.chargingMethod.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>Number of Charging Ports</label>
            <input
              type="text"
              className={inputClass.input}
              {...register("numberOfChargingPorts")}
            />
            {errors.numberOfChargingPorts && (
              <p className="text-sm text-red-500 mt-1">
                {errors.numberOfChargingPorts.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>
              Charging Duration (hours/day)
            </label>
            <input
              type="text"
              className={inputClass.input}
              {...register("chargingDurationHoursPerDay")}
            />
            {errors.chargingDurationHoursPerDay && (
              <p className="text-sm text-red-500 mt-1">
                {errors.chargingDurationHoursPerDay.message}
              </p>
            )}
          </div>

          <div>
            <label className={inputClass.label}>
              Expected Station Uptime (%)
            </label>
            <input
              type="text"
              className={inputClass.input}
              {...register("expectedStationUptimePercent")}
            />
            {errors.expectedStationUptimePercent && (
              <p className="text-sm text-red-500 mt-1">
                {errors.expectedStationUptimePercent.message}
              </p>
            )}
          </div>
        </div>

        <p className="text-sm font-semibold text-primary ">
          Average Waiting Time: {watch("averageWaitingTimeMinutes")} min
        </p>
        <input type="hidden" {...register("averageWaitingTimeMinutes")} />

        <div className="">
          <label className={inputClass.label}>Energy Tariff ($/kWh)</label>
          <input
            type="text"
            className={inputClass.input}
            {...register("energyTariffPerKwh")}
          />
          {errors.energyTariffPerKwh && (
            <p className="text-sm text-red-500 mt-1">
              {errors.energyTariffPerKwh.message}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-[#EFF6FF] border border-[#BEDBFF] p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <SectionHeader
              size="md"
              title="Off-Peak Charging Recommended"
              description="Save up to 40% by charging between 11PM-7AM"
            />
          </div>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default VehicleChargingConfiguration;
