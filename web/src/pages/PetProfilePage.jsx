// PetProfilePage.jsx - Versión actualizada
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  PawPrint,
  Cake,
  Weight,
  Pencil,
  Trash2,
  ArrowLeft,
  X,
  PlusCircle,
  Syringe,
  FileText,
  Pill,
} from "lucide-react";
import RecordCard from "../components/health/RecordCard"; // Importar RecordCard
import PetForm from "../components/pets/PetForm";
import { usePets } from "../hooks/usePets";
import PetProfileSkeleton from "../components/pets/PetProfileSkeleton";
import toast from "react-hot-toast";
import { useHealthRecords } from "../hooks/useHealthRecords";

export default function PetProfilePage() {
  const { id } = useParams();
  const { getPetById, updatePet, deletePet } = usePets();
  const { getHealthRecordsByPet, deleteHealthRecord } = useHealthRecords();

  const [healthRecords, setHealthRecords] = useState([]);
  const [pet, setPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [recordsLoading, setRecordsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setInitialLoading(true);
        const petData = await getPetById(id);
        setPet(petData);
        await loadHealthRecords();
      } catch (error) {
        toast.error("Error al cargar la mascota");
      } finally {
        setInitialLoading(false);
      }
    };

    loadData();
  }, [id]);


const loadHealthRecords = async () => {
  try {
    setRecordsLoading(true);
    
    
    const records = await getHealthRecordsByPet(id);
 
    
    setHealthRecords(records);
  } catch (error) {
   
    toast.error("Error al cargar registros de salud");
  } finally {
    setRecordsLoading(false);
  }
};
  const handleDeleteRecord = async (recordId) => {
    try {
      await deleteHealthRecord(recordId);
      toast.success("Registro eliminado correctamente");
      // Recargar los registros después de eliminar
      await loadHealthRecords();
    } catch (error) {
      toast.error("Error al eliminar el registro");
    }
  };

  const getRecordType = (type) => {
    switch (type) {
      case "VACUNA":
        return "vaccine";
      case "CHEQUEO":
        return "checkup";
      case "TRATAMIENTO":
        return "treatment";
      default:
        return "treatment";
    }
  };

  const handleSaveEdit = async (formDataOrObject) => {
    setLoading(true);
    const loadingToast = toast.loading("Actualizando mascota...");

    try {
      let updated;

      if (formDataOrObject instanceof FormData) {
        updated = await updatePet(id, formDataOrObject);
      } else {
        const form = new FormData();

        if (formDataOrObject.name !== undefined) {
          form.append("name", formDataOrObject.name);
        }
        if (formDataOrObject.specie !== undefined) {
          form.append("specie", formDataOrObject.specie);
        }
        if (formDataOrObject.breed !== undefined) {
          form.append("breed", formDataOrObject.breed);
        }
        if (formDataOrObject.age !== undefined) {
          form.append("age", formDataOrObject.age);
        }
        if (formDataOrObject.weight !== undefined) {
          form.append("weight", formDataOrObject.weight);
        }
        if (
          formDataOrObject.photo_url !== undefined &&
          formDataOrObject.photo_url instanceof File
        ) {
          form.append("photo_url", formDataOrObject.photo_url);
        }

        updated = await updatePet(id, form);
      }

      setPet(updated);
      setIsEditing(false);

      toast.dismiss(loadingToast);
      toast.success("¡Mascota actualizada exitosamente!");
    } catch (error) {
      console.error("Error actualizando mascota:", error);
      toast.dismiss(loadingToast);
      toast.error("Error al actualizar mascota");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    const loadingToast = toast.loading("Eliminando mascota...");

    try {
      await deletePet(id);
      toast.dismiss(loadingToast);
      toast.success("Mascota eliminada exitosamente");

      setTimeout(() => {
        window.location.href = "/pets";
      }, 1500);
    } catch (error) {
      console.error("Error eliminando mascota:", error);
      toast.dismiss(loadingToast);
      toast.error("Error al eliminar mascota");
      setLoading(false);
    }
  };

  // SOLO MOSTRAR SKELETON MIENTRAS CARGA
  if (initialLoading) {
    return <PetProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <Link to="/pets" className="flex gap-3 mb-5 text-gray-500 font-medium">
        <ArrowLeft /> Volver a mascotas
      </Link>

      <div className="max-w-3xl mx-auto p-4 relative">
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-emerald-500 to-teal-600 p-4 lg:p-6 lg:rounded-t-3xl"></div>

        <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto text-center z-10 relative">
          <div className="flex justify-center">
            <img
              src={pet.photo_url}
              alt={pet.name}
              className="w-36 h-36 rounded-full object-cover shadow-md"
            />
          </div>

          <h1 className="text-3xl font-semibold mt-4">{pet.name}</h1>

          <p className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {pet.specie}
          </p>

          <div className="flex justify-center gap-3 mt-10 text-center">
            <div className="flex flex-col items-center w-[180px]">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
                <Cake className="text-blue-500" size={22} />
              </div>
              <p className="mt-2 text-gray-500 text-sm">Edad</p>
              <p>{pet.age ? `${pet.age}` : "No especificado"}</p>
            </div>

            <div className="flex flex-col items-center w-[180px]">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex justify-center items-center">
                <Weight className="text-purple-500" size={22} />
              </div>
              <p className="mt-2 text-gray-500 text-sm">Peso</p>
              <p>{pet.weight > 0 ? `${pet.weight} kg` : "No especificado"}</p>
            </div>

            <div className="flex flex-col items-center w-[180px]">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex justify-center items-center">
                <PawPrint className="text-yellow-600" size={22} />
              </div>
              <p className="mt-2 text-gray-500 text-sm">Raza</p>
              <p>{pet.breed ? `${pet.breed}` : "No especificado"}</p>
            </div>
          </div>

          <div className="flex justify-center gap-6 mt-10">
            <button
              onClick={() => setIsEditing(true)}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-2 border border-teal-300 text-teal-600 rounded-xl hover:bg-teal-50 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                  Procesando...
                </>
              ) : (
                <>
                  <Pencil size={18} /> Editar
                </>
              )}
            </button>

            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-2 border rounded-xl text-red-600 border-red-300 hover:bg-red-50 transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 size={18} /> {loading ? "Procesando..." : "Eliminar"}
            </button>
          </div>
        </div>

        {/* Sección de registros de salud */}
        <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Registros de salud
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Historial médico de {pet.name}
              </p>
            </div>
            
            <Link 
              to="/health?tab=vaccines"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium shadow-sm hover:shadow"
            >
              <PlusCircle size={18} />
              <span>Agregar registro</span>
            </Link>
          </div>

          {recordsLoading ? (
            <div className="space-y-4">
              {/* Skeleton para registros */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-gray-100 rounded-xl p-5 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : healthRecords.length > 0 ? (
            <div className="space-y-4">
              {healthRecords.map((record) => (
                <RecordCard
                  key={record.id}
                  data={record}
                  type={getRecordType(record.type)}
                  onDelete={handleDeleteRecord}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Syringe className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No hay registros de salud
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Aún no has agregado ningún registro de salud para {pet.name}. 
                ¡Comienza a registrar vacunas, chequeos y tratamientos!
              </p>
              <Link 
                to="/health?tab=vaccines"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                <PlusCircle size={20} />
                <span>Crear primer registro</span>
              </Link>
            </div>
          )}

          {/* Contador por tipo de registro */}
          {healthRecords.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Vacunas: {healthRecords.filter(r => r.type === "VACUNA").length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Chequeos: {healthRecords.filter(r => r.type === "CHEQUEO").length}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">
                    Tratamientos: {healthRecords.filter(r => r.type === "TRATAMIENTO").length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md relative">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Editar Mascota</h2>
              <button
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="p-1 hover:bg-gray-100 rounded-full disabled:opacity-50"
              >
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

            {/* Loading overlay dentro del modal*/}
            {loading && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-700 font-medium">
                    Guardando cambios...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-2">
              Confirmar Eliminación
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar a{" "}
              <span className="font-semibold">{pet.name}</span>? Esta acción no
              se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={loading}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Eliminando...
                  </span>
                ) : (
                  "Sí, Eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}