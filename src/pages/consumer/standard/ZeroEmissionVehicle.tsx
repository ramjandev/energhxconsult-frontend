import CommonButton from "@/common/button/CommonButton";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import OptimizationRecommendations from "@/components/consumer/standard/commodity/setup/OptimizationRecommendations";
import VehicleChargingConfiguration from "@/components/consumer/standard/commodity/setup/VehicleChargingConfiguration";
import FooterActions from "@/components/consumer/standard/commodity/zev/FooterActions";
import SimulationResults from "@/components/consumer/standard/commodity/zev/SimulationResults";

import {
  zevFormDefaultValues,
  zevFormSchema,
  ZevFormValues,
} from "@/store/consumer/standard/Simulations/schema/zev/zevSchema";
import {
  useGetZevSimulationQuery,
  useUpdateZevSimulationMutation,
} from "@/store/consumer/standard/Simulations/simulationApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Car } from "lucide-react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const ZeroEmissionVehicle: React.FC = () => {
  const { data, isFetching } = useGetZevSimulationQuery();
  const [updateZevSimulation, { isLoading: isSaving }] =
    useUpdateZevSimulationMutation();

  const form = useForm<ZevFormValues>({
    resolver: zodResolver(zevFormSchema),
    defaultValues: zevFormDefaultValues,
  });

  // Populate the form once existing workflow data arrives
  useEffect(() => {
    if (!data?.zev) return;
    const { vehicleConfiguration: v, chargingConfiguration: c } = data.zev;
    form.reset({
      vehicleType: v.vehicleType,
      batteryCapacityKwh: v.batteryCapacityKwh,
      dailyDistanceMiles: v.dailyDistanceMiles,
      vehicleClass: v.vehicleClass,
      chargingMethod: c.chargingMethod,
      numberOfChargingPorts: c.numberOfChargingPorts,
      chargingDurationHoursPerDay: c.chargingDurationHoursPerDay,
      expectedStationUptimePercent: c.expectedStationUptimePercent,
      averageWaitingTimeMinutes: c.averageWaitingTimeMinutes,
      energyTariffPerKwh: c.energyTariffPerKwh,
    });
  }, [data, form]);

  const onRunSimulation = form.handleSubmit(async (values) => {
    const simulationInput = {
      stationUptime: values.expectedStationUptimePercent,
      vehicleUptime: 0.9,
      chargingTime: values.chargingDurationHoursPerDay,
      energyDelivered: values.batteryCapacityKwh,
      tariff: values.energyTariffPerKwh,
      income: 25,
      stationDensity: values.numberOfChargingPorts,
      waitingTime: values.averageWaitingTimeMinutes,
    };

    try {
      await updateZevSimulation({
        status: "COMPLETED",
        zev: {
          vehicleConfiguration: {
            vehicleType: values.vehicleType,
            batteryCapacityKwh: values.batteryCapacityKwh,
            dailyDistanceMiles: values.dailyDistanceMiles,
            vehicleClass: values.vehicleClass,
          },
          chargingConfiguration: {
            chargingMethod: values.chargingMethod,
            numberOfChargingPorts: values.numberOfChargingPorts,
            chargingDurationHoursPerDay: values.chargingDurationHoursPerDay,
            expectedStationUptimePercent: values.expectedStationUptimePercent,
            averageWaitingTimeMinutes: values.averageWaitingTimeMinutes,
            energyTariffPerKwh: values.energyTariffPerKwh,
          },
          simulationInput,
          simulationResults: data?.zev?.simulationResults ?? {
            chargingCost: 0,
            monthlyChargingCost: 0,
            energyDemandKwhPerDay: 0,
            vehicleUptimePercent: 0,
            batteryUtilizationPercent: 0,
            annualSavings: 0,
          },
          charts: data?.zev?.charts ?? {
            dailyChargingPattern: [],
            chargingStationUtilization: {
              chargingPercent: 0,
              idlePercent: 0,
              maintenancePercent: 0,
            },
            sixMonthEnergyCostTrends: [],
          },
          recommendations: data?.zev?.recommendations ?? [],
        },
      }).unwrap();
    } catch (err) {
      console.error("ZEV save failed", err);
    }
  });

  return (
    <div className="space-y-6">
      <Welcome
        title="Zero Emission Vehicle (ZEV)"
        description="Advanced vehicle charging simulation and optimization"
        className="border-[#155DFC]/20 bg-gradient-to-r from-[#155DFC]/10 to-[#0092B8]/10!"
        Icons={Car}
        iconColor="text-[#155DFC]"
        iconBg="bg-[#155DFC]/10"
      />
      <Welcome
        title="Utility Data Connection Required"
        description="Connect your utility provider to automatically import electricity and
          gas consumption data."
        variant="secondary"
        isConnected
        actions={
          <CommonButton variant="primaryBlue" className="">
            Request Permission
          </CommonButton>
        }
      />
      <VehicleChargingConfiguration form={form} />
      <SimulationResults
        results={data?.zev?.simulationResults}
        charts={data?.zev?.charts}
        onRunSimulation={onRunSimulation}
        isRunning={isSaving || isFetching}
      />
      <OptimizationRecommendations />
      <FooterActions
        backText="Back to Dashboard"
        continueText="Continue to NZEB Analysis"
        to="../nzeb"
      />
    </div>
  );
};

export default ZeroEmissionVehicle;
