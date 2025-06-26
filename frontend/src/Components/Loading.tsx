import React from "react";
import "../index.css";

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
      <span className="ml-4 text-xl font-semibold text-green-600">Loading...</span>
    </div>
  );
};

export default Loading;
