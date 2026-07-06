import CommonButton from "@/common/button/CommonButton";
import CommonHeader from "@/common/header/CommonHeader";
import { FaArrowRightLong } from "react-icons/fa6";

const energyData = [
  { month: "Jan", usage: 1800 },
  { month: "Feb", usage: 2100 },
  { month: "Mar", usage: 1950 },
  { month: "Apr", usage: 2300 },
  { month: "May", usage: 2150 },
  { month: "Jun", usage: 2340 },
];
const Welcome = () => {
  return (
    <div className="rounded-2xl border-2 border-[rgba(45,173,0,0.20)] bg-[linear-gradient(135deg,_#EAF7E6_0%,_#ECF8E8_8.33%,_#EDF8EA_16.67%,_#EFF9EC_25%,_#F1FAEE_33.33%,_#F3FAF0_41.67%,_#F4FBF2_50%,_#F6FCF5_58.33%,_#F8FCF7_66.67%,_#FAFDF9_75%,_#FBFEFB_83.33%,_#FDFEFD_91.67%,_#FFF_100%)] p-6 md:p-8">
      <CommonHeader size="4xl" className="mb-2">
        Welcome to EnerghxPLUS Platform
      </CommonHeader>
      <CommonHeader
        size="lg"
        className="text-[#758179]! font-normal! max-w-3xl"
      >
        Begin your energy optimization journey with our comprehensive audit
        microservice. Analyze your building's performance and unlock renewable
        energy opportunities.
      </CommonHeader>

      <div className="flex gap-3 mt-5">
        <CommonButton
          shape="rounded"
          size="lg"
          rightIcon={<FaArrowRightLong className="w-4 h-4" />}
        >
          Start Audit
        </CommonButton>

        <CommonButton variant="outline" shape="rounded">
          View Dashboard
        </CommonButton>
      </div>
    </div>
  );
};

export default Welcome;
