import BackButton from "@/common/button/BackButton";
import ManageEnergy from "./card/ManageEnergy";
import HeaderBanner from "./HeaderBanner";
import ApplianceInventory from "./management/ApplianceInventory";
import EfficiencyInsights from "./management/EfficiencyInsights";
import RenewableEnergy from "./management/RenewableEnergy";

const AppliancesManagement = () => {
  return (
    <div className="">
      <div className="space-y-6">
        <BackButton label="Back to Building" />

        <HeaderBanner
          title="Appliances Management"
          description="Comprehensive overview of all appliances in your building"
          isButton
        />
        <ManageEnergy />
        <ApplianceInventory />
        <EfficiencyInsights />
        <RenewableEnergy />
      </div>
    </div>
  );
};

export default AppliancesManagement;
