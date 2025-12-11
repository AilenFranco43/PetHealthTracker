import React from "react";
import {
  Calendar,
  Syringe,
  FileText,
  Pill,
  Clock,
  User,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

const HealthInfoCard = ({ record, config, formatDate, getRelativeDate }) => {
  // Validación
  if (!record) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden p-8">
        <p className="text-gray-500">
          No hay información del registro disponible
        </p>
      </div>
    );
  }

  const Icon = config.icon;
  const details = record.description?.split(" - ").slice(1).join(" - ");

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
      <div className="p-8">
        {/* Header  */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-100">
          <div className="flex items-start gap-4">
            <div
              className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center shadow-sm border border-white/50`}
            >
              <Icon className={`w-6 h-6 ${config.iconColor}`} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Información del Registro
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span
                  className={`px-3 py-1 ${config.badgeColor} rounded-full text-xs font-medium`}
                >
                  {record.type === "VACUNA"
                    ? "Vacunación"
                    : record.type === "TRATAMIENTO"
                    ? "Tratamiento"
                    : "Chequeo"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de 2 columnas más equilibrado */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Columna izquierda: Información principal */}
          <div className="space-y-6">
            {/* Tarjeta de fechas */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200/50">
              <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4.5 h-4.5 text-blue-600" />
                </div>
                <span>Fechas importantes</span>
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">
                    Fecha de aplicación
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {formatDate(record.first_date)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm text-emerald-600 font-medium">
                        {getRelativeDate(record.first_date)}
                      </span>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                      Programada
                    </div>
                  </div>
                </div>

                {record.second_date && (
                  <div className="pt-6 border-t border-gray-100">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Próxima fecha
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mb-2">
                      {formatDate(record.second_date)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="text-sm text-emerald-600 font-medium">
                          {getRelativeDate(record.second_date)}
                        </span>
                      </div>
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                        Programada
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha: Detalles específicos y notas */}
          <div className="space-y-6">
            {/* Detalles específicos por tipo */}
            {record.type === "VACUNA" && (
              <div className="bg-gradient-to-br from-purple-50/40 to-white rounded-xl p-6 border border-purple-200/50">
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Syringe className="w-4.5 h-4.5 text-purple-600" />
                  </div>
                  <span>Detalles de la vacuna</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Tipo de vacuna
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900">
                        {record.description
                          ?.split(" - ")[0]
                          ?.replace("Vacuna ", "") || "Vacuna general"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {record.type === "TRATAMIENTO" && (
              <div className="bg-gradient-to-br from-amber-50/40 to-white rounded-xl p-6 border border-amber-200/50">
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-4.5 h-4.5 text-amber-600" />
                  </div>
                  <span>Detalles del tratamiento</span>
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Medicamento
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-gray-200">
                      <div className="font-medium text-gray-900">
                        {record.description?.split(" - ")[0] || "Tratamiento"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {record.type === "CHEQUEO" && (
              <div className="bg-gradient-to-br from-emerald-50/40 to-white rounded-xl p-6 border border-emerald-200/50">
                <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                  <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4.5 h-4.5 text-emerald-600" />
                  </div>
                  <span>Tipo de chequeo</span>
                </h3>

                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <div className="text-lg font-semibold text-gray-900">
                    {record.description?.split(" - ")[0] || "Chequeo general"}
                  </div>
                </div>
              </div>
            )}

            {/* Veterinario */}
            <div className="grid col-span-2">
              {record.vet_name && (
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200/50">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-600" />
                    <span>Veterinario</span>
                  </h3>
                  <div className="space-y-2">
                    <div className="font-medium text-gray-900">
                      {record.vet_name}
                    </div>
                    {details?.match(/clínica\s*:\s*(.+)/i)?.[1] && (
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="truncate">
                          {details.match(/clínica\s*:\s*(.+)/i)?.[1]}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Descripción */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200/50">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-lg">Descripción completa</span>
            </h3>
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {record.description ||
                  "No hay descripción disponible para este registro."}
              </p>
            </div>
          </div>
        </div>

        {/* Resumen de métricas - Abajo del todo */}
        <div className="pt-8 border-t border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Resumen del registro
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100">
              <div className="text-xl font-bold text-emerald-700 mb-2">✓</div>
              <div className="text-sm font-medium text-gray-900">
                Procedimiento completado
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Estado actual del registro
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
              <div className="text-xl font-bold text-blue-700 mb-2">
                {record.document_urls?.length || 0}
              </div>
              <div className="text-sm font-medium text-gray-900">
                Documentos adjuntos
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Archivos relacionados
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100">
              <div className="text-xl font-bold text-purple-700 mb-2">
                {record.second_date ? "✓" : "—"}
              </div>
              <div className="text-sm font-medium text-gray-900">
                Próxima cita
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {record.second_date ? "Programada" : "Sin programar"}
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-xl border border-amber-100">
              <div className="text-xl font-bold text-amber-700 mb-2">!</div>
              <div className="text-sm font-medium text-gray-900">
                Seguimiento
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Revisión recomendada
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInfoCard;
