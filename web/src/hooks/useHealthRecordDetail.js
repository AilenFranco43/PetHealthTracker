import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useHealthRecords } from "./useHealthRecords";
import {
  getRecordConfig,
  formatHealthDate,
  formatShortDate,
  getRelativeDate,
  formatPrintDate,
} from "../utils/healthRecordUtils";

export const useHealthRecordDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHealthRecordById, deleteHealthRecord } = useHealthRecords();

  const [record, setRecord] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecord();
  }, [id]);

  const loadRecord = async () => {
    try {
      setLoading(true);
      const data = await getHealthRecordById(id);
      setRecord(data);
    } catch (error) {
      console.error("Error loading record:", error);
      toast.error("Error al cargar el registro");
      navigate("/health");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHealthRecord(record.id);
      toast.success("✅ Registro eliminado correctamente");
      navigate("/health");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error(error.message || "Error al eliminar el registro");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const config = record ? getRecordConfig(record.type) : null;

  return {
    record,
    setRecord,
    config,
    loading,
    showDeleteConfirm,
    isDeleting,
    setShowDeleteConfirm,
    handleDelete,
    loadRecord,
    formatHealthDate,
    formatShortDate,
    getRelativeDate,
    formatPrintDate,
  };
};
