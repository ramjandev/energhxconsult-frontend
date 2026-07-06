import { Pencil } from "lucide-react";
import React, { ReactNode } from "react";

interface AdminCommonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const EditButton: React.FC<AdminCommonButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div>
      <button
        className={`flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:text-white border border-blue-600 rounded-lg hover:bg-blue-600 transition  cursor-pointer ${className}`}
        {...props}
      >
        <Pencil size={16} />
        {children}
      </button>
    </div>
  );
};

export default EditButton;
