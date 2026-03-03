import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Syringe,
  FileText,
  Pill,
  Trash2,
  AlertCircle,
  ChevronRight,
  Eye,
  PawPrint,
} from "lucide-react";

const RecordCard = ({ data, type, onDelete }) => {
  const navigate = useNavigate();

  const icons = {
    vaccine: { Icon: Syringe, bg: "bg-blue-100", color: "text-blue-600" },
    checkup: { Icon: FileText, bg: "bg-purple-100", color: "text-purple-600" },
    treatment: { Icon: Pill, bg: "bg-pink-100", color: "text-pink-600" },
  };

  const { Icon, bg, color } = icons[type];

  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const formatDate = (str) => {
    if (!str) return "No especificada";
    try {
      return new Date(str).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "Fecha inválida";
    }
  };

  const formatType = (t) =>
    ({ VACUNA: "Vacuna", CHEQUEO: "Chequeo", TRATAMIENTO: "Tratamiento" }[t] ||
    t);

  const getDaysFromToday = (dateStr) => {
    if (!dateStr) return null;
    const today = new Date();
    const date = new Date(dateStr);
    return Math.ceil((date - today) / (1000 * 60 * 60 * 24));
  };

  // Función para truncar la descripción
  const truncateDescription = (text, maxLength = 80) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    
    // Buscar el último espacio dentro del límite
    const truncated = text.substr(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    
    return lastSpace > 0 
      ? truncated.substr(0, lastSpace) + "..."
      : truncated + "...";
  };

  // Obtener solo el título de la descripción (parte antes del guión)
  const getTitleFromDescription = (description) => {
    if (!description) return "";
    
    // Extraer la parte antes del primer guión
    const parts = description.split(" - ");
    if (parts.length > 1) {
      return parts[0];
    }
    
    // Si no hay guión, truncar la descripción completa
    return truncateDescription(description, 60);
  };

  const daysFirst = getDaysFromToday(data.first_date);
  const daysSecond = getDaysFromToday(data.second_date);

  const renderBadge = (days) => {
    if (days === null) return null;

    const style =
      days <= 7
        ? "bg-red-100 text-red-700"
        : days <= 30
        ? "bg-amber-100 text-amber-700"
        : "bg-green-100 text-green-700";

    return (
      <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${style}`}>
        {days > 0
          ? `en ${days} día${days !== 1 ? "s" : ""}`
          : days === 0
          ? "¡hoy!"
          : `hace ${Math.abs(days)} día${Math.abs(days) !== 1 ? "s" : ""}`}
      </span>
    );
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!onDelete) return;

    setIsDeleting(true);
    try {
      await onDelete(data.id);
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      {/* Modal Confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 animate-scale-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  ¿Eliminar registro?
                </h3>
                <p className="text-gray-600 text-sm">
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
              >
                Cancelar
              </button>

              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CARD COMPACTA */}
      <div
        onClick={() => navigate(`/health/record/${data.id}`)}
        className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all border border-gray-100 cursor-pointer group hover:border-blue-200"
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Título/descripción recortada */}
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-700 truncate">
                {getTitleFromDescription(data.description)}
              </h3>
              
              {/* Mostrar tipo solo si es diferente al título */}
              {formatType(data.type) !== getTitleFromDescription(data.description) && (
                <div className="inline-block mt-1">
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                    {formatType(data.type)}
                  </span>
                </div>
              )}
            </div>

            {/* Mascota */}
            {data.pet && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <PawPrint className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">{data.pet.name}</span>
              </div>
            )}

            {/* Fechas */}
            <div className="space-y-1">
              {/* Primera Fecha + días */}
              {data.first_date && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <div className="flex items-center flex-wrap gap-1">
                    <span>{formatDate(data.first_date)}</span>
                    {renderBadge(daysFirst)}
                  </div>
                </div>
              )}

              {/* Segunda Fecha + días */}
              {data.second_date && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <div className="flex items-center flex-wrap gap-1">
                    <span>Próxima: {formatDate(data.second_date)}</span>
                    {renderBadge(daysSecond)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ACCIONES RÁPIDAS EN FILA */}
          <div className="flex items-center gap-1 self-start flex-shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirm(true);
              }}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              title="Eliminar registro"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/health/record/${data.id}`);
              }}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
              title="Ver detalles"
            >
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 ml-1" />
            </button>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordCard;