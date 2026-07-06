import { logout } from "@/store/auth/auth.slice";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const DropDown = () => {
  const { token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (!token) return;

    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const linkClasses =
    "block px-4 py-2 hover:bg-gray-100 w-full cursor-pointer text-left";

  return (
    <div
      className={`${
        token ? "w-30" : "w-48"
      } bg-white shadow-lg rounded-lg z-50 border border-[#E7E9E8] `}
    >
      {/* Admin Login */}
      <Link to="/admin-login" className={linkClasses}>
        Admin
      </Link>

      {/* User Login / Logout */}
      {token ? (
        <button
          onClick={handleLogout}
          className={`${linkClasses} text-red-600`}
        >
          Logout
        </button>
      ) : (
        <Link to="/login" className={linkClasses}>
          Login
        </Link>
      )}

      {!token && (
        <Link to="/forgot-password" className={linkClasses}>
          Forgot Password
        </Link>
      )}
    </div>
  );
};

export default DropDown;
