import React from "react";

type ProgressBarProps = {
  percentage: number; // 0 to 100
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  return (
    <div className="space-y-1">
      <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-300 ease-in-out"
          style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
        />
      </div>
      <p className="text-xs text-gray-500">{percentage}% completed</p>
    </div>
  );
};

export default ProgressBar;
