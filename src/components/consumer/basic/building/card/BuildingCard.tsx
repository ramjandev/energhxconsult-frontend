import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { Building2, Car, Users, Zap } from "lucide-react";
import BMiniCard from "./BMiniCard";

export interface BuildingType {
  id: number;
  name: string;
  type: string;
  subType: string;
  rooms: number;
  evs: number;
  energy: string;
  buildType: string;
  info?: string;
  address?: string;
}
interface BuildingCardProps {
  building: BuildingType;
}
const BuildingCard: React.FC<BuildingCardProps> = ({ building }) => {
  const stats = [
    {
      icon: Users,
      label: "Rooms",
      value: building.rooms,
      valueClassName: "text-xl",
    },
    { icon: Car, label: "EVs", value: building.evs, valueClassName: "text-xl" },
    {
      icon: Zap,
      label: "Energy Usage",
      value: building.energy,
      valueClassName: "text-base",
    },
    {
      icon: Building2,
      label: "Type",
      value: building.buildType,
      valueClassName: "text-sm",
    },
  ];
  return (
    <CommonBorderWrapper
      className="border-[#E7E9E8]! shadow-[0_1px_3px_0_rgba(0,0,0,0.10),0_1px_2px_-1px_rgba(0,0,0,0.10)] space-y-4
    "
    >
      <div className="flex items-start justify-between">
        <div>
          <CommonHeader size="xl">{building.name}</CommonHeader>
          <CommonHeader size="sm">
            <Building2 className="w-4 h-4" />
            {building.type} • {building.subType}
          </CommonHeader>
        </div>

        <CommonButton
          variant="outline"
          shape="rounded"
          to={`./building-details/${building.id}`}
        >
          View Details
        </CommonButton>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <BMiniCard key={stat.label} {...stat} />
        ))}
      </div>

      {building.info && (
        <div className="bg-primary-green/5 border border-primary-green/20 text-[#112518] text-sm p-4 rounded-lg ">
          {building.info}
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <CommonButton to="./add-room" showDefaultIcon>
          Add Room
        </CommonButton>

        <CommonButton variant="outline" to="./add-appliance" showDefaultIcon>
          Add Appliance
        </CommonButton>

        <CommonButton variant="outline" to="./manage-appliances">
          Manage All Appliances
        </CommonButton>
      </div>
    </CommonBorderWrapper>
  );
};

export default BuildingCard;
