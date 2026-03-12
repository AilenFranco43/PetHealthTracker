import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  children,
  className = "",
  hideClose = false,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative w-full max-w-lg ${className}`}
      >
        {!hideClose && (
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 text-gray-700 transition"
          >
            <X size={22} />
          </button>
        )}

        {children}
      </div>
    </div>
  );
}
