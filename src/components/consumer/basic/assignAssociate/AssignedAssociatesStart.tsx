import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";

interface Associate {
  id: string;
  name: string;
  role: string;
  initials: string;
}

const associates: Associate[] = [
  { id: "1", name: "John Smith", role: "Energy Consultant", initials: "JS" },
  { id: "2", name: "Sarah Davis", role: "Solar Specialist", initials: "SD" },
];

interface AssignedAssociatesStartProps {
  setIsAssociateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const AssignedAssociatesStart: React.FC<AssignedAssociatesStartProps> = ({
  setIsAssociateOpen,
}) => {
  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col  md:flex-row gap-3 items-start justify-between ">
        <SectionHeader
          title="Assigned Associates"
          description="Energy consultants and specialists assigned to your account"
        />

        <CommonButton
          variant="outline"
          onClick={() => setIsAssociateOpen(true)}
        >
          View All
        </CommonButton>
      </div>

      <div className="flex flex-col gap-4">
        {associates.map((associate) => (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl bg-neutral-50 px-6 py-5 gap-3">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100">
                <span className="text-lg font-medium text-green-700">
                  {associate.initials}
                </span>
              </div>
              <div>
                <SectionHeader
                  size="lg"
                  title={associate.name}
                  description={associate.role}
                />
              </div>
            </div>

            <CommonButton variant="outline">Contact</CommonButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedAssociatesStart;
