export interface ApplianceCategory {
  category_id: string | null;
  name: string;
  key: string;
}

export interface AppliancePagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApplianceFilters {
  search: string | null;
  category: string | null;
  categoryId: string | null;
}

export interface AddAppliancePayload {
  typeId: string;
  applianceId: string;
  powerRating: string;
  noOfAppliances: string;
  latentHeat: string;
  sensibleHeat: string;
  roomId: string;
}

export interface ApplianceManufacturer {
  manufacturer_id: string;
  name: string;
  location_id: string;
  website: string | null;
}

export interface Appliance {
  appliance_id: string;
  applianceId: string;
  typeId: string;
  name: string;
  min_consumption: string;
  max_consumption: string;
  powerRating: string;
  latentHeat: string;
  sensibleHeat: string;
  add_appliance_payload: AddAppliancePayload;
  image_url: string | null;
  voltage: string | null;
  energy_rating: string | null;
  category_id: string;
  category_key: string;
  category_name: string;
  category: ApplianceCategory;
  manufacturer_id: string;
  manufacturer_name: string;
  manufacturer: ApplianceManufacturer;
}

export interface ApplianceTypesData {
  appliances: Appliance[];
  categories: ApplianceCategory[];
  pagination: AppliancePagination;
  filters: ApplianceFilters;
}

export interface GetApplianceCategoryResponse {
  status: number;
  message: string;
  data: ApplianceTypesData;
}

export interface ApplianceParams {
  search?: string | null;
  q?: string | null;
  category?: string | null;
  categoryKey?: string | null;
  categoryId?: string | null;
  page?: number;
  limit?: number;
}
