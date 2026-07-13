import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import { FileText, Shield } from "lucide-react";
import { ContractDocument } from "./types";

interface ContractDocumentsSectionProps {
  documents: ContractDocument[];
  onViewPdf: (document: ContractDocument) => void;
}

const ICON_MAP = {
  file: FileText,
  shield: Shield,
};

const ContractDocumentsSection: React.FC<ContractDocumentsSectionProps> = ({
  documents,
  onViewPdf,
}) => {
  return (
    <CommonBorderWrapper isShadow>
      <SectionHeader size="xl" title="Contract Documents" />

      <div className="space-y-3">
        {documents.map((doc) => {
          const Icon = ICON_MAP[doc.icon];
          return (
            <div
              key={doc.id}
              className="flex flex-col md:flex-row gap-3 md:items-center  justify-between bg-[#EAF7E6]/30 border border-[#E5E7EB] rounded-xl px-5 py-4"
            >
              <div className="flex items-center gap-2">
                <Icon className="w-5 h-5 text-primary shrink-0  hidden sm:block" />
                <div>
                  <SectionHeader
                    size="lg"
                    title={doc.title}
                    description={doc.description}
                  />
                </div>
              </div>

              <CommonButton onClick={() => onViewPdf(doc)}>
                View PDF
              </CommonButton>
            </div>
          );
        })}
      </div>
    </CommonBorderWrapper>
  );
};

export default ContractDocumentsSection;
