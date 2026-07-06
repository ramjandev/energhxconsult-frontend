import UpdatedModal from "@/common/password/UpdatedModal";
import { logout } from "@/store/auth/auth.slice";
import { RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import image from "../../assets/Profile/imran.png";

const TopBar = () => {
  const [admin, setAdmin] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { token, user } = useSelector((state: RootState) => state.auth);

  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    if (token) {
      logout();
      navigate("/");
    } else {
      navigate("/admin-login");
    }
    setAdmin(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setAdmin(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 bg-white shadow-sm">
        <div className="flex items-center w-1/2 max-w-md border border-gray-300 rounded-md overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 text-sm text-gray-700 focus:outline-none"
          />
          <button className="px-4 text-gray-500 hover:text-black">
            <FiSearch size={18} />
          </button>
        </div>

        <div className="relative" ref={profileRef}>
          <div
            onClick={() => setAdmin((prev) => !prev)}
            className="flex gap-2 relative"
          >
            <div>
              <img
                src={user?.data?.profile_photo || image}
                alt="User"
                className="w-12 h-12 ring-2 ring-primary rounded-full cursor-pointer"
              />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-[#112518] text-base ">
                {user?.data?.firstname}
              </h2>
              <p className="text-primary font-semibold text-sm">
                {/* {(user &&
                  user?.user_role.length > 0 &&
                  user?.user_role[0].replace(/_/g, " ")) ||
                  user?.userType.replace(/_/g, " ")} */}
              </p>
            </div>
          </div>

          {admin && (
            <div
              role="menu"
              aria-expanded="true"
              className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10 transition"
            >
              <div
                onClick={handleClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {token ? "Logout" : "Login"}
              </div>
              <div
                onClick={() => setShowModal(true)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Update Password
              </div>
            </div>
          )}
        </div>
      </header>
      {showModal && <UpdatedModal setShowModal={setShowModal} />}
    </>
  );
};

export default TopBar;
