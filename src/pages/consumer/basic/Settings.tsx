import StandardTabs from "@/common/button/StandardTabs";
import SectionHeader from "@/common/header/SectionHeader";
import EnergyCommodityForm from "@/components/consumer/basic/settings/EnergyCommodityForm";
import PasswordForm from "@/components/consumer/basic/settings/PasswordForm";
import ProfileForm from "@/components/consumer/basic/settings/ProfileForm";
import { useState } from "react";

const TABS = [
  { label: "Profile", key: "profile" },
  { label: "Energy Commodity Information", key: "commodity" },
  { label: "Password", key: "password" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("commodity");

  return (
    <div className="space-y-6 ">
      <SectionHeader title="Settings" />
      <StandardTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      <div className="w-full">
        {activeTab === "profile" && <ProfileForm />}
        {activeTab === "commodity" && <EnergyCommodityForm />}

        {activeTab === "password" && <PasswordForm />}
      </div>
    </div>
  );
};

export default Settings;
