import { baseAPI } from "@/store/baseApi/baseApi";
import {
  AddAppliancePayload,
  ApplianceParams,
  GetApplianceCategoryResponse,
} from "./types/appliance";
export const applianceApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    addAppliance: build.mutation<void, AddAppliancePayload>({
      query: (appliance) => ({
        url: `/buildings/room/appliance`,
        method: "POST",
        body: appliance,
      }),
      invalidatesTags: ["Appliance"],
    }),
    addCustomAppliance: build.mutation<void, FormData>({
      query: (appliance) => ({
        url: `/buildings/appliances/custom`,
        method: "POST",
        body: appliance,
      }),
      invalidatesTags: ["Appliance"],
    }),
    updateAppliance: build.mutation<void, { room_id: string; building: any }>({
      query: ({ room_id, building }) => ({
        url: `buildings/room/${room_id}`,
        method: "PATCH",
        body: building,
      }),
      invalidatesTags: ["Room"],
    }),
    getApplianceCategory: build.query<
      GetApplianceCategoryResponse,
      ApplianceParams
    >({
      query: (params) => ({
        url: `/buildings/room/appliance-type/v2`,
        method: "GET",
        params,
      }),
      providesTags: ["Appliance"],
    }),
  }),
});

export const {
  useGetApplianceCategoryQuery,
  useUpdateApplianceMutation,
  useAddApplianceMutation,
  useAddCustomApplianceMutation,
} = applianceApi;
