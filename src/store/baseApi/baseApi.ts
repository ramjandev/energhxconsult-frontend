import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";
import { RootState } from "../store";

// Original baseQueryAPI
const baseQueryAPI = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  // credentials: "include", // sends the httpOnly refresh-token cookie
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithToasts: typeof baseQueryAPI = async (
  args,
  api,
  extraOptions: any,
) => {
  const result = await baseQueryAPI(args, api, extraOptions);

  const method =
    typeof args === "object" && "method" in args ? args.method : "GET";

  if (method !== "GET") {
    if (
      result?.data &&
      typeof result.data === "object" &&
      "message" in result.data
    ) {
      const message = (result.data as { message?: string }).message;
      if (message && !extraOptions?.silent) {
        if (method === "DELETE") {
          toast.warning(message);
        } else {
          toast.success(message);
        }
      }
    }

    if (result?.error) {
      const errorData = result.error.data as {
        message?: string;
        error?: string;
      };
      const isSessionExpired =
        result.error.status === 401 && errorData?.error === "Unauthorized";

      if (isSessionExpired) {
      } else {
        toast.error(
          errorData?.message || "Something went wrong. Please try again.",
        );
      }
    }
  }

  return result;
};

export const baseAPI = createApi({
  reducerPath: "baseAPI",
  baseQuery: baseQueryWithToasts,
  tagTypes: [
    "Program",
    "Course",
    "Content",
    "Module",
    "BasicContent",
    "Quiz",
    "Review",
    "Payment",
    "Admin",
    "Country",
    "State",
    "User",
    "Buildings",
    "Room",
    "EV",
    "BuildingTypes",
    "SubBuildingsTypes",
    "Progress",
    "Appliance",
    "Associates",
    "Audit",
    "ZevSimulation",
    "NzebSimulation",
    "Dashboard",
    "FVMSimulation",
  ],

  endpoints: () => ({}),
});
