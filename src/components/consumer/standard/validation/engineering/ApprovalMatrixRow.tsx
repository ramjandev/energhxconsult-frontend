import {
  CheckCircle2,
  DollarSign,
  FileCheck,
  Leaf,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ApprovalMatrixItem } from "./types";

interface ApprovalMatrixRowProps {
  item: ApprovalMatrixItem;
}

const ICON_MAP = {
  technical: FileCheck,
  financial: DollarSign,
  utility: Zap,
  renewable: Leaf,
  compliance: ShieldCheck,
};

const STATUS_LABEL: Record<ApprovalMatrixItem["status"], string> = {
  approved: "Approved",
  pending: "Pending",
  rejected: "Rejected",
};

const ApprovalMatrixRow: React.FC<ApprovalMatrixRowProps> = ({ item }) => {
  const Icon = ICON_MAP[item.icon];

  return (
    <div className="bg-[#EAF7E6]/30 border border-[#E7E9E8] rounded-xl p-5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-[#EAF7E6] flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="font-bold text-[#112518]">{item.title}</h4>
          <p className="text-sm text-[#758179]">
            Status: {STATUS_LABEL[item.status]}
          </p>
        </div>
      </div>
      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
    </div>
  );
};

export default ApprovalMatrixRow;
