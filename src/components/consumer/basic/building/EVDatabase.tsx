import BackButton from "@/common/button/BackButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonTabs from "@/common/button/CommonTabs";
import SearchInput from "@/common/form/SearchInput";
import SectionHeader from "@/common/header/SectionHeader";
import { useState } from "react";
import VehicleCard from "./card/VehicleCard";

export interface Vehicle {
  id: number;
  brand: string;
  name: string;
  battery: string;
  range: string;
  charging: string;
  icon: string;
}

const VEHICLES: Vehicle[] = [
  {
    id: 1,
    brand: "Tesla",
    name: "Tesla Model 3",
    battery: "75 kWh",
    range: "358 mi",
    charging: "Level 2/DC",
    icon: "🚗",
  },
  {
    id: 2,
    brand: "Tesla",
    name: "Tesla Model Y",
    battery: "82 kWh",
    range: "330 mi",
    charging: "Level 2/DC",
    icon: "🚙",
  },
  {
    id: 3,
    brand: "Nissan",
    name: "Nissan Leaf",
    battery: "62 kWh",
    range: "226 mi",
    charging: "Level 2",
    icon: "🚗",
  },
  {
    id: 4,
    brand: "Chevrolet",
    name: "Chevrolet Bolt EV",
    battery: "66 kWh",
    range: "259 mi",
    charging: "Level 2/DC",
    icon: "🚗",
  },
  {
    id: 5,
    brand: "BMW",
    name: "BMW i4",
    battery: "84 kWh",
    range: "301 mi",
    charging: "Level 2/DC",
    icon: "🚗",
  },
  {
    id: 6,
    brand: "Ford",
    name: "Ford Mustang Mach-E",
    battery: "88 kWh",
    range: "314 mi",
    charging: "Level 2/DC",
    icon: "🚙",
  },
];

const BRANDS = ["All", "Tesla", "Nissan", "Chevrolet", "BMW", "Ford"];

// ─── EV DATABASE PAGE ─────────────────────────────────────────────────────────
const BRAND_TABS = BRANDS.map((brand) => ({
  label: brand,
  value: brand,
}));
const EVDatabase = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<number, number>>({
    1: 1,
  });

  const visible = VEHICLES.filter(
    (v) =>
      (filter === "All" || v.brand === filter) &&
      v.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalAdded = Object.values(quantities).reduce((a, b) => a + b, 0);

  const setQty = (id: number, value: number) =>
    setQuantities((q) => ({ ...q, [id]: value }));

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {visible.map((v) => (
            <VehicleCard
              key={v.id}
              emoji={v.icon}
              name={v.name}
              battery={v.battery}
              range={v.range}
              charging={v.charging}
              quantity={quantities[v.id] ?? 0}
              onQuantityChange={(value) => setQty(v.id, value)}
              min={0}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-1">
          <CommonButton variant="outline" to="../custom-appliance">
            Upload Custom Appliance
          </CommonButton>

          <CommonButton type="submit">
            Save ({totalAdded} vehicles)
          </CommonButton>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default EVDatabase;
