import { baseAPI } from "@/store/baseApi/baseApi";
import { CreateAuditPayload, EnergyAuditResponse } from "./types/analysis";

export const analysisApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    startAudit: build.mutation<EnergyAuditResponse, CreateAuditPayload>({
      query: (audit) => ({
        url: `/analysis/v3/energy/audit`,
        method: "POST",
        body: audit,
      }),
      invalidatesTags: ["Audit"],
    }),
  }),
});

export const { useStartAuditMutation } = analysisApi;
