const menuItems = [
  { menu: "Home", path: "/home" },
  { menu: "About Us", path: "/about-us" },
  { menu: "Consulting", path: "/consulting" },
  { menu: "Research", path: "/research" },
  { menu: "EnerghxPlus", path: "/energhxplus" },
  { menu: "Contact Us", path: "/contact-us" },
];
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
interface MobileMenuProps {
  setIsOpen: (isOpen: boolean) => void;
}
const MobileMenu: React.FC<MobileMenuProps> = ({ setIsOpen }) => {
  return (
    <div className=" bg-white  fixed top-0 right-0 h-full w-full sm:w-1/2  shadow md:hidden flex justify-between p-4 z-50  text-black">
      <ul className=" flex flex-col gap-4 ">
        {menuItems.map((item, i) => (
          <li key={i} className="">
            <Link
              to={item.path}
              className={`relative px-4 py-2 group hover:text-primary`}
            >
              {item.menu}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary transform scale-x-0 origin-center transition-transform duration-300 group-hover:scale-x-70"></span>
            </Link>
          </li>
        ))}
      </ul>
      <div
        className=" cursor-pointer text-2xl"
        onClick={() => setIsOpen(false)}
      >
        <MdClose />
      </div>
    </div>
  );
};

export default MobileMenu;
