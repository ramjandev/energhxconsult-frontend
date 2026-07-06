interface StatusBadgeProps {
  //   status: "active" | "completed" | "enrolled";
  status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const statusColors: Record<typeof status, string> = {
    active: "bg-[#FFFAE9] text-[#F1BB00] border-[#F1BB00]",
    pending: "bg-[#FFFAE9] text-[#F1BB00] border-[#F1BB00]",
    completed: "bg-[#E8F4EB] text-[#1C9237] border-[#1C9237]",
    submitted: "bg-[#E8F4EB] text-[#1C9237] border-[#1C9237]",
    enrolled: "bg-[#E6F7FF] text-[#00ADFF] border-[#00ADFF]",
  };

  return (
    <span
      className={`px-4 py-2 text-sm font-normal border rounded-full text-[10px] sm:text-lg ${statusColors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
