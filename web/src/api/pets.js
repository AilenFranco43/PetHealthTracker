const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export const createPetRequest = async (formData) => {
  // Obtener token
  const token = localStorage.getItem("token");
  console.log("Token en localStorage:", token ? "Presente" : "Ausente");

  const res = await fetch(`${API_URL}/pets`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });

  console.log("Respuesta status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Error al crear mascota: ${res.status} ${errorText}`);
  }

  return res.json();
};

export const getPetsRequest = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/pets`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
  return await res.json();
};

export const getPetByIdRequest = async (id) => {
  const res = await fetch(`${API_URL}/pets/${id}`, { credentials: "include" });
  return await res.json();
};

export const updatePetRequest = async (petId, formData) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/pets/${petId}`, {
    method: "PATCH",
    body: formData,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log("Update response status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error response:", errorText);
    throw new Error(`Error al actualizar mascota: ${res.status} ${errorText}`);
  }

  const result = await res.json();
  console.log("Update successful:", result);
  return result;
};

export const deletePetRequest = async (petId) => {
  const res = await fetch(`${API_URL}/pets/${petId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return await res.json();
};
