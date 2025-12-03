import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { petsData } from "../../data/petsData";
import { Link } from "react-router-dom";
import {
  PawPrint,
  Cake,
  Weight,
  Pencil,
  Trash2,
  ArrowLeft,
  X,
} from "lucide-react";
import PetRecentRecords from "../components/pets/PetRecentRecords";
import PetForm from "../components/pets/PetForm"; // Usamos el PetForm existente

export default function PetProfilePage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const foundPet = petsData.find((p) => p.id === id);
    setPet(foundPet);
  }, [id]);

  // Función para guardar cambios editados
  const handleSaveEdit = (updatedData) => {
    console.log("Guardando cambios:", updatedData);
    
    // Preparar datos según tu estructura
    const dataToSave = {
      ...updatedData,
      weight: updatedData.weight ? parseFloat(updatedData.weight) : null,
      // Si mantienes image en lugar de photo_url en petsData
      image: updatedData.photo_url || pet.image,
    };
    
    // Actualizar el estado local
    setPet({
      ...pet,
      ...dataToSave,
      // Mantener los campos que no se editan
      id: pet.id,
      recentRecords: pet.recentRecords,
    });
    
    setIsEditing(false);
    alert("¡Mascota actualizada exitosamente!");
  };

  // Función para eliminar mascota
  const handleDelete = () => {
    console.log("Eliminando mascota:", id);
    
    // Redirigir a la página de mascotas después de eliminar
    window.location.href = "/pets";
    alert("Mascota eliminada exitosamente");
  };

  if (!pet) return <p>Cargando...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <Link to={"/pets"} className="flex gap-3 mb-5 text-gray-500 font-medium">
        <ArrowLeft /> Volver a mascotas
      </Link>

      <div className="max-w-3xl mx-auto p-4 relative">
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-emerald-500 to-teal-600 p-4 lg:p-6 lg:rounded-t-3xl"></div>
        
        {/* ENCABEZADO DE LA MASCOTA */}
        <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto text-center z-10 relative">
          {/* FOTO */}
          <div className="flex justify-center">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-36 h-36 rounded-full object-cover shadow-md"
            />
          </div>

          {/* NOMBRE */}
          <h1 className="text-3xl font-semibold mt-4">{pet.name}</h1>

          {/* TIPO */}
          <p className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            {pet.specie}
          </p>

          {/* INFO PRINCIPAL */}
          <div className="flex justify-center gap-3 mt-10 text-center">
            {/* EDAD */}
            <div className="flex flex-col items-center w-[180px]">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
                <Cake className="text-blue-500" size={22} />
              </div>
              <p className="mt-2 text-gray-500 text-sm">Edad</p>
              <p>{pet.age}</p>
            </div>

            {/* PESO */}
            <div className="flex flex-col items-center w-[180px]">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex justify-center items-center">
                <Weight className="text-purple-500" size={22} />
              </div>
              <p className="mt-2 text-gray-500 text-sm">Peso</p>
              <p>{pet.weight}</p>
            </div>

            {/* RAZA */}
            <div className="flex flex-col items-center w-[180px]">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex justify-center items-center">
                <PawPrint className="text-yellow-600" size={22} />
              </div>
              <p className="mt-2 text-gray-500 text-sm">Raza</p>
              <p>{pet.breed}</p>
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex justify-center gap-6 mt-10">
            {/* EDITAR */}
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-2 px-6 py-2 border border-teal-300 text-teal-600 rounded-xl hover:bg-teal-50 transition w-full"
            >
              <Pencil size={18} /> Editar
            </button>

            {/* ELIMINAR */}
            <button 
              onClick={() => setShowDeleteConfirm(true)}
              className="flex items-center justify-center gap-2 px-6 py-2 border rounded-xl text-red-600 border-red-300 hover:bg-red-50 transition w-full"
            >
              <Trash2 size={18} /> Eliminar
            </button>
          </div>
        </div>

        {/* REGISTROS RECIENTES */}
        <div className="mt-10">
          <PetRecentRecords records={pet.recentRecords} />
        </div>
      </div>

      {/* MODAL DE EDICIÓN */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md relative">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">Editar Mascota</h2>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>

            {/* Usar el PetForm existente en modo "edit" */}
            <PetForm 
              pet={pet}
              onSave={handleSaveEdit}
              onCancel={() => setIsEditing(false)}
              mode="edit"
            />
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <h3 className="text-xl font-semibold mb-2">Confirmar Eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar a <span className="font-semibold">{pet.name}</span>? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}