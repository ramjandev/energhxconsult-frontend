import { baseAPI } from "@/store/baseApi/baseApi";
import { ConsumerWorkflow } from "../Simulations/types/dashboard";
import { UtilityConsentPayload } from "./types/potentiall";

export const simulationApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getDashboard: build.query<ConsumerWorkflow, void>({
      query: () => ({
        url: "/workflows/consumer/standard/status",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    utilityPermissions: build.mutation<void, UtilityConsentPayload>({
      query: () => ({
        url: "/workflows/consumer/standard/utility-permission",
        method: "POST",
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetDashboardQuery, useUtilityPermissionsMutation } =
  simulationApi;
