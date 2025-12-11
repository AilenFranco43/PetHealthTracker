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
    return await updateHealthRecordRequest(id, data);
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
