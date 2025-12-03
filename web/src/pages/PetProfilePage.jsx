import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { petsData } from "../../data/petsData"; 
import { Calendar, Weight, BadgeInfo, Pencil, Trash2, Dog, Cat } from "lucide-react";

export default function PetProfilePage() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {

    const foundPet = petsData.find((p) => p.id === id);
    setPet(foundPet);
  }, [id]);

  if (!pet) return <p>Cargando...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* ENCABEZADO DE LA MASCOTA */}
       <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto text-center">

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
        {pet.type === "dog" ? "Perro" : "Gato"}
      </p>

      {/* INFO PRINCIPAL */}
      <div className="flex justify-center gap-14 mt-10 text-center">

        {/* EDAD */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
            <Calendar className="text-blue-500" size={22} />
          </div>
          <p className="mt-2 text-gray-500 text-sm">Edad</p>
          <p className="font-medium">{pet.age}</p>
        </div>

        {/* PESO */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex justify-center items-center">
            <Weight className="text-purple-500" size={22} />
          </div>
          <p className="mt-2 text-gray-500 text-sm">Peso</p>
          <p className="font-medium">{pet.weight}</p>
        </div>

        {/* RAZA */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-100 flex justify-center items-center">
            <BadgeInfo className="text-yellow-600" size={22} />
          </div>
          <p className="mt-2 text-gray-500 text-sm">Raza</p>
          <p className="font-medium">{pet.breed}</p>
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex justify-center gap-6 mt-10">

        {/* EDITAR */}
        <button className="flex items-center gap-2 px-6 py-2 border rounded-xl hover:bg-gray-100 transition">
          <Pencil size={18} /> Editar
        </button>

        {/* ELIMINAR */}
        <button className="flex items-center gap-2 px-6 py-2 border rounded-xl text-red-600 border-red-300 hover:bg-red-50 transition">
          <Trash2 size={18} /> Eliminar
        </button>
      </div>
    </div>

      {/* REGISTROS RECIENTES */}
      <div className="mt-10">
      {/* TÍTULO */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Registros Recientes</h2>
        <button className="text-emerald-600 font-medium">Ver todos</button>
      </div>

      {/* LISTA */}
      <div className="space-y-4">
        {pet.recentRecords?.length > 0 ? (
          pet.recentRecords.map((record) => (
            <div
              key={record.id}
              className="
                bg-white rounded-xl shadow-sm p-5 
                flex items-center justify-between
              "
            >
              {/* IZQUIERDA */}
              <div className="flex items-center gap-4">
                {/* ICONO */}
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Calendar className="text-emerald-600" size={24} />
                </div>

                {/* TEXTO */}
                <div>
                  <p className="font-medium text-lg">{record.title}</p>
                  <p className="text-gray-500 text-sm">{record.date}</p>
                </div>
              </div>

              {/* ESTADO */}
              <span className="text-emerald-600 bg-green-100 px-4 py-1 rounded-full text-sm font-medium">
                Completado
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay registros recientes.</p>
        )}
      </div>
    </div>
    </div>
  );
}
