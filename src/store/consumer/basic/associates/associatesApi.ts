import { baseAPI } from "@/store/baseApi/baseApi";
import {
  AssignAssociatePayload,
  GetAssociatesParams,
  GetAssociatesResponse,
} from "./types/associates";

export const associatesApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAssociates: build.query<GetAssociatesResponse, GetAssociatesParams>({
      query: (params) => ({
        url: `/users/associates`,
        method: "GET",
        params,
      }),
      providesTags: ["Associates"],
    }),
    selectAssociates: build.mutation<void, AssignAssociatePayload>({
      query: (associates) => ({
        url: `/users/associates/select`,
        method: "POST",
        body: associates,
      }),
      invalidatesTags: ["Associates"],
    }),
  }),
});

export const { useGetAssociatesQuery, useSelectAssociatesMutation } =
  associatesApi;
