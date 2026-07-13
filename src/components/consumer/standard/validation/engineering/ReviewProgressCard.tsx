import { DollarSign, FileCheck, Leaf, ShieldCheck } from "lucide-react";
import { ReviewProgressItem } from "./types";

interface ReviewProgressCardProps {
  item: ReviewProgressItem;
}

const ICON_MAP = {
  technical: FileCheck,
  financial: DollarSign,
  sustainability: Leaf,
  compliance: ShieldCheck,
};

const STATUS_LABEL: Record<ReviewProgressItem["status"], string> = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
};

const STATUS_CLASS: Record<ReviewProgressItem["status"], string> = {
  approved: "text-green-600",
  pending: "text-amber-600",
  rejected: "text-red-600",
};

const ReviewProgressCard: React.FC<ReviewProgressCardProps> = ({ item }) => {
  const Icon = ICON_MAP[item.icon];

  return (
    <div className="bg-[#EAF7E6]/30 border border-[#E7E9E8] rounded-xl p-6 flex flex-col items-center text-center gap-2">
      <Icon className="w-6 h-6 text-primary" />
      <p className="font-semibold text-[#112518]">{item.label}</p>
      <p className={`text-xl font-bold ${STATUS_CLASS[item.status]}`}>
        {STATUS_LABEL[item.status]}
      </p>
    </div>
  );
};

export default ReviewProgressCard;
