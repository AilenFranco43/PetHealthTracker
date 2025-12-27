import { useState } from "react";
import {
  getNutritionRecordsRequest,
  createNutritionRecordRequest,
  deleteNutritionRecordRequest,
} from "../api/nutritionRecords";

export function useNutritionRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Obtener registros por mascota
  const getRecords = async (petId) => {
    try {
      setLoading(true);
      const data = await getNutritionRecordsRequest(petId);
      setRecords(data);
      return data;
    } catch (err) {
      setError("Error al cargar registros de nutrición");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Crear registro (pet_id viene dentro del body)
  const createRecord = async (data) => {
    try {
      setLoading(true);
      const newRecord = await createNutritionRecordRequest(data);
      setRecords((prev) => [...prev, newRecord]);
      return newRecord;
    } catch (err) {
      setError("Error al crear registro");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar registro
  const deleteRecord = async (recordId) => {
    try {
      setLoading(true);
      await deleteNutritionRecordRequest(recordId);
      setRecords((prev) => prev.filter((r) => r.id !== recordId));
    } catch (err) {
      setError("Error al eliminar registro");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    records,
    loading,
    error,
    getRecords,
    createRecord,
    deleteRecord,
  };
}
