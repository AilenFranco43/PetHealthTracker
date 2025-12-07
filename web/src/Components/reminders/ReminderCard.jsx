import React, { useState } from "react";
import {
  CalendarDays,
  Clock,
  CheckCircle,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { Syringe, Utensils, Stethoscope, Pill, Sparkles } from "lucide-react";

export default function ReminderCard({ reminder, onDelete, onToggleCompleted }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const isRoutine = reminder.is_routine;

  const typeIcons = {
    VACUNA: { icon: <Syringe size={22} />, color: "bg-blue-100 text-blue-600" },
    ALIMENTACION: { icon: <Utensils size={22} />, color: "bg-orange-100 text-orange-600" },
    VISITA: { icon: <Stethoscope size={22} />, color: "bg-red-100 text-red-600" },
    TRATAMIENTO: { icon: <Pill size={22} />, color: "bg-purple-100 text-purple-600" },
    OTRO: { icon: <Sparkles size={22} />, color: "bg-gray-200 text-gray-700" },
  };

  const iconData = typeIcons[reminder.type] || typeIcons.OTRO;

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
        {/* Row superior: icono + título + acciones */}
        <div className="flex items-start justify-between gap-3">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${iconData.color}`}>
            {iconData.icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-gray-800 font-bold text-lg truncate">{reminder.title}</h3>
            <p className="text-sm text-gray-500">{reminder.pet?.name} • {reminder.type}</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex items-center group">
              <CheckCircle
                size={20}
                className={`cursor-pointer ${reminder.is_completed ? "text-green-600" : "text-gray-400"}`}
                onClick={() => onToggleCompleted(reminder.id, reminder.is_completed)}
              />
              <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {reminder.is_completed ? "Marcar como no completado" : "Marcar como completado"}
              </span>
            </div>

            {reminder.is_urgent && (
              <div className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                <AlertCircle size={14} />
                Urgente
              </div>
            )}

            <button
              onClick={() => setShowConfirm(true)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Eliminar"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Row inferior: fecha / hora o rutina */}
        <div className="flex flex-wrap gap-4 text-gray-500 text-sm items-center">
          {isRoutine ? (
            <div className="flex items-center gap-1">
              <Clock size={14} />
              Rutina diaria: {reminder.times?.join(", ")}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-1">
                <CalendarDays size={14} />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {formattedTime}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modal de confirmación */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-80 shadow-lg">
            <h4 className="font-bold text-gray-800 mb-4">Confirmar eliminación</h4>
            <p className="text-sm text-gray-600 mb-6">¿Estás seguro de que quieres eliminar este recordatorio?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-500 text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
