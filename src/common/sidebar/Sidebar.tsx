import { RootState } from "@/store/store";
import { useState } from "react";
import { IconType } from "react-icons";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
export interface MenuItem {
  path?: string;
  label: string;
  icon: IconType;
  children?: MenuItem[];
}
// Define props type for Sidebar
export interface SidebarProps {
  menuItems: MenuItem[];
}
const Sidebar: React.FC<SidebarProps> = ({ menuItems }) => {
  const { token } = useSelector((state: RootState) => state.auth);

  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };
  return (
    <div className="w-fit h-screen text-[#758179] border-r border-t border-r-[#E7E9E8] border-t-[#E7E9E8]  border-gray-300 z-10 ">
      <ul>
        {menuItems.map((item, index) => (
          <div key={index}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="w-full flex items-center justify-between p-3 hover:bg-[#EAF7E6] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <item.icon size={20} />
                    <span className="hidden xl:block">{item.label}</span>
                  </div>

                  {openMenus[item.label] ? (
                    <FaChevronDown size={14} />
                  ) : (
                    <FaChevronRight size={14} />
                  )}
                </button>

                {openMenus[item.label] &&
                  item.children.map((child, childIndex) => (
                    <NavLink
                      key={childIndex}
                      to={child.path!}
                      className={({ isActive }) =>
                        `flex items-center gap-2  p-3 ${
                          isActive
                            ? "bg-primary text-white"
                            : "hover:bg-[#EAF7E6]"
                        }`
                      }
                    >
                      <child.icon size={18} />
                      <span className="hidden xl:block">{child.label}</span>
                    </NavLink>
                  ))}
              </>
            ) : (
              <NavLink
                to={item.path!}
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 ${
                    isActive ? "bg-primary text-white" : "hover:bg-[#EAF7E6]"
                  }`
                }
              >
                <item.icon size={20} />
                <span className="hidden xl:block">{item.label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
