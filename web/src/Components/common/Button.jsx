// components/common/Button.jsx
import React from "react";

export default function Button({
  text,
  mode = "create",
  entity = "",
  loading = false,
  full = true,
  className = "",
  type = "submit",
  ...props
}) {
  const autoText = (() => {
    const entityText = entity ? ` ${entity}` : "";

    switch (mode) {
      case "edit":
        return `Actualizar${entityText}`;
      case "delete":
        return `Eliminar${entityText}`;
      case "create":
      default:
        return `Crear${entityText}`;
    }
  })();

const colorClasses = (() => {
  switch(mode) {
    case "delete": return "from-red-500 to-red-600";
    case "edit":   return "from-blue-500 to-blue-600";
    case "create": return "from-green-500 to-green-600";
    default:       return "from-gray-400 to-gray-500";
  }
})();


  return (
    <button
      type={type}
      disabled={loading}
      className={`
        ${full ? "w-full" : ""}
        bg-gradient-to-r 
        ${colorClasses}
        text-white font-bold py-3 rounded-xl shadow-lg
        hover:opacity-95 transition-opacity
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Procesando...
        </span>
      ) : (
        text || autoText
      )}
    </button>
  );
}
