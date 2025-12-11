const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

// Crear HealthRecord  (con archivos)
export const createHealthRecordRequest = async (data) => {
  const token = getToken();

  const formData = new FormData();

  for (const key in data) {
    if (key !== "documents") formData.append(key, data[key]);
  }

  // Adjuntar archivos
  if (data.documents && data.documents.length > 0) {
    data.documents.forEach((file) => {
      formData.append("documents", file);
    });
  }

  const res = await fetch(`${API_URL}/health-records`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

// Obtener todos
export const getHealthRecordsRequest = async () => {
  const token = getToken();

  const res = await fetch(`${API_URL}/health-records`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  return await res.json();
};

// Obtener uno
export const getHealthRecordByIdRequest = async (id) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/health-records/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  return await res.json();
};

// Obtener registros de una mascota específica

// Obtener registros de una mascota específica
export const getHealthRecordsByPetRequest = async (petId) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/health-records/pet/${petId}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  // FALTA ESTA PARTE:
  if (!res.ok) {
    throw new Error(`Error al obtener registros: ${res.status}`);
  }
  
  return await res.json(); 
};

// Actualizar (PATCH)
export const updateHealthRecordRequest = async (id, data) => {
  const token = getToken();

  const formData = new FormData();

  for (const key in data) {
    if (key !== "documents") formData.append(key, data[key]);
  }

  if (data.documents && data.documents.length > 0) {
    data.documents.forEach((file) => {
      formData.append("documents", file);
    });
  }

  const res = await fetch(`${API_URL}/health-records/${id}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json();
};

// Eliminar
export const deleteHealthRecordRequest = async (id) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/health-records/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  return await res.json();
};
