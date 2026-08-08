import { baseAPI } from "@/store/baseApi/baseApi";
import {
  GetFvmSimulationResponse,
  RunFvmSimulationPayload,
  UpdateFvmSimulationPayload,
} from "./types/fvm/fvm";
import {
  GetNzebSimulationResponse,
  RunNzebSimulationPayload,
  UpdateNzebSimulationPayload,
} from "./types/nzeb/nzeb";
import {
  GetZevSimulationResponse,
  RunZevSimulationPayload,
  UpdateZevSimulationPayload,
} from "./types/zev/zev";

export const simulationApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    // ---------- ZEV ----------
    getZevSimulation: build.query<GetZevSimulationResponse, void>({
      query: () => ({
        url: "/workflows/consumer/standard/simulations/zev",
        method: "GET",
      }),
      providesTags: ["ZevSimulation"],
    }),
    updateZevSimulation: build.mutation<void, UpdateZevSimulationPayload>({
      query: (payload) => ({
        url: "/workflows/consumer/standard/simulations/zev",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["ZevSimulation"],
    }),
    runZevSimulation: build.mutation<void, RunZevSimulationPayload>({
      query: (payload) => ({
        url: "/analysis/zev/simulation",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["ZevSimulation"],
    }),

    // ---------- NZEB ----------
    getNzebSimulation: build.query<GetNzebSimulationResponse, void>({
      query: () => ({
        url: "/workflows/consumer/standard/simulations/nzeb",
        method: "GET",
      }),
      providesTags: ["NzebSimulation"],
    }),
    updateNzebSimulation: build.mutation<void, UpdateNzebSimulationPayload>({
      query: (payload) => ({
        url: "/workflows/consumer/standard/simulations/nzeb",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["NzebSimulation"],
    }),
    runNzebSimulation: build.mutation<void, RunNzebSimulationPayload>({
      query: (payload) => ({
        url: "/analysis/nzeb/simulation",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["NzebSimulation"],
    }),
    // ---------- FVM ----------
    getFVMSimulation: build.query<GetFvmSimulationResponse, void>({
      query: () => ({
        url: "/workflows/consumer/standard/simulations/thermal-comfort",
        method: "GET",
      }),
      providesTags: ["FVMSimulation"],
    }),
    updateFVMSimulation: build.mutation<void, UpdateFvmSimulationPayload>({
      query: (payload) => ({
        url: "/workflows/consumer/standard/simulations/thermal-comfort",
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["FVMSimulation"],
    }),
    runFVMSimulation: build.mutation<void, RunFvmSimulationPayload>({
      query: (payload) => ({
        url: "/analysis/fvm/simulate",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["FVMSimulation"],
    }),
  }),
});

export const {
  // ---------- ZEV ----------
  useGetZevSimulationQuery,
  useUpdateZevSimulationMutation,
  useRunZevSimulationMutation,

  // ---------- NZEB ----------
  useGetNzebSimulationQuery,
  useUpdateNzebSimulationMutation,
  useRunNzebSimulationMutation,

  // ---------- FVM ----------
  useGetFVMSimulationQuery,
  useUpdateFVMSimulationMutation,
  useRunFVMSimulationMutation,
} = simulationApi;
