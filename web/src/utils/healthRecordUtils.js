import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Syringe, FileText, Pill } from "lucide-react";

export const getRecordConfig = (type) => {
  const configs = {
    VACUNA: {
      icon: Syringe,
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      textColor: "text-blue-600",
      label: "Vacuna",
      gradient: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500",
      badgeColor: "bg-blue-500/10 text-blue-800",
    },
    CHEQUEO: {
      icon: FileText,
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      textColor: "text-purple-600",
      label: "Chequeo",
      gradient: "from-purple-500 to-purple-600",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500",
      badgeColor: "bg-purple-500/10 text-purple-800",
    },
    TRATAMIENTO: {
      icon: Pill,
      bgColor: "bg-gradient-to-br from-emerald-50 to-emerald-100",
      textColor: "text-emerald-600",
      label: "Tratamiento",
      gradient: "from-emerald-500 to-emerald-800",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
      badgeColor: "bg-emerald-500/10 text-emerald-800",
    },
  };
  return configs[type] || configs.CHEQUEO;
};

// Función para formatear fecha larga (ej: "Lun, 15 de enero de 2024")
export const formatHealthDate = (dateString) => {
  if (!dateString) return "No especificada";
  try {
    const date = new Date(dateString);
    return format(date, "EEE, d 'de' MMMM 'de' yyyy", { locale: es });
  } catch (error) {
    return "Fecha inválida";
  }
};

// Función para formatear fecha corta (ej: "15/01/2024")
export const formatShortDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: es });
  } catch (error) {
    return "";
  }
};

// Función para fecha relativa (ej: "Hoy", "Mañana", "En 3 días")
export const getRelativeDate = (dateString) => {
  if (!dateString) return "";
  const now = new Date();
  const date = new Date(dateString);
  const diffDays = Math.floor((date - now) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hoy";
  if (diffDays === 1) return "Mañana";
  if (diffDays === -1) return "Ayer";
  if (diffDays > 0) return `En ${diffDays} días`;
  if (diffDays < 0) return `Hace ${Math.abs(diffDays)} días`;
  return "";
};

// Función para formatear fecha de impresión (puede ser diferente)
export const formatPrintDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "dd 'de' MMMM 'de' yyyy", { locale: es });
  } catch (error) {
    return "";
  }
};

// Función para formatear hora si es necesario
export const formatTime = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return format(date, "HH:mm", { locale: es });
  } catch (error) {
    return "";
  }
};

// Función para validar si una fecha es válida
export const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};