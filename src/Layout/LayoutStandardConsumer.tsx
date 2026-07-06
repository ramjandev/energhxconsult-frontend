import userImg from "@/assets/images/user.png";
import CommonBanner from "@/common/CommonBanner";
import CommonWrapper from "@/common/CommonWrapper";
import Sidebar, { MenuItem } from "@/common/sidebar/Sidebar";
import NavbarAdmin from "@/Layout/NavbarAdmin";
import NavbarStandard from "@/Layout/NavbarStandard";
import { RootState } from "@/store/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";

import { GiPlantRoots } from "react-icons/gi";
import { MdLogout, MdSettings } from "react-icons/md";

import { ClipboardList, FileSearch } from "lucide-react";
import { FaBolt, FaHome, FaSolarPanel, FaWind } from "react-icons/fa";

export const standardConsumerMenu: MenuItem[] = [
  {
    path: "/standard-consumer/dashboard",
    label: "Dashboard",
    icon: FaHome,
  },

  {
    path: "#",
    label: "Energy Commodity Setup",
    icon: FaBolt,
    children: [
      {
        path: "/standard-consumer/zev",
        label: "Zero Emission Vehicle (ZEV)",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/nzeb",
        label: "Net Zero Energy Building (NZEB)",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/thermal-comfort-simulation",
        label: "Thermal Comfort Simulation",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/engineering-services",
        label: "Add Engineering Services",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/solar-energy",
        label: "Solar Energy System Design & Sizing",
        icon: FaSolarPanel,
      },
      {
        path: "/standard-consumer/wind-energy",
        label: "Wind Energy System Design & Sizing",
        icon: FaWind,
      },
      {
        path: "/standard-consumer/biomass-energy",
        label: "Biomass Energy System Design & Sizing",
        icon: GiPlantRoots,
      },
      {
        path: "/standard-consumer/hvac-modelling",
        label: "Building HVAC Modelling",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/battery-storage",
        label: "Battery Storage Design",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/ev-charging",
        label: "EV Charging Infrastructure",
        icon: FaBolt,
      },
    ],
  },

  {
    path: "#",
    label: "Validation & Approval",
    icon: FileSearch,
    children: [
      {
        path: "/standard-consumer/res-sequence-validation",
        label: "RES Sequence Validation",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/engineering-review",
        label: "Engineering Review & Approval",
        icon: FaBolt,
      },
    ],
  },

  {
    path: "#",
    label: "Contracts & Reports",
    icon: ClipboardList,
    children: [
      {
        path: "/standard-consumer/project-proposal",
        label: "Project Proposal & Contract",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/checkout-report",
        label: "Checkout Report",
        icon: FaBolt,
      },
    ],
  },

  {
    path: "#",
    label: "Settings",
    icon: MdSettings,
    children: [
      {
        path: "/standard-consumer/profile-settings",
        label: "Profile Settings",
        icon: FaBolt,
      },
      {
        path: "/standard-consumer/assigned-associates",
        label: "Assigned Associates",
        icon: FaBolt,
      },
    ],
  },

  {
    path: "/login",
    label: "Logout",
    icon: MdLogout,
  },
];

const LayoutStandardConsumer = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const [devUser] = useState({
    name: `${user?.data.firstname ?? ""} ${user?.data.lastname ?? ""}`.trim(),
    role: user?.data?.userType ?? "",
    profileImg: user?.data?.profile_photo ?? userImg,
  });

  const { pathname } = useLocation();

  const show = pathname === "/user/signup/" || pathname === "/user/signup";
  return (
    <div>
      {show && <NavbarStandard />}
      {!show && <NavbarAdmin user={devUser} />}
      {!show && (
        <CommonBanner
          name={devUser.name}
          role={devUser.role}
          imageUrl={devUser.profileImg}
        />
      )}

      <CommonWrapper>
        <div className="flex w-full">
          <div className={`${pathname === "/user/signup" && "hidden"}`}>
            <Sidebar menuItems={standardConsumerMenu} />
          </div>

          <div className="flex-1 border-t border-t-[#E7E9E8] p-6 ">
            <Outlet />
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default LayoutStandardConsumer;
