import BackButton from "@/common/button/BackButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonTabs from "@/common/button/CommonTabs";
import SearchInput from "@/common/form/SearchInput";
import SectionHeader from "@/common/header/SectionHeader";
import useDebounce from "@/common/useDebounce";
import {
  useAddEvMutation,
  useGetEvDatabaseQuery,
} from "@/store/consumer/basic/ev/EVApi";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // adjust to your router setup
import VehicleCard from "./card/VehicleCard";

const EVDatabase = () => {
  const { buildingId } = useParams<{ buildingId: string }>();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filter, setFilter] = useState("all");
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const { data, isLoading } = useGetEvDatabaseQuery({
    search: debouncedSearch,
    manufacturer: filter,
  });

  const BRAND_TABS =
    data?.data?.manufacturers?.map((brand) => ({
      label: brand.name,
      value: brand.key,
    })) ?? [];

  const vehicles = data?.data?.vehicles ?? [];

  const totalAdded = Object.values(quantities).reduce((a, b) => a + b, 0);

  const setQty = (id: string, value: number) =>
    setQuantities((q) => ({ ...q, [id]: value }));

  const [addVehicle, { isLoading: isAdding }] = useAddEvMutation();
  const navigate = useNavigate();
  const handleAdd = async () => {
    // if (!buildingId) return;

    const selected = vehicles.filter((v) => (quantities[v.vehicleId] ?? 0) > 0);

    if (selected.length === 0) return;

    try {
      await Promise.all(
        selected.map((vehicle) =>
          addVehicle({
            ...vehicle.add_vehicle_payload,
            buildingId: "97bc8736-ccb0-464e-89cb-3fc5290d1d15",
            noOfEvs: String(quantities[vehicle.vehicleId]),
          }).unwrap(),
        ),
      );
      setQuantities({});
      navigate(`../add-ev`);
    } catch (error) {
      console.error("Failed to add vehicles:", error);
    }
  };

  return (
    <div className=" space-y-6">
      <BackButton />

      <CommonBorderWrapper isShadow className="">
        <SectionHeader
          title="Electric Vehicle Database"
          description="Add electric vehicles to your building"
        />

        <div className="relative">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search electric vehicles..."
          />
        </div>

        <CommonTabs
          tabs={BRAND_TABS}
          activeTab={filter}
          onChange={setFilter}
          className="flex-wrap gap-2"
        />

        {isLoading && <SectionHeader title="Loading vehicles..." />}

        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {vehicles.map((v) => (
              <VehicleCard
                key={v.vehicleId}
                emoji={v.icon}
                name={v.title}
                battery={v.battery_capacity_label}
                range={v.vehicle_range_label}
                charging={v.charging_level}
                quantity={quantities[v.vehicleId] ?? 0}
                onQuantityChange={(value) => setQty(v.vehicleId, value)}
                min={0}
              />
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <CommonButton variant="outline" to="../custom-appliance">
            Upload Custom Appliance
          </CommonButton>

          <CommonButton
            disabled={totalAdded === 0}
            isLoading={isAdding}
            loadingText="Processing..."
            onClick={handleAdd}
          >
            Save ({totalAdded} vehicles)
          </CommonButton>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default EVDatabase;
