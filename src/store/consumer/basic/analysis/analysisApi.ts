import { baseAPI } from "@/store/baseApi/baseApi";
import { CreateAuditPayload, EnergyAuditResponse } from "./types/analysis";

export interface SendEnergyAuditReportPayload {
  file: File;
  email: string;
}

export interface SendEnergyAuditReportResponse {
  message: string;
}

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

    sendEnergyAuditReport: build.mutation<
      SendEnergyAuditReportResponse,
      SendEnergyAuditReportPayload
    >({
      query: ({ file, email }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("email", email);

        return {
          url: `/analysis/energy/audit/report`,
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { useStartAuditMutation, useSendEnergyAuditReportMutation } =
  analysisApi;
