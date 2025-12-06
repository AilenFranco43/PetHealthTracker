import { useState, useEffect } from "react";
import {
  createPetRequest,
  getPetsRequest,
  getPetByIdRequest,
  updatePetRequest,
  deletePetRequest,
} from "../api/pets";

export function usePets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener todas las mascotas
  const getPets = async () => {
    try {
      setLoading(true);
      const data = await getPetsRequest();
      setPets(data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar mascotas");
    } finally {
      setLoading(false);
    }
  };

  // Obtener mascota por ID
  const getPetById = async (id) => {
    try {
      setLoading(true);
      return await getPetByIdRequest(id);
    } catch (err) {
      console.error(err);
      setError("Error al cargar mascota");
    } finally {
      setLoading(false);
    }
  };

  // Crear mascota
  const createPet = async (formData) => {
    try {
      setLoading(true);
      const newPet = await createPetRequest(formData);
      setPets((prev) => [...prev, newPet]);
      return newPet;
    } catch (err) {
      console.error(err);
      setError("Error al crear mascota");
    } finally {
      setLoading(false);
    }
  };

  // Editar mascota
  const updatePet = async (id, formData) => {
    try {
      setLoading(true);
      const updated = await updatePetRequest(id, formData);

      setPets((prev) => prev.map((p) => (p.id === id ? updated : p)));

      return updated;
    } catch (err) {
      console.error(err);
      setError("Error al actualizar mascota");
    } finally {
      setLoading(false);
    }
  };

  // Eliminar mascota
  const deletePet = async (id) => {
    try {
      setLoading(true);
      await deletePetRequest(id);
      setPets((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Error al eliminar mascota");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPets();
  }, []);

  return {
    pets,
    loading,
    error,
    getPets,
    getPetById,
    createPet,
    updatePet,
    deletePet,
  };
}
