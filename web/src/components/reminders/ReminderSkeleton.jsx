import React from "react";

const ReminderSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-2xl shadow-md p-4 mb-4">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export default ReminderSkeleton;
