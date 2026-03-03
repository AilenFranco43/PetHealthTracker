import React from "react";

const UpcomingEventsSkeleton = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-20 bg-gray-200 animate-pulse rounded-2xl"
        ></div>
      ))}
    </div>
  );
};

export default UpcomingEventsSkeleton;
