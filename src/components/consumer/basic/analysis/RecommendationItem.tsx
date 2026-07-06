import React from "react";

interface RecommendationItemProps {
  index: number;
  title: string;
  description: string;
}

const RecommendationItem: React.FC<RecommendationItemProps> = ({
  index,
  title,
  description,
}) => {
  return (
    <div className="flex gap-3">
      <span className="shrink-0 w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
        {index}
      </span>
      <div>
        <p className="font-bold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default RecommendationItem;
