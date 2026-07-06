import { Search } from "lucide-react";
import React from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
}) => {
  return (
    <div
      className={`flex items-center gap-3 bg-[#F9F9F9] border border-[#E7E9E8] rounded-md px-5 py-3 ${className ?? ""}`}
    >
      <Search className="w-4 h-4 text-gray-400 shrink-0" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-gray-400"
      />
    </div>
  );
};

export default SearchInput;
