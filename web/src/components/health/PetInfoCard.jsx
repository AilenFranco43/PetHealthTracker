import React from "react";
import { PawPrint, ChevronLeft } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";

const PetInfoCard = ({ pet }) => {
  if (!pet) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden p-6">
        <p className="text-gray-500">
          No hay información de la mascota disponible
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <PawPrint className="w-5 h-5 text-blue-500" />
            Información de la mascota
          </h2>
          <RouterLink
            to={`/pets/${pet.id}`}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
          >
            Ver perfil completo
            <ChevronLeft className="w-4 h-4 rotate-180" />
          </RouterLink>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar de mascota */}
            <div className="relative flex-shrink-0">
              <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                {pet.photo_url ? (
                  <img
                    src={pet.photo_url}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <PawPrint className="w-12 h-12 text-blue-400" />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Información principal */}
            <div className="flex-1">
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-gray-900 mb-1">
                  {pet.name || "Mascota sin nombre"}
                </h3>
                <div className="flex items-center gap-2 text-gray-600">
                  {pet.specie && (
                    <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {pet.specie}
                    </span>
                  )}
                  {pet.breed && (
                    <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                      {pet.breed}
                    </span>
                  )}
                </div>
              </div>

              {/* Info adicional si existe */}
              {(pet.age || pet.weight) && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-3">
                    {pet.age && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm">Edad: {pet.age}</span>
                      </div>
                    )}
                    {pet.weight && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span className="text-sm">Peso: {pet.weight} kg</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetInfoCard;
