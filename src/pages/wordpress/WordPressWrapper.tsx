import React, { ReactNode } from "react";

// Define the props interface
interface WordPressWrapper {
  children: ReactNode; // Type for children (can be any valid React node)
  className?: string; // Optional className prop
}

// Define the component
const WordPressWrapper: React.FC<WordPressWrapper> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`max-w-[1440px]   mx-auto my-auto w-full px-4 sm:px-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default WordPressWrapper;
