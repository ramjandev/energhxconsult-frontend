import CommonButton from "@/common/button/CommonButton";
import {
  CheckCircle2,
  FileText,
  Info,
  PenTool,
  Type,
  Upload,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import SignatureCanvas from "./SignatureCanvas";
import { RequiredDocument, SignatoryInfo, SignatureMethod } from "./types";

interface DocumentViewerModalProps {
  document: RequiredDocument;
  utilityProvider: string;
  onClose: () => void;
  onMarkAsReviewed: (
    signatoryInfo: SignatoryInfo,
    signatureDataUrl: string | null,
  ) => void;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  document,
  utilityProvider,
  onClose,
  onMarkAsReviewed,
}) => {
  const [signatureMethod, setSignatureMethod] =
    useState<SignatureMethod>("draw");
  const [signatureDataUrl, setSignatureDataUrl] = useState<string | null>(null);
  const [typedSignature, setTypedSignature] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSignatureDataUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const hasSignature =
    signatureMethod === "draw"
      ? !!signatureDataUrl
      : signatureMethod === "type"
        ? typedSignature.trim().length > 0
        : !!signatureDataUrl;

  const canMarkReviewed =
    fullName.trim() && email.trim() && date && hasSignature;

  const handleMarkAsReviewed = () => {
    if (!canMarkReviewed) return;
    onMarkAsReviewed(
      { fullName, email, date },
      signatureMethod === "type" ? null : signatureDataUrl,
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start sm:items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E7E9E8]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="font-bold text-[#112518] text-lg">
                {document.title}
              </h2>
              <p className="text-sm text-[#758179]">{utilityProvider}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6 max-h-[70vh] overflow-y-auto">
          <div className="flex items-start gap-3 bg-blue-50 rounded-xl px-4 py-3.5">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              This document was automatically retrieved based on your selected
              Utility Provider, Jurisdiction, and Engineering Services. Content
              is dynamically generated from backend regulatory data sources.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#112518] mb-1.5">
              Document Overview
            </h3>
            <p className="text-sm text-[#758179]">{document.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#EAF7E6]/30 rounded-xl px-4 py-3">
              <p className="text-xs text-[#758179]">Total Pages</p>
              <p className="font-bold text-[#112518]">
                {document.pageCount} pages
              </p>
            </div>
            <div className="bg-[#EAF7E6]/30 rounded-xl px-4 py-3">
              <p className="text-xs text-[#758179]">Last Updated</p>
              <p className="font-bold text-[#112518]">{document.lastUpdated}</p>
            </div>
          </div>

          <div className="border border-[#E7E9E8] rounded-xl divide-y divide-[#E7E9E8]">
            {document.sections.map((section) => (
              <div
                key={section.order}
                className="flex items-center justify-between px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#EAF7E6] text-primary text-sm font-bold flex items-center justify-center">
                    {section.order}
                  </span>
                  <span className="font-medium text-[#112518]">
                    {section.title}
                  </span>
                </div>
                <span className="text-sm text-[#758179]">
                  {section.sectionLabel}
                </span>
              </div>
            ))}
          </div>

          <div className="border border-[#E7E9E8] rounded-xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E7E9E8]">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                2
              </span>
              <h3 className="font-bold text-[#112518]">
                Signatory Information
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
              <div>
                <label className="block text-sm font-medium text-[#112518] mb-1.5">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#112518] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Legal email address"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#112518] mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="border border-[#E7E9E8] rounded-xl">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#E7E9E8]">
              <span className="w-6 h-6 rounded-full bg-primary text-white text-sm font-bold flex items-center justify-center">
                3
              </span>
              <h3 className="font-bold text-[#112518]">Digital Signature</h3>
            </div>

            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setSignatureMethod("draw")}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    signatureMethod === "draw"
                      ? "bg-white border border-gray-300"
                      : "bg-[#EAF7E6]/40 text-[#758179]"
                  }`}
                >
                  <PenTool className="w-4 h-4" />
                  Draw Signature
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMethod("type")}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    signatureMethod === "type"
                      ? "bg-white border border-gray-300"
                      : "bg-[#EAF7E6]/40 text-[#758179]"
                  }`}
                >
                  <Type className="w-4 h-4" />
                  Type Signature
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMethod("upload")}
                  className={`flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                    signatureMethod === "upload"
                      ? "bg-white border border-gray-300"
                      : "bg-[#EAF7E6]/40 text-[#758179]"
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  Upload Signature
                </button>
              </div>

              {signatureMethod === "draw" && (
                <SignatureCanvas onSignatureChange={setSignatureDataUrl} />
              )}

              {signatureMethod === "type" && (
                <div>
                  <input
                    type="text"
                    value={typedSignature}
                    onChange={(e) => setTypedSignature(e.target.value)}
                    placeholder="Type your full name"
                    className="w-full h-24 rounded-lg border border-dashed border-gray-300 px-4 text-3xl italic text-center focus:outline-none focus:ring-2 focus:ring-primary"
                    style={{ fontFamily: "cursive" }}
                  />
                  <p className="text-xs text-[#758179] mt-2">
                    Your typed name will be used as your signature
                  </p>
                </div>
              )}

              {signatureMethod === "upload" && (
                <div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-40 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 text-[#758179] hover:bg-gray-50"
                  >
                    <Upload className="w-6 h-6" />
                    <span className="text-sm">
                      Click to upload a signature image
                    </span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  {signatureDataUrl && (
                    <img
                      src={signatureDataUrl}
                      alt="Uploaded signature"
                      className="h-16 mt-3 mx-auto"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-5 border-t border-[#E7E9E8]">
          <CommonButton variant="outline" onClick={onClose}>
            Close
          </CommonButton>
          <CommonButton
            onClick={handleMarkAsReviewed}
            disabled={!canMarkReviewed}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Mark as Reviewed
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default DocumentViewerModal;
