import { Link } from "react-router-dom";
import {
  Syringe,
  PlusCircle,
} from "lucide-react";
import RecordCard from "../health/RecordCard";



export default function HealthRecordsSection({
  petName,
  records,
  loading,
  onDeleteRecord,
  getRecordType,
}) {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Registros de salud
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Historial médico de {petName}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-gray-100 rounded-xl p-5 animate-pulse"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : records.length > 0 ? (
        <div className="space-y-4">
          {records.map((record) => (
            <RecordCard
              key={record.id}
              data={record}
              type={getRecordType(record.type)}
              onDelete={onDeleteRecord}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-2">
          <div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Syringe className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay registros de salud
          </h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Aún no has agregado ningún registro de salud para {petName}.
          </p>
          <Link
            to="/health?tab=vaccines"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl"
          >
            <PlusCircle size={20} />
            Crear primer registro
          </Link>
        </div>
      )}

      {records.length > 0 && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-4">
            <span className="text-sm text-gray-600">
              Vacunas: {records.filter((r) => r.type === "VACUNA").length}
            </span>
            <span className="text-sm text-gray-600">
              Chequeos: {records.filter((r) => r.type === "CHEQUEO").length}
            </span>
            <span className="text-sm text-gray-600">
              Tratamientos: {records.filter((r) => r.type === "TRATAMIENTO").length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
