import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const UpcomingEvents = ({ events }) => {
  // Estilos por categoría
  const getCategoryStyles = (category) => {
    switch (category) {
      case "VACUNA":
        return "bg-amber-100 text-amber-500";
      case "ALIMENTACION":
      case "TRATAMIENTO":
        return "bg-blue-100 text-blue-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  // Formateo del tipo
  const formatType = (type) => {
    const map = {
      VACUNA: "Vacuna",
      TRATAMIENTO: "Tratamiento",
      ALIMENTACION: "Alimentación",
      CHEQUEO: "Chequeo",
    };
    return map[type] || type;
  };

  // Calcular días restantes (siempre respecto al evento)
  const getDaysUntil = (dateString) => {
    const today = new Date();
    const target = new Date(dateString);

    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return diff;
  };

  // Colores para la badge
  const getBadgeColor = (days) => {
    if (days <= 7) return "bg-red-100 text-red-700";
    if (days <= 30) return "bg-amber-100 text-amber-700";
    return "bg-green-100 text-green-700";
  };

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-4 text-gray-400">
          <svg
            className="w-16 h-16 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="mb-2 text-lg font-medium text-gray-600">
          No hay eventos programados
        </h3>
        <p className="text-gray-500">
          No tienes próximos eventos para tus mascotas
        </p>

        <Link
          to="/reminders"
          className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          + Ir a recordatorios
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        {events.map((event) => {
          const daysLeft = getDaysUntil(event.date);

          return (
            <div
              key={event.id}
              className="relative bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]"
            >
              {/* Ícono */}
              <div
                className={`p-3 rounded-xl flex items-center justify-center ${getCategoryStyles(
                  event.type
                )}`}
              >
                <FaCalendarAlt size={20} />
              </div>

              {/* Contenido */}
              <div className="flex-1 min-w-0">
                {/* Título truncado */}
                <h3 className="font-bold text-gray-800 truncate">
                  {event.title}
                </h3>

                <p className="text-sm text-gray-500 truncate">
                  {event.pet?.name} • {formatType(event.type)}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(event.date).toLocaleDateString("es-ES")}
                </p>
              </div>

              {/* Badge de días restantes */}
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getBadgeColor(
                  daysLeft
                )}`}
              >
                {daysLeft > 0
                  ? `En ${daysLeft} días`
                  : daysLeft === 0
                  ? "¡Hoy!"
                  : `Hace ${Math.abs(daysLeft)} días`}
              </span>

              {/* Badge urgente */}
              {event.is_urgent && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                  Urgente
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpcomingEvents;
