const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Obtener registros por mascota
export const getNutritionRecordsRequest = async (petId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/nutrition-records?petId=${petId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Error al cargar nutrición");
  return res.json();
};

// Crear registro
export const createNutritionRecordRequest = async (data) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/nutrition-records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!res.ok) throw new Error("Error al crear registro");
  return res.json();
};

// Eliminar registro
export const deleteNutritionRecordRequest = async (recordId) => {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_URL}/nutrition-records/${recordId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    }
  );

  if (!res.ok) throw new Error("Error al eliminar registro");
  return res.json();
};
