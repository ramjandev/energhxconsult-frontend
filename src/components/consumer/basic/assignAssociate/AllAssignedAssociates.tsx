import BackButton from "@/common/button/BackButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonTabs from "@/common/button/CommonTabs";
import SearchInput from "@/common/form/SearchInput";
import SectionHeader from "@/common/header/SectionHeader";
import EmptyState from "@/common/loading/EmptyState";
import Spinner from "@/common/loading/Spinner";
import useDebounce from "@/common/useDebounce";
import AssociateCard, {
  Associate,
} from "@/components/consumer/basic/assignAssociate/AssociateCard";
import AssociatesAbout from "@/components/consumer/basic/assignAssociate/AssociatesAbout";
import {
  useGetAssociatesQuery,
  useSelectAssociatesMutation,
} from "@/store/consumer/basic/associates/associatesApi";
import {
  Associate as ApiAssociate,
  AssociateType,
} from "@/store/consumer/basic/associates/types/associates";
import { useMemo, useState } from "react";

const CATEGORY_TABS: { label: string; value: AssociateType }[] = [
  { label: "Server", value: "server" },
  { label: "Developer", value: "developer" },
];

const toCardAssociate = (a: ApiAssociate): Associate => ({
  id: a.associateId,
  name: a.fullName,
  role: a.serviceType || a.type,
  status: a.status === "AVAILABLE" ? "Available" : "Assigned",
  serviceType: a.serviceType,
  experience: `${a.experienceYears} years`,
  location: a.location,
  associateId: a.associateCode,
  email: a.email,
  phone: a.phoneNumber ?? "",
});

interface AllAssignedAssociatesProps {
  setIsAssociateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AllAssignedAssociates: React.FC<AllAssignedAssociatesProps> = ({
  setIsAssociateOpen,
}) => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [filter, setFilter] = useState<AssociateType | null>(null);

  const { data, isLoading } = useGetAssociatesQuery({
    type: filter || undefined,
    search: debouncedSearch,
    page: 1,
    limit: 10,
  });

  const [selectAssociates, { originalArgs }] = useSelectAssociatesMutation();

  const associates = useMemo(
    () => (data?.data.items ?? []).map(toCardAssociate),
    [data],
  );

  const handleViewProfile = (id: string) => {
    console.log("View profile →", id);
  };

  const handleSecondaryAction = async (id: string) => {
    try {
      if (!filter) return;
      await selectAssociates({
        type: filter,
        associateId: id,
      }).unwrap();
    } catch (error) {
      console.error("Failed to select associate:", error);
    }
  };

  return (
    <div className="space-y-6">
      <BackButton
        label="Back to associates"
        onClick={() => setIsAssociateOpen(false)}
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <SectionHeader
          title="Assigned Associates"
          description="Certified energy consultants and specialists for your project"
        />

        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search"
          className="w-full sm:w-64"
        />
      </div>

      <CommonBorderWrapper isShadow>
        <CommonTabs
          tabs={CATEGORY_TABS}
          activeTab={filter as AssociateType}
          onChange={(value) => setFilter(value as AssociateType)}
          className="flex-wrap gap-2"
        />
      </CommonBorderWrapper>

      {isLoading ? (
        <Spinner text="Loading associates..." size="xl" />
      ) : associates.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {associates.map((associate) => (
            <AssociateCard
              key={associate.id}
              associate={associate}
              onViewProfile={handleViewProfile}
              onSecondaryAction={handleSecondaryAction}
              id={originalArgs?.associateId ?? ""}
            />
          ))}
        </div>
      ) : (
        <EmptyState message="No associates assigned yet." />
      )}

      <AssociatesAbout />

      <CommonButton variant="outline" className="w-full" to="../settings">
        Back to Settings
      </CommonButton>
    </div>
  );
};

export default AllAssignedAssociates;
