import MobileMenu from "@/Layout/MobileMenu";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";

const MobileMenuWordPress = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
      <button
        onClick={toggleMenu}
        className="md:hidden text-primary-gray text-2xl cursor-pointer"
      >
        {!isOpen && <FiMenu />}
      </button>
      {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
    </>
  );
};

export default MobileMenuWordPress;
