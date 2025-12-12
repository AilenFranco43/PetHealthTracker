import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getToken = () => localStorage.getItem("token");

// Crear HealthRecord (con archivos)
export const createHealthRecordRequest = async (data) => {
  const token = getToken();

  const formData = new FormData();

  for (const key in data) {
    if (key === "documents" && Array.isArray(data[key])) {
      data[key].forEach((file) => {
        formData.append("documents", file);
      });
    } else if (key === "document_urls" && Array.isArray(data[key])) {
      // CORRECCIÓN: Convertir a string JSON
      formData.append("document_urls", JSON.stringify(data[key]));
    } else if (key !== "documents") {
      if (typeof data[key] === "object" && data[key] !== null) {
        formData.append(key, JSON.stringify(data[key]));
      } else {
        formData.append(key, String(data[key]));
      }
    }
  }

  console.log("Create - FormData contenido:");
  for (let pair of formData.entries()) {
    console.log(pair[0], pair[1]);
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
export const getHealthRecordsByPetRequest = async (petId) => {
  const token = getToken();

  const res = await fetch(`${API_URL}/health-records/pet/${petId}`, {
    headers: { Authorization: `Bearer ${token}` },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error al obtener registros: ${res.status}`);
  }

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

export const updateHealthRecordRequest = async (id, data) => {
  const token = getToken();

  console.log("=== INICIO updateHealthRecordRequest ===");
  console.log("ID:", id);
  console.log("Data completa:", data);

  // Función para verificar si es un archivo
  const isFile = (obj) => {
    return (
      obj &&
      typeof obj === "object" &&
      obj.constructor &&
      obj.constructor.name === "File" &&
      obj.name !== undefined &&
      obj.size !== undefined &&
      obj.type !== undefined
    );
  };

  // Verificar si hay archivos
  let hasFiles = false;
  if (data && data.documents) {
    if (Array.isArray(data.documents) && data.documents.length > 0) {
      hasFiles = data.documents.some((item) => isFile(item));
      console.log("Array documents detectado, hasFiles:", hasFiles);
    } else if (isFile(data.documents)) {
      // Si documents es un solo archivo, convertirlo a array
      data.documents = [data.documents];
      hasFiles = true;
      console.log("Single file convertido a array");
    }
  }

  console.log("¿Tiene archivos?", hasFiles);

  if (hasFiles) {
    console.log("Procesando CON archivos...");
    const formData = new FormData();

    // Agregar archivos
    data.documents.forEach((file) => {
      if (isFile(file)) {
        console.log("Agregando file:", file.name, file.type);
        formData.append("documents", file, file.name);
      }
    });

    // IMPORTANTE: Solo enviar document_urls si NO está vacío
    // Y enviarlo como múltiples campos document_urls[0], document_urls[1], etc.
    if (
      data.document_urls &&
      Array.isArray(data.document_urls) &&
      data.document_urls.length > 0
    ) {
      console.log(
        "Agregando document_urls como múltiples campos:",
        data.document_urls
      );

      // Enviar cada URL como campo separado
      data.document_urls.forEach((url, index) => {
        formData.append(`document_urls[${index}]`, url);
      });
    } else {
      console.log("document_urls está vacío o no existe, no se envía");
    }

    console.log("FormData final:");
    for (let [key, value] of formData.entries()) {
      console.log(key, isFile(value) ? `FILE: ${value.name}` : value);
    }

    const res = await fetch(`${API_URL}/health-records/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error response:", error);
      throw new Error(error);
    }

    const result = await res.json();
    console.log("Respuesta exitosa:", result);
    return result;
  } else {
    console.log("Procesando SIN archivos...");

    // Filtrar propiedades undefined/null
    const cleanData = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        cleanData[key] = data[key];
      }
    });

    console.log("JSON a enviar:", cleanData);

    const res = await fetch(`${API_URL}/health-records/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
      body: JSON.stringify(cleanData),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Error response:", error);
      throw new Error(error);
    }

    const result = await res.json();
    console.log("Respuesta exitosa:", result);
    return result;
  }
};
