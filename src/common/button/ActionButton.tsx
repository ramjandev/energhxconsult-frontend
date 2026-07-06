import { Trash2 } from "lucide-react";
import React from "react";
import { FaRegEdit } from "react-icons/fa";

interface ActionButtonProps {
  type: "edit" | "delete";
  onClick?: () => void;
  className?: string;
}

const ACTION_CONFIG = {
  edit: {
    icon: FaRegEdit,
    color: "text-gray-400 hover:text-gray-600",
    label: "Edit",
  },
  delete: {
    icon: Trash2,
    color: "text-red-500 hover:text-red-600",
    label: "Delete",
  },
} as const;

const ActionButton: React.FC<ActionButtonProps> = ({
  type,
  onClick,
  className,
}) => {
  const { icon: Icon, color, label } = ACTION_CONFIG[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${color} cursor-pointer transition-colors ${className ?? ""}`}
      aria-label={`${label} room`}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};

export default ActionButton;
