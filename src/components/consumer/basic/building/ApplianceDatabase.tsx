import BackButton from "@/common/button/BackButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonTabs from "@/common/button/CommonTabs";
import SearchInput from "@/common/form/SearchInput";
import SectionHeader from "@/common/header/SectionHeader";
import { useState } from "react";
import ApplianceCard from "./card/ApplianceCard";

export interface Appliance {
  id: number;
  name: string;
  category: string;
  power: string;
  icon: string;
}

const APPLIANCES: Appliance[] = [
  {
    id: 1,
    name: "Refrigerator",
    category: "Kitchen",
    power: "150W",
    icon: "🧊",
  },
  { id: 2, name: "Microwave", category: "Kitchen", power: "1200W", icon: "📦" },
  {
    id: 3,
    name: "Dishwasher",
    category: "Kitchen",
    power: "1800W",
    icon: "🍽️",
  },
  {
    id: 4,
    name: "Air Conditioner",
    category: "Cooling",
    power: "3500W",
    icon: "❄️",
  },
  { id: 5, name: "Ceiling Fan", category: "Cooling", power: "75W", icon: "💨" },
  {
    id: 6,
    name: "Washing Machine",
    category: "Laundry",
    power: "500W",
    icon: "🫧",
  },
  { id: 7, name: "Dryer", category: "Laundry", power: "3000W", icon: "🔥" },
  { id: 8, name: "LED Bulb", category: "Lighting", power: "10W", icon: "💡" },
  {
    id: 9,
    name: 'TV 55"',
    category: "Entertainment",
    power: "120W",
    icon: "📺",
  },
  { id: 10, name: "Laptop", category: "Office", power: "65W", icon: "💻" },
];

const CATEGORIES = [
  "All",
  "Kitchen",
  "Cooling",
  "Laundry",
  "Lighting",
  "Entertainment",
  "Office",
];

const CATEGORY_TABS = CATEGORIES.map((category) => ({
  label: category,
  value: category,
}));

const ApplianceDatabase = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const visible = APPLIANCES.filter(
    (a) =>
      (filter === "All" || a.category === filter) &&
      a.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalAdded = Object.values(quantities).reduce((a, b) => a + b, 0);

  const setQty = (id: number, value: number) =>
    setQuantities((q) => ({ ...q, [id]: value }));

  return (
    <div className="space-y-6">
      <BackButton />
      <CommonBorderWrapper isShadow>
        <SectionHeader
          title="Appliance Database"
          description="Search and add appliances to your room"
        />

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search appliances..."
        />

        <CommonTabs
          tabs={CATEGORY_TABS}
          activeTab={filter}
          onChange={setFilter}
          className="flex-wrap gap-2"
        />

        {/* Grid */}
        <div className="grid grid-cols-3 gap-3">
          {visible.map((a) => (
            <ApplianceCard
              key={a.id}
              emoji={a.icon}
              name={a.name}
              category={a.category}
              power={a.power}
              quantity={quantities[a.id] ?? 0}
              onQuantityChange={(value) => setQty(a.id, value)}
              min={0}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <CommonButton variant="outline" to="../custom-appliance">
            Upload Custom Appliance
          </CommonButton>

          <CommonButton type="submit">
            Save ({totalAdded} appliances)
          </CommonButton>
        </div>
      </CommonBorderWrapper>
    </div>
  );
};

export default ApplianceDatabase;
