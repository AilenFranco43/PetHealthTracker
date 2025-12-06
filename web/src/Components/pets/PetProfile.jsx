import React, { useState } from "react";
import {
  Calendar,
  Cake,
  Weight,
  Edit3,
  Trash2,
  AlertCircle,
} from "lucide-react";

const PetProfile = ({ pet, onBack, onEdit, onDelete, deleting = false }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = () => {
    if (
      window.confirm(
        `¿Estás seguro de eliminar a ${pet.name}? Esta acción no se puede deshacer.`
      )
    ) {
      onDelete(pet.id);
    }
  };

  return (
    <div className="p-4">
      {/* CARD PRINCIPAL */}
      <div>
        {/* Imagen */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-white">
            <img
              src={pet.photo_url || pet.image || "/default-pet.jpg"}
              alt={pet.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/default-pet.jpg";
              }}
            />
          </div>

          {/* Nombre */}
          <h2 className="text-2xl font-semibold mt-4 text-gray-900">
            {pet.name}
          </h2>

          {/* Badge especie */}
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full mt-1">
            {pet.specie || pet.species}
          </span>
        </div>

        {/* DATOS DE LA MASCOTA */}
        <div className="flex justify-center gap-10 mt-8">
          {/* Edad */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Cake className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Edad</p>
            <p className="text-gray-800 font-medium">
              {pet.age || "No especificada"}
            </p>
          </div>

          {/* Peso */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Weight className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Peso</p>
            <p className="text-gray-800 font-medium">
              {pet.weight ? `${pet.weight} kg` : "No especificado"}
            </p>
          </div>

          {/* Raza */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Raza</p>
            <p className="text-gray-800 font-medium text-sm">
              {pet.breed || "No especificada"}
            </p>
          </div>
        </div>

        {/* BOTONES */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          {/* Editar */}
          <button
            onClick={() => onEdit(pet)}
            className="
              flex items-center justify-center gap-2 py-3 
              border rounded-xl border-gray-300 
              hover:bg-gray-50 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            <Edit3 className="w-4 h-4" />
            Editar
          </button>

          {/* Eliminar - Con confirmación */}
          {showDeleteConfirm ? (
            <div className="col-span-2 p-3 bg-red-50 border border-red-200 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm font-medium text-red-700">
                  ¿Eliminar definitivamente?
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-2 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    onDelete(pet.id);
                    setShowDeleteConfirm(false);
                  }}
                  disabled={deleting}
                  className="flex-1 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? "Eliminando..." : "Sí, eliminar"}
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              disabled={deleting}
              className="
                flex items-center justify-center gap-2 py-3 
                border rounded-xl border-red-300 text-red-600 
                hover:bg-red-50 transition
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              <Trash2 className="w-4 h-4" />
              {deleting ? "Eliminando..." : "Eliminar"}
            </button>
          )}
        </div>

        {/* Volver */}
        <div className="mt-6">
          <button
            onClick={onBack}
            className="w-full py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition"
          >
            ← Volver atrás
          </button>
        </div>

        {/* Fechas */}
        <div className="mt-6 pt-4 border-t text-xs text-gray-500">
          <p>Creado: {new Date(pet.created_at).toLocaleDateString()}</p>
          {pet.updated_at && pet.updated_at !== pet.created_at && (
            <p className="mt-1">
              Actualizado: {new Date(pet.updated_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetProfile;
