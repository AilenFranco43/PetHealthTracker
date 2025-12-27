const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Obtener historial de peso
export const getWeightRecordsRequest = async (petId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/pets/${petId}/weight`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al cargar historial de peso");
  return res.json();
};

// Crear registro de peso
export const createWeightRecordRequest = async (petId, data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/pets/${petId}/weight`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al guardar peso");
  return res.json();
};
