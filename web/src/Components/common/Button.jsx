import React from "react";
import { Plus, Save, Trash2, Pencil } from "lucide-react";

export default function Button({
  text,
  mode = "create",
  entity = "",
  loading = false,
  full = true,
  className = "",
  type = "submit",
  icon,
  ...props
}) {
  const autoText = (() => {
    const entityText = entity ? ` ${entity}` : "";

    switch (mode) {
      case "edit":
        return `Actualizar${entityText}`;
      case "delete":
        return `Eliminar${entityText}`;
      case "open":
        return `Editar${entityText}`;

      case "create":
      default:
        return `Crear${entityText}`;
    }
  })();

  const defaultIcon = (() => {
    if (icon) return icon;

    switch (mode) {
      case "edit":
        return <Save size={18} />;
      case "delete":
        return <Trash2 size={18} />;
      case "open":
        return <Pencil size={18} />;

      case "create":
      default:
        return <Plus size={18} />;
    }
  })();

  const colorClasses = (() => {
    switch (mode) {
      case "open":
        return `
    bg-[#0A99A5]/10 text-[#0A99A5]
    hover:bg-[#0A99A5]/20
    focus:ring-[#0A99A5]/30
  `;

      case "delete":
        return `
          bg-red-50 text-red-700 border border-red-200
          hover:bg-red-100
          focus:ring-red-300
        `;
      case "edit":
      case "create":
        return `
          bg-[#0A99A5] text-white
          hover:bg-[#088A95]
          focus:ring-[#0A99A5]/40
        `;
      default:
        return `
          bg-gray-100 text-gray-700 border border-gray-200
          hover:bg-gray-200
          focus:ring-gray-300
        `;
    }
  })();

  return (
    <button
      type={type}
      disabled={loading}
      className={`
        ${full ? "w-full" : ""}
        inline-flex items-center justify-center gap-2
        px-5 py-2.5
        rounded-lg
        text-sm font-medium
        border
        transition-colors
        shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${colorClasses}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Procesando...
        </span>
      ) : (
        <>
          {defaultIcon}
          {text || autoText}
        </>
      )}
    </button>
  );
}
