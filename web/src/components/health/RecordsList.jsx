import React from "react";
import RecordCard from "./RecordCard";

const RecordsList = ({ data, tab, onDelete, onClick }) => {
  const type =
    tab === "vaccines"
      ? "vaccine"
      : tab === "checkups"
      ? "checkup"
      : "treatment";

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <RecordCard
          key={item.id}
          data={item}
          type={type}
          onDelete={onDelete}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default RecordsList;