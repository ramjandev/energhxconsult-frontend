import Logo from "@/assets/images/logo.svg";
import userImg from "@/assets/images/user.png";
import CommonWrapper from "@/common/CommonWrapper";
import DropDown from "@/common/DropDown";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export interface NavbarUserProps {
  name?: string;
  role: string;
  profileImg: string;
}
interface NavbarAdminProps {
  user: NavbarUserProps;
}
const NavbarAdmin = ({ user }: NavbarAdminProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <nav
        className="
        bg-white flex justify-between items-center px-4 xl:px-[5%] py-4 border-b border-[#E7E9E8] z-50"
      >
        <CommonWrapper>
          <div className="w-full flex justify-between items-center">
            <Link to="/">
              <img src={Logo} alt="Logo" className="h-8 w-[120px]" />
            </Link>

            <div ref={dropdownRef} className="">
              <div
                onClick={() => setIsDropdownOpen((pre) => !pre)}
                className="flex gap-2 relative"
              >
                <div>
                  <img
                    src={user.profileImg || userImg}
                    alt="User"
                    className="w-12 h-12 ring-2 ring-primary rounded-full cursor-pointer"
                  />

                  {isDropdownOpen && (
                    <div id="dropdown" className="absolute left-0 mt-2">
                      <DropDown />
                    </div>
                  )}
                </div>
                <div className="hidden sm:block">
                  <h2 className="text-[#112518] text-base ">{user.name}</h2>
                  <p className="text-primary font-semibold text-sm">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CommonWrapper>
      </nav>
    </>
  );
};

export default NavbarAdmin;
