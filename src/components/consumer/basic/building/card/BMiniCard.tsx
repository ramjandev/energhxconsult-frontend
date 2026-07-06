import CommonHeader from "@/common/header/CommonHeader";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon?: LucideIcon;
  label: string;

  value: string | number;
  valueClass?: string;
  des?: string;
  className?: string;
  iconColorClassName?: string;
  iconBgClassName?: string;
}

const BMiniCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  valueClass,
  des,
  className = "",
  iconColorClassName = "text-primary-green",
  iconBgClassName,
}) => {
  return (
    <div className={`bg-[#EAF7E6]/30 rounded-xl p-5 space-y-3 ${className}`}>
      <div className={`flex items-center gap-2 `}>
        {Icon && (
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgClassName}`}
          >
            <Icon className={`w-4 h-4 ${iconColorClassName}`} />
          </div>
        )}
        <CommonHeader size="sm">{label}</CommonHeader>
      </div>
      <CommonHeader size="2xl" className={valueClass}>
        {value}
      </CommonHeader>
      {des && <CommonHeader size="sm">{des}</CommonHeader>}
    </div>
  );
};

export default BMiniCard;
