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
    <CommonBorderWrapper isShadow>
      <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
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
          className="w-full sm:w-auto"
        >
          View Details
        </CommonButton>
      </div>

      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
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
        <CommonButton
          to="./add-room"
          showDefaultIcon
          className="w-full sm:w-auto"
        >
          Add Room
        </CommonButton>

        <CommonButton
          variant="outline"
          to="./add-appliance"
          showDefaultIcon
          className="w-full sm:w-auto"
        >
          Add Appliance
        </CommonButton>

        <CommonButton
          variant="outline"
          to="./manage-appliances"
          className="w-full sm:w-auto"
        >
          Manage All Appliances
        </CommonButton>
      </div>
    </CommonBorderWrapper>
  );
};

export default BuildingCard;
