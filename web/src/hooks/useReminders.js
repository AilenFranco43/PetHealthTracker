// useReminders.js
import { useState } from "react";
import {
  getRemindersRequest,
  getReminderByIdRequest,
  createReminderRequest,
  updateReminderRequest,
  deleteReminderRequest,
} from "../api/reminders";

export function useReminders() {
  const [loading, setLoading] = useState(false);

  const getReminders = async () => {
    setLoading(true);
    try {
      return await getRemindersRequest();
    } finally {
      setLoading(false);
    }
  };

  const getReminderById = async (id) => {
    return await getReminderByIdRequest(id);
  };

  const createReminder = async (data) => {
    return await createReminderRequest(data);
  };

  const updateReminder = async (id, data) => {
    return await updateReminderRequest(id, data);
  };

  const deleteReminder = async (id) => {
    return await deleteReminderRequest(id);
  };

  return {
    loading,
    getReminders,
    getReminderById,
    createReminder,
    updateReminder,
    deleteReminder,
  };
}
