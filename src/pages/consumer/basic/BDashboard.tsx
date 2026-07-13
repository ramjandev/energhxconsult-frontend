import StatCard from "@/components/consumer/basic/dashboard/StatCard";

import CommonButton from "@/common/button/CommonButton";
import DashOverview from "@/components/consumer/basic/dashboard/DashOverview";
import Journey from "@/components/consumer/basic/dashboard/Journey";
import RenewableMicroservices from "@/components/consumer/basic/dashboard/RenewableMicroservices";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";
import { FaArrowRightLong } from "react-icons/fa6";
const BDashboard = () => {
  return (
    <div className=" space-y-4 md:space-y-6 lg:space-y-12 ">
      <Welcome
        title="Welcome to EnerghxPLUS Platform"
        description="Begin your energy optimization journey with our comprehensive audit microservice."
        actions={
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <CommonButton
              shape="rounded"
              size="lg"
              rightIcon={<FaArrowRightLong className="w-4 h-4" />}
              className="w-full! sm:w-auto"
            >
              Start Audit
            </CommonButton>

            <CommonButton
              variant="outline"
              shape="rounded"
              className="w-full! sm:w-auto"
            >
              View Dashboard
            </CommonButton>
          </div>
        }
      />

      <DashOverview />
      <RenewableMicroservices />
      <Journey />
      <div className="grid  grid-cols-1 sm:grid-cols-4 gap-4">
        <StatCard label="Buildings Created" value="1" color="text-[#2DAD00]!" />
        <StatCard label="Audits Completed" value="0" color="text-[#F59E0B]!" />
        <StatCard
          label="Audits In Progress"
          value="0"
          color="text-[#3B82F6]!"
        />
        <StatCard
          label="Available Services"
          value="3"
          color="text-[#8B5CF6]!"
        />
      </div>
    </div>
  );
};

export default BDashboard;
