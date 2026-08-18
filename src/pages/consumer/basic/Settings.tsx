import StandardTabs from "@/common/button/StandardTabs";
import SectionHeader from "@/common/header/SectionHeader";
import EnergyCommodityForm from "@/components/consumer/basic/settings/EnergyCommodityForm";
import PasswordForm from "@/components/consumer/basic/settings/PasswordForm";
import ProfileForm from "@/components/consumer/basic/settings/ProfileForm";
import { ConsumerLoginResponse } from "@/store/auth/types/loginUser";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";

const TABS = [
  { label: "Profile", key: "profile" },
  { label: "Energy Commodity Information", key: "commodity" },
  { label: "Password", key: "password" },
];

const Settings = () => {
  const [activeTab, setActiveTab] = useState("commodity");
  const { user } = useSelector((state: RootState) => state.auth);

  const consumerUser = user as ConsumerLoginResponse | null;
  const basicConsumer = consumerUser?.data.level === "BASIC";
  const TABS = basicConsumer
    ? [
        { label: "Profile", key: "profile" },
        { label: "Password", key: "password" },
      ]
    : [
        { label: "Profile", key: "profile" },
        { label: "Energy Commodity Information", key: "commodity" },
        { label: "Password", key: "password" },
      ];
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
