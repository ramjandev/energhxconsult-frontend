import StatCard from "@/components/consumer/basic/dashboard/StatCard";

import DashOverview from "@/components/consumer/basic/dashboard/DashOverview";
import Journey from "@/components/consumer/basic/dashboard/Journey";
import RenewableMicroservices from "@/components/consumer/basic/dashboard/RenewableMicroservices";
import Welcome from "@/components/consumer/basic/dashboard/Welcome";

const energyData = [
  { month: "Jan", usage: 1800 },
  { month: "Feb", usage: 2100 },
  { month: "Mar", usage: 1950 },
  { month: "Apr", usage: 2300 },
  { month: "May", usage: 2150 },
  { month: "Jun", usage: 2340 },
];

const BDashboard = () => {
  return (
    <div className=" space-y-4 md:space-y-6 lg:space-y-12 ">
      <Welcome />
      <DashOverview />
      <RenewableMicroservices />
      <Journey />

      <div className="grid grid-cols-4 gap-4">
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
