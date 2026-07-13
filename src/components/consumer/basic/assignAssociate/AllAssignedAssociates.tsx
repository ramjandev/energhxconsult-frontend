import BackButton from "@/common/button/BackButton";
import CommonBorderWrapper from "@/common/button/CommonBorderWrapper";
import CommonButton from "@/common/button/CommonButton";
import CommonTabs from "@/common/button/CommonTabs";
import SearchInput from "@/common/form/SearchInput";
import SectionHeader from "@/common/header/SectionHeader";
import AssociateCard, {
  Associate,
} from "@/components/consumer/basic/assignAssociate/AssociateCard";
import AssociatesAbout from "@/components/consumer/basic/assignAssociate/AssociatesAbout";
import { useMemo, useState } from "react";

const ASSOCIATES: (Associate & { category: string })[] = [
  {
    id: "1",
    name: "John Smith",
    role: "Senior Energy Consultant",
    status: "Assigned",
    serviceType: "Solar & Energy Audit",
    experience: "12 years",
    location: "Lagos, Nigeria",
    associateId: "ENG-1024",
    email: "john.smith@energhx.com",
    phone: "+234 123 456 7890",
    category: "Solar",
  },
  {
    id: "2",
    name: "Sarah Davis",
    role: "Certified Solar Specialist",
    status: "Assigned",
    serviceType: "Solar Installation",
    experience: "8 years",
    location: "Lagos, Nigeria",
    associateId: "ENG-1024",
    email: "john.smith@energhx.com",
    phone: "+234 123 456 7890",
    category: "Solar",
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Wind Energy Expert",
    status: "Available",
    serviceType: "Wind Systems",
    experience: "10 years",
    location: "Abuja, Nigeria",
    associateId: "ENG-1024",
    email: "john.smith@energhx.com",
    phone: "+234 123 456 7890",
    category: "Wind",
  },
  {
    id: "4",
    name: "Emily Johnson",
    role: "Energy Audit",
    status: "Available",
    serviceType: "Energy Audit Expert",
    experience: "7 years",
    location: "Port Harcourt, Nigeria",
    associateId: "EA-1024",
    email: "john.smith@energhx.com",
    phone: "+234 123 456 7890",
    category: "Energy Audit",
  },
];

const CATEGORIES = ["All", "Solar", "Wind", "Biomass", "Energy Audit"];
const CATEGORY_TABS = CATEGORIES.map((c) => ({ label: c, value: c }));

interface AllAssignedAssociatesProps {
  setIsAssociateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AllAssignedAssociates: React.FC<AllAssignedAssociatesProps> = ({
  setIsAssociateOpen,
}) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      ASSOCIATES.filter(
        (a) =>
          (filter === "All" || a.category === filter) &&
          a.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, filter],
  );

  const handleViewProfile = (id: string) => {
    console.log("View profile →", id);
  };

  const handleSecondaryAction = (id: string) => {
    console.log("Contact/Assign →", id);
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
          activeTab={filter}
          onChange={setFilter}
          className="flex-wrap gap-2"
        />
      </CommonBorderWrapper>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {visible.map((associate) => (
          <AssociateCard
            key={associate.id}
            associate={associate}
            onViewProfile={handleViewProfile}
            onSecondaryAction={handleSecondaryAction}
          />
        ))}
      </div>

      <AssociatesAbout />

      <CommonButton variant="outline" className="w-full" to="../settings">
        Back to Settings
      </CommonButton>
    </div>
  );
};

export default AllAssignedAssociates;
