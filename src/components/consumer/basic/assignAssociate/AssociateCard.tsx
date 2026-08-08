import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import SectionHeader from "@/common/header/SectionHeader";
import ButtonWithLoading from "@/common/loading/ButtonWithLoading";
import {
  Award,
  BadgeCheck,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  UserCheck,
} from "lucide-react";
import React from "react";

export interface Associate {
  id: string;
  name: string;
  role: string;
  status: "Assigned" | "Available";
  serviceType: string;
  experience: string;
  location: string;
  associateId: string;
  email: string;
  phone: string;
}

interface AssociateCardProps {
  associate: Associate;
  onViewProfile: (id: string) => void;
  onSecondaryAction: (id: string) => void;
  id: string | undefined;
}

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();

const AssociateCard: React.FC<AssociateCardProps> = ({
  associate,
  onViewProfile,
  onSecondaryAction,
  id,
}) => {
  const isAssigned = associate.status === "Assigned";

  return (
    <CommonBorderWrapper isShadow className="">
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div className="w-14 h-14 rounded-full bg-primary/10 text-primary  font-bold text-lg flex items-center justify-center shrink-0">
          {initials(associate.name)}
        </div>
        <div className="space-y-1">
          <SectionHeader size="lg" title={associate.name} />

          <CommonHeader size="sm">
            <Award className="w-4 h-4 text-primary" />
            {associate.role}
          </CommonHeader>

          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
              isAssigned
                ? "bg-[#DCFCE7] text-[#00A63E]"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {isAssigned ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <UserCheck className="w-3.5 h-3.5" />
            )}
            {associate.status}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="mt-1.5">
            <Award className="w-4 h-4 text-[#758179]" />
          </div>

          <div>
            <CommonHeader size="sm">Service Type</CommonHeader>
            <CommonHeader size="md" className="font-bold! text-[#112518]!">
              {associate.serviceType}
            </CommonHeader>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="mt-1.5">
            <BadgeCheck className="w-4 h-4 text-[#758179]" />
          </div>

          <div>
            <CommonHeader size="sm">Experience</CommonHeader>
            <CommonHeader size="md" className="font-bold! text-[#112518]!">
              {associate.experience}
            </CommonHeader>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="mt-1.5">
            <MapPin className="w-4 h-4 text-[#758179]" />
          </div>

          <div>
            <CommonHeader size="sm">Location</CommonHeader>
            <CommonHeader size="md" className="font-bold! text-[#112518]!">
              {associate.location}
            </CommonHeader>
          </div>
        </div>
      </div>
      <hr className="border-gray-100 mb-4" />

      {/* Contact info */}
      <div className="space-y-2 mb-5 text-sm">
        <p className="flex items-center gap-2 text-primary">
          <BadgeCheck className="w-4 h-4" />
          Associate ID: {associate.associateId}
        </p>
        <p className="flex items-center gap-2 text-primary">
          <Mail className="w-4 h-4" />
          {associate.email}
        </p>
        <p className="flex items-center gap-2 text-primary">
          <Phone className="w-4 h-4" />
          {associate.phone}
        </p>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <CommonButton onClick={() => onViewProfile(associate.id)}>
          View Profile
        </CommonButton>
        <CommonButton
          variant="outline"
          onClick={() => onSecondaryAction(associate.id)}
        >
          {id === associate.id ? (
            <ButtonWithLoading
              title="Assigning..."
              textColor="text-primary!"
              borderColor="border-primary!"
            />
          ) : isAssigned ? (
            "Contact"
          ) : (
            "Assign"
          )}
        </CommonButton>
      </div>
    </CommonBorderWrapper>
  );
};

export default AssociateCard;
