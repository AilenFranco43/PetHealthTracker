import React from "react";
import { Calendar, Cake, Weight, Edit3, Trash2 } from "lucide-react";

const PetProfile = ({ pet, onBack, onViewRecords }) => {
  return (
    <div className="">
     
      

      {/* CARD PRINCIPAL */}
      <div className="">
        
        {/* Imagen */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md border-4 border-white">
            <img
              src={pet.image}
              alt={pet.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nombre */}
          <h2 className="text-2xl font-semibold mt-4 text-gray-900">
            {pet.name}
          </h2>

          {/* Badge especie */}
          <span className="bg-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1 rounded-full mt-1">
            {pet.species}
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
            <p className="text-gray-800 font-medium">{pet.age}</p>
          </div>

          {/* Peso */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Weight className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Peso</p>
            <p className="text-gray-800 font-medium">{pet.weight}</p>
          </div>

          {/* Raza */}
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-sm text-gray-500 mt-2">Raza</p>
            <p className="text-gray-800 font-medium text-sm">{pet.breed}</p>
          </div>

        </div>

        {/* BOTONES */}
        <div className="grid grid-cols-2 gap-4 mt-10">

          {/* Editar */}
          <button className="
            flex items-center justify-center gap-2 py-3 
            border rounded-xl border-gray-300 
            hover:bg-gray-50 transition
          ">
            <Edit3 className="w-4 h-4" />
            Editar
          </button>

          {/* Eliminar */}
          <button className="
            flex items-center justify-center gap-2 py-3 
            border rounded-xl border-red-300 text-red-600 
            hover:bg-red-50 transition
          ">
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>

        </div>
      </div>
    </div>
  );
};

export default PetProfile;
