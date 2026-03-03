import { Cake, Weight, PawPrint } from "lucide-react";

export default function PetStats({ age, breed, lastWeight }) {
  return (
    <div className="flex justify-center gap-3 mt-10 text-center">
      <div className="flex flex-col items-center w-[180px]">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
          <Cake className="text-blue-500" size={22} />
        </div>
        <p className="mt-2 text-gray-500 text-sm">Edad</p>
        <p>{age ? age : "No especificado"}</p>
      </div>

      <div className="flex flex-col items-center w-[180px]">
        <div className="w-12 h-12 rounded-full bg-purple-100 flex justify-center items-center">
          <Weight className="text-purple-500" size={22} />
        </div>
        <p className="mt-2 text-gray-500 text-sm">Peso</p>
        <p>{lastWeight ? `${lastWeight} kg` : "No especificado"}</p>
      </div>

      <div className="flex flex-col items-center w-[180px]">
        <div className="w-12 h-12 rounded-full bg-yellow-100 flex justify-center items-center">
          <PawPrint className="text-yellow-600" size={22} />
        </div>
        <p className="mt-2 text-gray-500 text-sm">Raza</p>
        <p>{breed || "No especificado"}</p>
      </div>
    </div>
  );
}
