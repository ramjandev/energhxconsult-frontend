import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import {
  ArrowLeft,
  Building2,
  FileText,
  Info,
  MapPin,
  Wrench,
  Zap,
} from "lucide-react";
import { useState } from "react";
import AcceptanceSection from "./AcceptanceSection";
import { DOCUMENT_SELECTION_CRITERIA, REQUIRED_DOCUMENTS } from "./data";
import DocumentCard from "./DocumentCard";
import DocumentReviewStatus from "./DocumentReviewStatus";
import DocumentViewerModal from "./DocumentViewerModal";
import { AcknowledgementState, RequiredDocument, SignatoryInfo } from "./types";

interface ContractDocumentsReviewProps {
  onBackToProposal: () => void;
  onExecuteContract: () => void;
}

const ContractDocumentsReview: React.FC<ContractDocumentsReviewProps> = ({
  onBackToProposal,
  onExecuteContract,
}) => {
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(new Set());
  const [activeDocument, setActiveDocument] = useState<RequiredDocument | null>(
    null,
  );
  const [acknowledgement, setAcknowledgement] = useState<AcknowledgementState>({
    reviewedAllDocuments: false,
    acknowledgedDisclosures: false,
    agreedToProceed: false,
  });

  const totalDocuments = REQUIRED_DOCUMENTS.length;
  const remainingCount = totalDocuments - reviewedIds.size;
  const allDocumentsReviewed = remainingCount === 0;
  const allAcknowledged =
    acknowledgement.reviewedAllDocuments &&
    acknowledgement.acknowledgedDisclosures &&
    acknowledgement.agreedToProceed;
  const canExecuteContract = allDocumentsReviewed && allAcknowledged;

  const handleMarkAsReviewed = (
    _signatoryInfo: SignatoryInfo,
    _signatureDataUrl: string | null,
  ) => {
    if (!activeDocument) return;
    setReviewedIds((prev) => new Set(prev).add(activeDocument.id));
    setActiveDocument(null);
  };

  const handleAcknowledgementChange = (
    key: keyof AcknowledgementState,
    value: boolean,
  ) => {
    setAcknowledgement((prev) => ({ ...prev, [key]: value }));
  };

  const handleDownload = (doc: RequiredDocument) => {
    console.log("Downloading document:", doc.id);
  };

  console.log("REQUIRED_DOCUMENTS", REQUIRED_DOCUMENTS.length);

  return (
    <div className="space-y-6">
      <Welcome
        title="Contract Documents & Disclosure Review"
        description="Required documents have been automatically selected based on your Utility Provider, Jurisdiction, Energy Commodity, and selected Engineering Services."
        Icons={FileText}
        iconBg="bg-white"
        iconColor="text-primary"
        className="border border-[rgba(22,163,74,0.15)]! bg-[linear-gradient(90deg,_rgba(22,163,74,0.06)_0%,_rgba(37,99,235,0.06)_100%)]!"
        size="3xl"
      />

      <CommonBorderWrapper isShadow>
        <SectionHeader
          size="xl"
          title="Document Selection Criteria"
          description="The system automatically retrieves the correct contracts and regulatory documents based on these selections."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-4 border border-[#BEDBFF]">
            <Building2 className="w-5 h-5 text-blue-600 shrink-0" />
            <div>
              <p className="text-xs text-[#758179]">Utility Provider</p>
              <p className="font-bold text-blue-700">
                {DOCUMENT_SELECTION_CRITERIA.utilityProvider}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-purple-50 rounded-xl px-4 py-4 border border-[#E9D4FF]">
            <MapPin className="w-5 h-5 text-purple-600 shrink-0" />
            <div>
              <p className="text-xs text-[#758179]">Jurisdiction</p>
              <p className="font-bold text-purple-700">
                {DOCUMENT_SELECTION_CRITERIA.jurisdiction}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-4 py-4 border border-[#FFF085]">
            <Zap className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-xs text-[#758179]">Energy Commodity</p>
              <p className="font-bold text-amber-700">
                {DOCUMENT_SELECTION_CRITERIA.energyCommodity}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-[#EAF7E6] rounded-xl px-4 py-4 border border-[#B9F8CF]">
            <Wrench className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-xs text-[#758179]">Engineering Services</p>
              <p className="font-bold text-primary">
                {DOCUMENT_SELECTION_CRITERIA.engineeringServices}
              </p>
            </div>
          </div>
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper isShadow className="p-0! space-y-0!">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between px-6 py-5">
          <SectionHeader
            size="xl"
            title="Required Documents"
            description="Review each document before proceeding to contract execution."
          />
          <span
            className={`text-sm font-semibold w-fit ${
              reviewedIds.size < totalDocuments
                ? "text-[#BB4D00] bg-[#FEF3C6]"
                : "text-[#008236] bg-[#DCFCE7]"
            }  px-3 py-1.5 rounded-full shrink-0`}
          >
            {reviewedIds.size}/{totalDocuments} Reviewed
          </span>
        </div>

        <div className="">
          {REQUIRED_DOCUMENTS.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              isReviewed={reviewedIds.has(doc.id)}
              onDownload={() => handleDownload(doc)}
              onView={() => setActiveDocument(doc)}
            />
          ))}
        </div>
      </CommonBorderWrapper>

      <DocumentReviewStatus
        documents={REQUIRED_DOCUMENTS}
        reviewedIds={reviewedIds}
      />

      <AcceptanceSection
        allDocumentsReviewed={allDocumentsReviewed}
        remainingCount={remainingCount}
        acknowledgement={acknowledgement}
        onChange={handleAcknowledgementChange}
      />

      {!canExecuteContract && (
        <p className="text-center text-sm text-[#758179]">
          Review all {totalDocuments} documents to unlock contract execution.
        </p>
      )}

      <div className="bg-[#EAF7E6]/30 border border-[rgba(22,163,74,0.2)] rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-[#112518] mb-2">
              Dynamic Document Rendering
            </h3>
            <p className="text-sm text-[#758179] mb-3">
              Documents displayed on this page are dynamically selected
              according to:
            </p>
            <ul className="space-y-1 mb-3">
              {[
                "Utility Provider",
                "Energy Commodity",
                "Jurisdiction",
                "Engineering Service Selection",
                "Applicable Regulatory Requirements",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-[#112518]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-[#758179] italic">
              The final document set may vary for each consumer based on their
              unique profile and service selections.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <CommonButton variant="outline" onClick={onBackToProposal}>
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          Back to Proposal
        </CommonButton>

        <CommonButton
          onClick={onExecuteContract}
          disabled={!canExecuteContract}
        >
          Execute Contract & Continue
        </CommonButton>
      </div>

      {activeDocument && (
        <DocumentViewerModal
          document={activeDocument}
          utilityProvider={DOCUMENT_SELECTION_CRITERIA.utilityProvider}
          onClose={() => setActiveDocument(null)}
          onMarkAsReviewed={handleMarkAsReviewed}
        />
      )}
    </div>
  );
};

export default ContractDocumentsReview;
