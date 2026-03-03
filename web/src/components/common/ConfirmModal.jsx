// components/common/ConfirmModal.jsx
import { AlertCircle, Trash2, XCircle } from "lucide-react";
import Button from "./Button";

export default function ConfirmModal({
  open,
  title = "Confirmar acción",
  message = "¿Estás seguro de realizar esta acción?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
  mode = "delete",
  entity = "",
  showWarning = true,
  warningItems = [],
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md relative shadow-lg animate-fadeIn">
        {/* Header con icono para eliminar */}
        <div className="flex flex-col items-center text-center p-6 border-b">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Warning section si es necesario */}
        {showWarning && warningItems.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mx-6 my-4">
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-700 font-medium mb-1">
                  Esta acción no se puede deshacer
                </p>
                <ul className="text-red-600 text-sm space-y-1">
                  {warningItems.map((item, index) => (
                    <li key={index}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Message si no hay warningItems */}
        {!showWarning && (
          <div className="p-6 text-gray-600">
            <p>{message}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 p-6 pt-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium disabled:opacity-50"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2 shadow-md"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="w-5 h-5" />
                {confirmText}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
