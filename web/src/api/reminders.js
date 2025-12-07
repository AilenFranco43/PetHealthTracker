// reminders.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Obtener token
const getToken = () => localStorage.getItem("token");

//  Crear un recordatorio
export const createReminderRequest = async (data) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/reminders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al crear recordatorio: ${text}`);
  }

  return await res.json();
};

//  Obtener todos los recordatorios
export const getRemindersRequest = async () => {
  const token = getToken();

  const res = await fetch(`${API_URL}/reminders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  return await res.json();
};

//  Obtener un recordatorio por ID
export const getReminderByIdRequest = async (id) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/reminders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  return await res.json();
};

//  Actualizar recordatorio
export const updateReminderRequest = async (id, data) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/reminders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error al actualizar recordatorio: ${text}`);
  }

  return await res.json();
};

//  Eliminar recordatorio
export const deleteReminderRequest = async (id) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/reminders/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  return await res.json();
};
