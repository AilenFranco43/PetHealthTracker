import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { Syringe, Utensils, Stethoscope, Pill, Sparkles } from "lucide-react";
import ConfirmModal from "../common/ConfirmModal";

export default function ReminderCard({
  reminder,
  onDelete,
  onToggleCompleted,
}) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isRoutine = reminder.is_routine;

  const typeIcons = {
    VACUNA: { icon: <Syringe size={22} />, color: "bg-blue-100 text-blue-600" },
    ALIMENTACION: {
      icon: <Utensils size={22} />,
      color: "bg-orange-100 text-orange-600",
    },
    VISITA: {
      icon: <Stethoscope size={22} />,
      color: "bg-red-100 text-red-600",
    },
    TRATAMIENTO: {
      icon: <Pill size={22} />,
      color: "bg-purple-100 text-purple-600",
    },
    OTRO: { icon: <Sparkles size={22} />, color: "bg-gray-200 text-gray-700" },
  };

  const iconData = typeIcons[reminder.type] || typeIcons.OTRO;

  const truncateDescription = (text, maxLength = 80) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    const truncated = text.substring(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return lastSpace > 0
      ? truncated.substring(0, lastSpace) + "..."
      : truncated + "...";
  };

  const getTitleFromDescription = (description) => {
    if (!description) return "";
    const parts = description.split(" - ");
    if (parts.length > 1) return parts[0];
    return truncateDescription(description, 60);
  };
  // ------------------------------------------------

  let formattedDate = "";
  let formattedTime = "";

  if (!isRoutine && reminder.date) {
    const dateObj = new Date(reminder.date);
    formattedDate = dateObj.toLocaleDateString("es-AR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    formattedTime = dateObj.toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const handleConfirmDelete = () => {
    if (onDelete) onDelete(reminder.id);
    setShowConfirm(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col gap-3 border border-gray-100 hover:shadow-lg transition-shadow">
        {/* Row superior */}
        <div className="flex items-start justify-between gap-3">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconData.color}`}
          >
            {iconData.icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-gray-800 font-bold text-lg truncate">
              {getTitleFromDescription(reminder.title)}
            </h3>

            <p className="text-sm text-gray-500 truncate">
              {truncateDescription(
                `${reminder.pet?.name} • ${reminder.type}`,
                40
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <CheckCircle
              size={20}
              className={`cursor-pointer ${
                reminder.is_completed ? "text-green-600" : "text-gray-400"
              }`}
              onClick={() =>
                onToggleCompleted(reminder.id, reminder.is_completed)
              }
            />

            {reminder.is_urgent && (
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                <AlertCircle size={14} />
                <span>Urgente</span>
              </div>
            )}

            <button
              onClick={() => setShowConfirm(true)}
              className="text-red-500 hover:text-red-700"
              title="Eliminar"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Fecha / hora */}
        <div className="flex flex-wrap gap-4 text-gray-500 text-sm items-center">
          {isRoutine ? (
            <div className="flex items-center gap-1 truncate">
              <Clock size={14} />
              <span className="truncate">
                Rutina diaria: {reminder.times?.join(", ")}
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <CalendarDays size={14} />
                <span>{formattedDate}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{formattedTime}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      <ConfirmModal
        open={showConfirm}
        title="Eliminar recordatorio"
        message={`¿Eliminar "${getTitleFromDescription(reminder.title)}"?`}
        mode="delete"
        entity="recordatorio"
        loading={false}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onCancel={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
