import { Link, useLocation } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import MobileMenuWordPress from "./MobileMenuWordPress";

const menus = [
  { label: "Home", path: "/home" },
  { label: "Research", path: "/research" },
  { label: "Consulting", path: "/consulting" },
  { label: " Contact us", path: "/contact-us" },
];

const Header = () => {
  const { pathname } = useLocation();

  return (
    <div>
      <header className="flex items-center justify-between h-18">
        <Link to={"/"}>
          <img src={logo} alt="" />
        </Link>
        <nav className="hidden md:flex space-x-8">
          {menus.map((menu) => (
            <Link
              key={menu.label}
              to={menu.path}
              className={`${
                pathname === menu.path ? "text-primary" : "text-gray-400"
              } hover:text-green-500 transition-colors`}
            >
              {menu.label}
            </Link>
          ))}
        </nav>
        <MobileMenuWordPress />
      </header>
    </div>
  );
};

export default Header;
