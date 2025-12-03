import React from "react";
import { Plus } from "lucide-react";

const AddPetBtn = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full border-2 border-dashed border-teal-500 rounded-2xl bg-teal-50 flex flex-col sm:flex-row gap-4 sm:gap-5 items-center justify-center sm:justify-start h-[130px] sm:h-[150px] cursor-pointer transition-transform hover:scale-[1.02] p-4 sm:pl-10"
    >

      <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
        <Plus className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 text-emerald-600" />
      </div>

  
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
        <h3 className="text-gray-900 text-base sm:text-lg lg:text-xl font-medium">
          Agregar nueva mascota
        </h3>
        <p className="text-xs sm:text-sm lg:text-base text-gray-600">
          Registra una nueva mascota en tu perfil
        </p>
      </div>
    </button>
  );
};

export default AddPetBtn;
