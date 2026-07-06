import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonTabs from "@/common/button/CommonTabs";
import SearchInput from "@/common/form/SearchInput";
import SectionHeader from "@/common/header/SectionHeader";
import {
  Filter,
  Laptop,
  Lightbulb,
  Microwave,
  Refrigerator,
  Snowflake,
  Tv,
  UtensilsCrossed,
} from "lucide-react";
import { useMemo, useState } from "react";
import ManagementCard, { Appliance, Category } from "./ManagementCard";
interface Room {
  id: string;
  name: string;
  subtitle: string;
  appliances: Appliance[];
}
const rooms: Room[] = [
  {
    id: "living-room",
    name: "Living Room",
    subtitle: "Living Room • 6 appliances",
    appliances: [
      {
        id: "lr-tv",
        name: 'TV 55"',
        category: "Entertainment",
        watts: 120,
        qty: 1,
        usageKwhDay: 0.96,
        icon: Tv,
      },
      {
        id: "lr-led",
        name: "LED Bulb",
        category: "Lighting",
        watts: 10,
        qty: 4,
        usageKwhDay: 0.2,
        icon: Lightbulb,
      },
      {
        id: "lr-ac",
        name: "Air Conditioner",
        category: "Cooling",
        watts: 3500,
        qty: 1,
        usageKwhDay: 8.4,
        icon: Snowflake,
      },
    ],
  },
  {
    id: "master-bedroom",
    name: "Master Bedroom",
    subtitle: "Bedroom • 4 appliances",
    appliances: [
      {
        id: "mb-led",
        name: "LED Bulb",
        category: "Lighting",
        watts: 10,
        qty: 2,
        usageKwhDay: 0.1,
        icon: Lightbulb,
      },
      {
        id: "mb-ac",
        name: "Air Conditioner",
        category: "Cooling",
        watts: 3500,
        qty: 1,
        usageKwhDay: 8.4,
        icon: Snowflake,
      },
      {
        id: "mb-laptop",
        name: "Laptop",
        category: "Office",
        watts: 65,
        qty: 1,
        usageKwhDay: 0.52,
        icon: Laptop,
      },
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    subtitle: "Kitchen • 5 appliances",
    appliances: [
      {
        id: "k-fridge",
        name: "Refrigerator",
        category: "Kitchen",
        watts: 150,
        qty: 1,
        usageKwhDay: 3.6,
        icon: Refrigerator,
      },
      {
        id: "k-microwave",
        name: "Microwave",
        category: "Kitchen",
        watts: 1200,
        qty: 1,
        usageKwhDay: 1.2,
        icon: Microwave,
      },
      {
        id: "k-dishwasher",
        name: "Dishwasher",
        category: "Kitchen",
        watts: 1800,
        qty: 1,
        usageKwhDay: 2.7,
        icon: UtensilsCrossed,
      },
      {
        id: "k-led",
        name: "LED Bulb",
        category: "Lighting",
        watts: 10,
        qty: 2,
        usageKwhDay: 0.1,
        icon: Lightbulb,
      },
    ],
  },
  {
    id: "office",
    name: "Office",
    subtitle: "Office • 4 appliances",
    appliances: [
      {
        id: "o-laptop",
        name: "Laptop",
        category: "Office",
        watts: 65,
        qty: 2,
        usageKwhDay: 1.04,
        icon: Laptop,
      },
      {
        id: "o-led",
        name: "LED Bulb",
        category: "Lighting",
        watts: 10,
        qty: 2,
        usageKwhDay: 0.1,
        icon: Lightbulb,
      },
    ],
  },
];

const filterOptions: Array<"All" | Category> = [
  "All",
  "Kitchen",
  "Cooling",
  "Laundry",
  "Lighting",
  "Entertainment",
  "Office",
];

const filterTabs = filterOptions.map((tab) => ({ label: tab, value: tab }));
const ApplianceInventory = () => {
  const [activeFilter, setActiveFilter] = useState<"All" | Category>("All");
  const [search, setSearch] = useState("");

  const filteredRooms = useMemo(() => {
    return rooms
      .map((room) => ({
        ...room,
        appliances: room.appliances.filter((a) => {
          const matchesFilter =
            activeFilter === "All" || a.category === activeFilter;
          const matchesSearch = a.name
            .toLowerCase()
            .includes(search.toLowerCase());
          return matchesFilter && matchesSearch;
        }),
      }))
      .filter((room) => room.appliances.length > 0);
  }, [activeFilter, search]);
  return (
    <CommonBorderWrapper isShadow className="">
      <div className=" flex items-center justify-between">
        <SectionHeader title="Appliance Inventory" />

        <CommonButton
          variant="ghost"
          showDefaultIcon={false}
          className="text-[#758179]! hover:text-white!"
        >
          <Filter className="w-4 h-4 " />
          Filters
        </CommonButton>
      </div>

      <div className="">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search appliances..."
        />

        <CommonTabs
          tabs={filterTabs}
          activeTab={activeFilter}
          onChange={(value) => setActiveFilter(value as "All" | Category)}
          className="flex-wrap gap-2 mt-4"
        />
      </div>

      <div className=" space-y-4">
        {filteredRooms.length === 0 && (
          <p className="text-sm text-slate-400 py-6 text-center">
            No appliances match your search.
          </p>
        )}
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-[#EAF7E6]/30 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <SectionHeader
                  size="xl"
                  title={room.name}
                  description={`${room.name} • ${room.appliances.length} appliances`}
                />
              </div>
              <CommonButton variant="ghost" showDefaultIcon>
                Add Appliances
              </CommonButton>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {room.appliances.map((a) => (
                <ManagementCard key={a.id} appliance={a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CommonBorderWrapper>
  );
};

export default ApplianceInventory;
