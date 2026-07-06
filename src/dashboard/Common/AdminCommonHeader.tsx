import { ReactNode } from "react";

interface AdminCommonHeader {
  children: ReactNode;
  className?: string;
}

const AdminCommonHeader: React.FC<AdminCommonHeader> = ({
  children,
  className,
}) => {
  return (
    <h2
      className={` font-semibold text-[#112518] font-secondary text-sm sm:text-lg  md:text-xl pb-6 ${className}`}
    >
      {children}
    </h2>
  );
};

export default AdminCommonHeader;
