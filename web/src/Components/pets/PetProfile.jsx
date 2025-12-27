import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmModal from "../common/ConfirmModal";
import Button from "../common/Button";
import HealthRecordsSection from "./HealthRecordsSection";
import PetStats from "./PetStats";
import PetForm from "./PetForm";
import PetProfileSkeleton from "./PetProfileSkeleton";
import { usePets } from "../../hooks/usePets";
import { useHealthRecords } from "../../hooks/useHealthRecords";
import toast from "react-hot-toast";
import { Pencil, Trash2, ArrowLeft, X } from "lucide-react";

export default function PetProfile({ petId }) {
  const { getPetById, updatePet, deletePet } = usePets();
  const { getHealthRecordsByPet, deleteHealthRecord } = useHealthRecords();

  const [healthRecords, setHealthRecords] = useState([]);
  const [pet, setPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(false);

  const lastRecord =
    pet?.weight_records?.length > 0
      ? [...pet.weight_records].sort(
          (a, b) => new Date(b.recorded_at) - new Date(a.recorded_at)
        )[0]
      : null;

  // ------------------- LOAD DATA -------------------
  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        const petData = await getPetById(petId);
        setPet(petData);
        await loadHealthRecords();
      } catch {
        toast.error("Error al cargar la mascota");
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [petId]);

  const loadHealthRecords = async () => {
    try {
      setRecordsLoading(true);
      const records = await getHealthRecordsByPet(petId);
      setHealthRecords(records);
    } catch {
      toast.error("Error al cargar registros de salud");
    } finally {
      setRecordsLoading(false);
    }
  };

  // ------------------- ACTIONS -------------------
  const handleDeleteRecord = async (recordId) => {
    try {
      await deleteHealthRecord(recordId);
      toast.success("Registro eliminado correctamente");
      await loadHealthRecords();
    } catch {
      toast.error("Error al eliminar el registro");
    }
  };

  const getRecordType = (type) => {
    switch (type) {
      case "VACUNA":
        return "vaccine";
      case "CHEQUEO":
        return "checkup";
      default:
        return "treatment";
    }
  };

  const handleSaveEdit = async (formData) => {
    setLoading(true);
    const loadingToast = toast.loading("Actualizando mascota...");

    try {
      const updated = await updatePet(petId, formData);
      setPet(updated);
      setIsEditing(false);
      toast.success("¡Mascota actualizada exitosamente!");
    } catch {
      toast.error("Error al actualizar mascota");
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Eliminando mascota...");

    try {
      await deletePet(petId);
      toast.success("Mascota eliminada exitosamente");
      setTimeout(() => (window.location.href = "/pets"), 1500);
    } catch {
      toast.error("Error al eliminar mascota");
      setLoading(false);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  // ------------------- UI -------------------
  if (initialLoading) {
    return <PetProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <Link to="/pets" className="flex gap-3 mb-5 text-gray-500 font-medium">
        <ArrowLeft /> Volver a mascotas
      </Link>

      <div className="max-w-3xl mx-auto p-4 relative">
        <div className="bg-white shadow-md rounded-2xl p-8 text-center">
          <img
            src={pet.photo_url}
            alt={pet.name}
            className="w-36 h-36 rounded-full mx-auto object-cover"
          />

          <h1 className="text-3xl font-semibold mt-4">{pet.name}</h1>

          <p className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {pet.specie}
          </p>

          <PetStats
            age={pet.age}
            breed={pet.breed}
            lastWeight={lastRecord?.weight}
          />

          {/* -------- ACTION BUTTONS -------- */}
        <div className="flex gap-4 mt-10">
  <Button
    type="button"
    mode="open"
    entity="mascota"
    loading={loading}
    full
    onClick={() => setIsEditing(true)}
  />

  <Button
    type="button"
    mode="delete"
    entity="mascota"
    loading={loading}
    full
    onClick={() => setShowDeleteConfirm(true)}
  />
</div>

        </div>

        <HealthRecordsSection
          petName={pet.name}
          records={healthRecords}
          loading={recordsLoading}
          onDeleteRecord={handleDeleteRecord}
          getRecordType={getRecordType}
        />
      </div>

      {/* -------- EDIT MODAL -------- */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md relative">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Editar Mascota</h2>
              <button onClick={() => setIsEditing(false)}>
                <X size={24} />
              </button>
            </div>

            <PetForm
              pet={pet}
              onSave={handleSaveEdit}
              onCancel={() => setIsEditing(false)}
              mode="edit"
              loading={loading}
            />
          </div>
        </div>
      )}

      {/* -------- DELETE CONFIRM -------- */}
      <ConfirmModal
        open={showDeleteConfirm}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que deseas eliminar a ${pet.name}?`}
        mode="delete"
        entity="mascota"
        loading={loading}
        onCancel={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
