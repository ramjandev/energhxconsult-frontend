import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { FaCircleCheck } from "react-icons/fa6";
import { ValidationChecklistItem } from "./types";

interface ValidationChecklistCardProps {
  item: ValidationChecklistItem;
}

const STATUS_CONFIG: Record<
  ValidationChecklistItem["status"],
  { icon: typeof CheckCircle2; label: string; className: string }
> = {
  complete: {
    icon: CheckCircle2,
    label: "Complete",
    className: "text-primary",
  },
  pending: {
    icon: Clock,
    label: "Pending",
    className: "text-amber-600",
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    className: "text-red-600",
  },
};

const ValidationChecklistCard: React.FC<ValidationChecklistCardProps> = ({
  item,
}) => {
  const config = STATUS_CONFIG[item.status];
  const Icon = config.icon;

  return (
    <div className="bg-[#EAF7E6]/30 border border-[#E7E9E8] rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ">
            <div className="flex h-7 w-7 items-center justify-center rounded-full border-4 border-[#0BAA43] bg-white">
              <FaCircleCheck className={`h-4 w-4 ${config.className}`} />
            </div>
          </div>

          <h4 className="font-bold text-xl text-[#112518]">{item.title}</h4>
        </div>
        <span className={`text-sm font-semibold shrink-0 ${config.className}`}>
          {config.label}
        </span>
      </div>

      <div className="pl-7 space-y-0.5">
        <p className="text-sm text-primary">Validated By: {item.validatedBy}</p>
        <p className="text-sm text-primary">Associate ID: {item.associateId}</p>
        <p className="text-sm text-primary">{item.role}</p>
      </div>
    </div>
  );
};

export default ValidationChecklistCard;
