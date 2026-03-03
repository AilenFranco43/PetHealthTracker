import React from "react";
import { Link } from "react-router-dom";
import {
  Share2,
  Bell,
  AlertCircle,
  ChevronLeft,
} from "lucide-react";
import Button from "../common/Button";

const ActionSidebar = ({
  onEdit,
  onPrint,
  onShare,
  onDelete,
  hasReminder = true,
}) => {
  return (
    <div className="space-y-6">
      {/* Acciones rápidas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Acciones</h3>
        <div className="space-y-3">
          <Button
            type="button"
            mode="open"
            entity="registro"
            onClick={onEdit}
            full
          />

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onPrint}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition-all"
            >
              Imprimir
            </button>
            <button
              onClick={onShare}
              className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition-all"
            >
              <Share2 className="w-5 h-5" />
              Compartir
            </button>
          </div>
        </div>
      </div>

      {/* Recordatorio */}
      {hasReminder && (
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Recordatorio activo
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                Se ha creado un recordatorio automático para esta fecha.
              </p>
              <Link
                to="/reminders"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Ver recordatorios
                <ChevronLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Eliminación */}
      <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">
              Eliminar registro
            </h4>
            <p className="text-sm text-gray-600 mb-4">
              Esta acción eliminará permanentemente el registro y todos sus
              archivos adjuntos.
            </p>
            <Button
              type="button"
              mode="delete"
              entity="registro"
              onClick={onDelete}
              full={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActionSidebar;
