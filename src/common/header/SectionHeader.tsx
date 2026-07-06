import CommonHeader from "./CommonHeader";

interface SectionHeaderProps {
  title: string;
  description?: string;
  className?: string;
  size?: "md" | "lg" | "xl" | "2xl";
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  className,
  size = "2xl",
}) => {
  return (
    <div className={className}>
      <CommonHeader
        size={size}
        className={`font-bold! text-[#112518]! ${className} ${size === "2xl" ? "mb-2" : ""}`}
      >
        {title}
      </CommonHeader>

      {description && <CommonHeader size="md">{description}</CommonHeader>}
    </div>
  );
};

export default SectionHeader;
