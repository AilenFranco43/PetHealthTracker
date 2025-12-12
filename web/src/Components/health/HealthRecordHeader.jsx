import React from "react";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  PawPrint, 
  Clock, 
  ArrowLeft,
} from "lucide-react";

const HealthRecordHeader = ({ 
  record, 
  config, 
  formatShortDate, 

}) => {
  // Validación de datos
  if (!record || !config) {
    return (
      <div className="relative bg-gradient-to-br from-gray-500 to-gray-600 text-white p-8 rounded-3xl shadow-xl overflow-hidden">
        <div className="animate-pulse">Cargando encabezado...</div>
      </div>
    );
  }

  const Icon = config.icon;
  const title = record.description?.split(" - ")[0] || `Registro de ${config.label}`;

  return (
    <div className={`relative bg-gradient-to-br ${config.gradient} text-white p-8 rounded-3xl shadow-xl overflow-hidden`}>
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 blur-xl"></div>

      <div className="relative z-10">
        {/* Botón de regresar */}
        <div className="mb-5">
          <Link 
            to="/health" 
            className="inline-flex items-center gap-2 text-white font-medium group hover:text-white/90 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span>Volver a salud</span>
          </Link>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <div className={`w-18 h-18 ${config.iconBg} rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20`}>
              <Icon className={`w-9 h-9 ${config.iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold tracking-tight">{record.type}</h1>
                <span className={`px-2 py-1.5 ${config.badgeColor} rounded-full text-sm font-semibold backdrop-blur-sm`}>
                  {title}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Creado el {formatShortDate(record.created_at)}</span>
                </div>
                {record.vet_name && (
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                    <PawPrint className="w-4 h-4" />
                    <span>{record.pet?.name}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

    
        </div>

        {/* Indicador visual */}
        {record.second_date && (
          <div className="mt-6 pt-6 border-t border-white/20">
            <div className="flex items-center gap-2 text-white/80">
              <span className="w-1 h-1 bg-white/50 rounded-full"></span>
              <Clock className="w-4 h-4" />
              <span className="text-sm">Próxima: {formatShortDate(record.second_date)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthRecordHeader;