import { ReactNode } from "react";

interface CommonWordPressHeader {
  children: ReactNode;
  className?: string;
}

const CommonWordPressHeader: React.FC<CommonWordPressHeader> = ({
  children,
  className,
}) => {
  return (
    <h2
      className={` font-semibold text-[#112518] font-secondary text-sm sm:text-lg  md:text-2xl pb-6 ${className}`}
    >
      {children}
    </h2>
  );
};

export default CommonWordPressHeader;
