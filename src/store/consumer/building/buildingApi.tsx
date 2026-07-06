import { baseAPI } from "@/store/baseApi/baseApi";
import {
  GetAllBuildingTypesResponse,
  GetSingleBuildingTypeResponse,
} from "./types/buildingTypes";

export const buildingApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    creatingBuildingsTypes: build.mutation<void, { name: string }>({
      query: (buildingTypes) => ({
        url: "/buildings/types",
        method: "POST",
        body: buildingTypes,
      }),
      invalidatesTags: ["BuildingTypes"],
    }),
    creatingSubBuildingsTypes: build.mutation<
      void,
      {
        subType: string;
        building_type_id: string;
      }
    >({
      query: (subBuilding) => ({
        url: `/buildings/sub-buildings`,
        method: "POST",
        body: subBuilding,
      }),
      invalidatesTags: ["SubBuildingsTypes"],
    }),

    getAllBuildingsTypes: build.query<GetAllBuildingTypesResponse, void>({
      query: () => ({
        url: `/buildings/types`,
        method: "GET",
      }),
      providesTags: ["BuildingTypes"],
    }),
    getAllSubBuildingsTypes: build.query<GetSingleBuildingTypeResponse, string>(
      {
        query: (buildingTypeId) => ({
          url: `/buildings/types/${buildingTypeId}/sub-buildings`,
          method: "GET",
        }),
        providesTags: ["SubBuildingsTypes"],
      },
    ),
  }),
});

export const {
  useCreatingBuildingsTypesMutation,
  useCreatingSubBuildingsTypesMutation,
  useGetAllBuildingsTypesQuery,
  useGetAllSubBuildingsTypesQuery,
} = buildingApi;
