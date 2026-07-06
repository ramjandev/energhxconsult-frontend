import ActionButton from "@/common/button/ActionButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";
import BMiniCard from "./card/BMiniCard";
import RoomCard from "./room/RoomCard";
const DEMO_ROOMS = [
  {
    id: 1,
    name: "Living Room",
    type: "Living Room",
    appliances: 12,
    usage: "340 kWh/month",
  },
  {
    id: 2,
    name: "Master Bedroom",
    type: "Bedroom",
    appliances: 8,
    usage: "180 kWh/month",
  },
  {
    id: 3,
    name: "Kitchen",
    type: "Kitchen",
    appliances: 15,
    usage: "520 kWh/month",
  },
  {
    id: 4,
    name: "Office",
    type: "Office",
    appliances: 6,
    usage: "210 kWh/month",
  },
];

const BuildingDetails = () => {
  const b = {
    name: "Ramjan's Building",
    type: "Bungalow",
    subType: "Software, USA",
    rooms: 8,
    evs: 4,
    energy: "2,340 kWh/month",
    buildType: "Concrete Building",
  };

  return (
    <div className=" space-y-4">
      <CommonBorderWrapper isShadow>
        <div className="flex items-start justify-between">
          <div>
            <CommonHeader size="xl">{b.name}</CommonHeader>
            <CommonHeader size="sm">
              {b.type} • {b.subType}
            </CommonHeader>
          </div>
          <div>
            <ActionButton type="edit" />
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 ">
          {[
            { label: "Total Rooms", value: "8" },
            { label: "Appliances", value: "41" },
            { label: "Electric Vehicles", value: "4" },
            { label: "Total Energy", value: "1,250 kWh" },
          ].map((s) => (
            <BMiniCard key={s.label} label={s.label} value={s.value} />
          ))}
        </div>
        <div className="flex justify-between gap-2 mt-4">
          <CommonButton to="../add-room" showDefaultIcon>
            Add Room
          </CommonButton>

          <CommonButton variant="outline" to="../add-ev" showDefaultIcon>
            Add Electric Vehicles{" "}
          </CommonButton>
        </div>
      </CommonBorderWrapper>

      <div>
        <SectionHeader title="Rooms" />
        <div className="space-y-4">
          {DEMO_ROOMS.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuildingDetails;
