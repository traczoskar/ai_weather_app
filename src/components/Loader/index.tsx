import React from "react";

interface LoaderProps {
  borderColor: string;
}

const Loader: React.FC<LoaderProps> = ({ borderColor }) => {
  return (
    <div
      className={`w-5 h-5 border-4 border-dashed rounded-full animate-spin border-t-transparent ${borderColor}`}
    ></div>
  );
};

export default Loader;
