import { useState } from "react";
import {
  getWeightRecordsRequest,
  createWeightRecordRequest,
} from "../api/weightRecords";

export function useWeightRecords() {
  const [weights, setWeights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getWeights = async (petId) => {
    try {
      setLoading(true);
      const data = await getWeightRecordsRequest(petId);
      setWeights(data);
    } catch (err) {
      setError("Error al cargar historial de peso");
    } finally {
      setLoading(false);
    }
  };

  const addWeight = async (petId, weightData) => {
    try {
      setLoading(true);
      const newWeight = await createWeightRecordRequest(petId, weightData);
      setWeights((prev) => [...prev, newWeight]);
      return newWeight;
    } catch (err) {
      setError("Error al guardar peso");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    weights,
    loading,
    error,
    getWeights,
    addWeight,
  };
}
