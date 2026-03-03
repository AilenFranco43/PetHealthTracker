import React from "react";
import ReminderCard from "./ReminderCard";
import ReminderSkeleton from "./ReminderSkeleton";

export default function RemindersList({
  reminders,
  onDelete,
  onToggleCompleted,
  loading,
}) {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        <ReminderSkeleton />
        <ReminderSkeleton />
        <ReminderSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {reminders.map((reminder) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          onDelete={onDelete}
          onToggleCompleted={onToggleCompleted}
        />
      ))}
    </div>
  );
}
