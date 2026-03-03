import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function PetRecentRecords({ records = [] }) {
  return (
    <div className="mt-10">
      {/* TÍTULO */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Registros Recientes</h2>
        <Link to={"/health"} className="text-emerald-600 font-medium">Ver todos</Link>
      </div>

      {/* LISTA */}
      <div className="space-y-4">
        {records.length > 0 ? (
          records.map((record) => (
            <div
              key={record.id}
              className="
                p-4 bg-white border-0 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98 flex justify-between items-center rounded-xl
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
  );
}
