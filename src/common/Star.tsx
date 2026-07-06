import { FaStar, FaRegStar } from "react-icons/fa6";

const Star = () => {
  return (
    <div className="flex items-center gap-1 text-[#F1BB00] text-xs  sm:text-sm xl:text-lg">
      <FaStar />
      <FaStar />
      <FaStar />
      <FaStar />
      <FaRegStar />
    </div>
  );
};

export default Star;
