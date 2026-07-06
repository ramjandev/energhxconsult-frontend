import ActionButton from "@/common/button/ActionButton";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import React from "react";

interface RoomCardProps {
  room: {
    id: number;
    name: string;
    type: string;
    appliances: number;
    usage: string;
  };
}
const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-[#EAF7E6]/30 rounded-xl p-4 border border-[#E7E9E8]">
      <div className="flex items-start justify-between space-y-3 ">
        <div className="space-y-3">
          <div>
            <CommonHeader className="font-bold!">{room.name}</CommonHeader>
            <CommonHeader size="sm">{room.type}</CommonHeader>
          </div>
          <div>
            <CommonHeader size="sm">Appliances</CommonHeader>
            <CommonHeader size="md" className="font-bold! text-[#112518]!">
              {room.appliances}
            </CommonHeader>
          </div>
        </div>
        <div className="  self-end">
          <CommonHeader size="sm">Estimated Usage</CommonHeader>
          <CommonHeader size="md" className="font-bold! text-[#112518]!">
            {room.usage}
          </CommonHeader>
        </div>
        <div className="flex items-center gap-2 ">
          <ActionButton type="edit" />
          <ActionButton type="delete" />
        </div>
      </div>

      <CommonButton
        size="sm"
        to="../add-appliance"
        showDefaultIcon
        className="w-full"
      >
        Add Appliances
      </CommonButton>
    </div>
  );
};

export default RoomCard;
