interface ProgressBarProps {
  percent: number; // Progress percentage (0 to 100)
}

const ProgressBar = ({ percent }: ProgressBarProps) => {
  // Ensure progress stays between 0 and 100
  const clampedPercent = Math.max(0, Math.min(percent, 100));

  return (
    <div className="max-w-[470px] w-full bg-gray-200 rounded-lg h-[5px] overflow-hidden relative">
      <div
        className="h-full bg-green-500 transition-all duration-500"
        style={{ width: `${clampedPercent}%` }}
      ></div>
      Percentage Text
      {/* <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white">
        {clampedPercent}%
      </span> */}
    </div>
  );
};

export default ProgressBar;
