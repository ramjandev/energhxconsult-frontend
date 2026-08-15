import CommonButton from "@/common/button/CommonButton";
import SectionHeader from "@/common/header/SectionHeader";
import EmptyState from "@/common/loading/EmptyState";
import Spinner from "@/common/loading/Spinner";
import { useGetAssociatesQuery } from "@/store/consumer/basic/associates/associatesApi";

interface AssignedAssociatesStartProps {
  setIsAssociateOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const getInitials = (firstname: string, lastname: string) =>
  `${firstname.charAt(0)}${lastname.charAt(0)}`.toUpperCase();

const AssignedAssociatesStart: React.FC<AssignedAssociatesStartProps> = ({
  setIsAssociateOpen,
}) => {
  const { data, isLoading } = useGetAssociatesQuery({
    page: 1,
    limit: 10,
  });

  const associates = data?.data.items ?? [];

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

      {isLoading ? (
        <Spinner text="Loading associates..." size="xl" />
      ) : associates.length > 0 ? (
        <div className="flex flex-col gap-4">
          {associates.map((associate) => (
            <div
              key={associate.associateId}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl bg-neutral-50 px-6 py-5 gap-3"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <span className="text-lg font-medium text-green-700">
                    {getInitials(associate.firstname, associate.lastname)}
                  </span>
                </div>
                <div>
                  <SectionHeader
                    size="lg"
                    title={associate.fullName}
                    description={associate.serviceType || associate.type}
                  />
                </div>
              </div>

              <CommonButton variant="outline">Contact</CommonButton>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No associates assigned yet." />
      )}
    </div>
  );
};

export default AssignedAssociatesStart;
