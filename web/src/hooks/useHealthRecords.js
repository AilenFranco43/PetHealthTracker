import { useState } from "react";
import {
  getHealthRecordsRequest,
  getHealthRecordByIdRequest,
  createHealthRecordRequest,
  updateHealthRecordRequest,
  deleteHealthRecordRequest,
  getHealthRecordsByPetRequest,
} from "../api/healthRecords.js";

export function useHealthRecords() {
  const [loading, setLoading] = useState(false);

  const getHealthRecords = async () => {
    setLoading(true);
    try {
      return await getHealthRecordsRequest();
    } finally {
      setLoading(false);
    }
  };

  const getHealthRecordById = async (id) => {
    return await getHealthRecordByIdRequest(id);
  };

  const createHealthRecord = async (data) => {
    return await createHealthRecordRequest(data);
  };

  const updateHealthRecord = async (id, data) => {
    setLoading(true);
    try {
      
      const dataToSend = data || {};
      console.log("updateHealthRecord - ID:", id, "Data:", dataToSend);
      
      return await updateHealthRecordRequest(id, dataToSend);
    } catch (error) {
      console.error("Error en updateHealthRecord:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteHealthRecord = async (id) => {
    return await deleteHealthRecordRequest(id);
  };

  const getHealthRecordsByPet = async (petId) => {
    setLoading(true);
    try {
      const records = await getHealthRecordsByPetRequest(petId);

      return records.map((record) => ({
        ...record,

        pet: record.pet || { name: petId },
      }));
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    getHealthRecords,
    getHealthRecordById,
    createHealthRecord,
    updateHealthRecord,
    deleteHealthRecord,
    getHealthRecordsByPet, // ← agregado al return
  };
}
