import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Calendar,
  Syringe,
  FileText,
  Pill,
  Download,
  Trash2,
  AlertCircle,
  Edit,
  ChevronLeft,
  PawPrint,
  Clock,
  File,
  Printer,
  Share2,
  Bell,
  User,
  Tag,
  MapPin,
  FileEdit,
  CheckCircle,
  XCircle,
  MoreVertical,
  ArrowLeft
} from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useHealthRecords } from "../hooks/useHealthRecords";
import { toast } from "react-hot-toast";
import HealthRecordDetailSkeleton from "../components/health/HealthRecordDetailSkeleton";

const HealthRecordDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getHealthRecordById, deleteHealthRecord } = useHealthRecords();

  const [record, setRecord] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadRecord();
  }, [id]);

  const loadRecord = async () => {
    try {
      setLoading(true);
      const data = await getHealthRecordById(id);
      setRecord(data);
    } catch (error) {
      console.error("Error loading record:", error);
      toast.error("Error al cargar el registro");
      navigate("/health");
    } finally {
      setLoading(false);
    }
  };

  // Mapear tipos a iconos y configuraciones
  const getRecordConfig = (type) => {
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

  // Formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return "No especificada";
    try {
      const date = new Date(dateString);
      return format(date, "EEE, d 'de' MMMM 'de' yyyy", { locale: es });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  const formatShortDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return format(date, "dd/MM/yyyy", { locale: es });
    } catch (error) {
      return "";
    }
  };

  const getRelativeDate = (dateString) => {
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

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteHealthRecord(record.id);
      toast.success("✅ Registro eliminado correctamente");
      navigate("/health");
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error(error.message || "Error al eliminar el registro");
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Registro de Salud - ${record.description}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 30px; }
            .section { margin-bottom: 20px; }
            .label { font-weight: bold; color: #666; }
            .value { margin-bottom: 10px; }
            .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Registro de Salud</h1>
            <h2>${record.description}</h2>
            <p>${formatDate(record.created_at)}</p>
          </div>
          <div class="section">
            <div class="label">Mascota:</div>
            <div class="value">${record.pet?.name || "No especificada"}</div>
          </div>
          <div class="section">
            <div class="label">Fecha:</div>
            <div class="value">${formatDate(record.first_date)}</div>
          </div>
          ${
            record.second_date
              ? `
          <div class="section">
            <div class="label">Próxima fecha:</div>
            <div class="value">${formatDate(record.second_date)}</div>
          </div>
          `
              : ""
          }
          ${
            record.vet_name
              ? `
          <div class="section">
            <div class="label">Veterinario:</div>
            <div class="value">${record.vet_name}</div>
          </div>
          `
              : ""
          }
          <div class="section">
            <div class="label">Documentos adjuntos:</div>
            <div class="value">${
              record.document_urls?.length || 0
            } archivo(s)</div>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${record.type}: ${record.description}`,
          text: `Registro de ${record.type.toLowerCase()} para ${
            record.pet?.name
          }`,
          url: window.location.href,
        });
        toast.success("✅ Compartido correctamente");
      } catch (error) {
        if (error.name !== "AbortError") {
          toast.error("Error al compartir");
        }
      }
    }
  };

  const handleEdit = () => {
    // Esta función se implementará después
    toast("✏️ Función de edición disponible próximamente", {
      icon: "🚀",
      duration: 3000,
    });
  };

  if (loading) {
    return <HealthRecordDetailSkeleton />;
  }

  if (!record) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            Registro no encontrado
          </h1>
          <p className="text-gray-600 mb-8 max-w-md">
            El registro que buscas no existe o ha sido eliminado.
          </p>
          <Link
            to="/health"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
            Volver a registros
          </Link>
        </div>
      </div>
    );
  }

  const config = getRecordConfig(record.type);
  const Icon = config.icon;
  const relativeDate = getRelativeDate(record.second_date);

  // Separar título de detalles
  const title =
    record.description?.split(" - ")[0] || `Registro de ${config.label}`;
  const details = record.description?.split(" - ").slice(1).join(" - ");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header elegante */}
<div
  className={`relative bg-gradient-to-br ${config.gradient} text-white p-8 rounded-3xl shadow-xl overflow-hidden`}
>
  {/* Efectos de fondo elegantes */}
  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent"></div>
  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-12 translate-x-12 blur-2xl"></div>
  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8 blur-xl"></div>

  {/* Contenedor principal */}
  <div className="relative z-10">
    {/* Botón de regresar con posición relativa */}
    <div className="mb-5">
      <Link 
        to="/health" 
        className="inline-flex items-center gap-2 text-white font-medium"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span>Volver a salud</span>
      </Link>
    </div>

    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      {/* Contenido principal */}
      <div className="flex items-start gap-5">
        <div
          className={`w-18 h-18 ${config.iconBg} rounded-2xl flex items-center justify-center shadow-lg border-2 border-white/20`}
        >
          <Icon className={`w-9 h-9 ${config.iconColor}`} />
        </div>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">
              {record.type}
            </h1>
            <span
              className={`px-2 py-1.5 ${config.badgeColor} rounded-full text-sm font-semibold backdrop-blur-sm`}
            >
              {title}
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Creado el {formatShortDate(record.created_at)}</span>
            </div>

            {record.vet_name && (
              <div className="hidden sm:flex items-center gap-2">
                <span className="w-1 h-1 bg-white/50 rounded-full"></span>
                <PawPrint className="w-4 h-4" />
                <span>{record.pet?.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Acciones minimalistas */}
      <div className="flex items-center gap-2 self-start lg:self-center">
        <button
          onClick={handleEdit}
          className="p-3 hover:bg-white/15 rounded-xl transition-all group"
          title="Editar"
        >
          <Edit className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={handlePrint}
          className="p-3 hover:bg-white/15 rounded-xl transition-all group"
          title="Imprimir"
        >
          <Printer className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={handleShare}
          className="p-3 hover:bg-white/15 rounded-xl transition-all group"
          title="Compartir"
        >
          <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </div>

    {/* Indicador visual */}
    <div className="mt-6 pt-6 border-t border-white/20">
      <div className="flex items-center gap-3">
        {record.second_date && (
          <div className="hidden sm:flex items-center gap-2 text-white/80">
            <span className="w-1 h-1 bg-white/50 rounded-full"></span>
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              Próxima: {formatShortDate(record.second_date)}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de mascota*/}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <PawPrint className="w-5 h-5 text-blue-500" />
                    Información de la mascota
                  </h2>
                  <Link
                    to={`/pets/${record.pet?.id}`}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    Ver perfil completo
                    <ChevronLeft className="w-4 h-4 rotate-180" />
                  </Link>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Avatar de mascota */}
                    <div className="relative flex-shrink-0">
                      <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                        {record.pet?.photo_url ? (
                          <img
                            src={record.pet.photo_url}
                            alt={record.pet.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                            <PawPrint className="w-12 h-12 text-blue-400" />
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                        <PawPrint className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Información principal */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {record.pet?.name || "Mascota sin nombre"}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          {record.pet?.specie && (
                            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                              {record.pet.specie}
                            </span>
                          )}
                          {record.pet?.breed && (
                            <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                              {record.pet.breed}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info adicional si existe */}
                      {(record.pet?.age || record.pet?.weight) && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <div className="flex flex-wrap gap-3">
                            {record.pet?.age && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                <span className="text-sm">
                                  Edad: {record.pet.age}
                                </span>
                              </div>
                            )}
                            {record.pet?.weight && (
                              <div className="flex items-center gap-2 text-gray-600">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-sm">
                                  Peso: {record.pet.weight} kg
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Información del Registro*/}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="p-8">
                {/* Header más compacto */}
                <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 ${config.iconBg} rounded-xl flex items-center justify-center shadow-sm border border-white/50`}
                    >
                      <Icon className={`w-6 h-6 ${config.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Información del Registro
                      </h2>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span
                          className={`px-3 py-1 ${config.badgeColor} rounded-full text-xs font-medium`}
                        >
                          {record.type === "VACUNA"
                            ? "Vacunación"
                            : record.type === "TRATAMIENTO"
                            ? "Tratamiento"
                            : "Chequeo"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid de 2 columnas más equilibrado */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Columna izquierda: Información principal */}
                  <div className="space-y-6">
                    {/* Tarjeta de fechas */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200/50">
                      <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-4.5 h-4.5 text-blue-600" />
                        </div>
                        <span>Fechas importantes</span>
                      </h3>

                      <div className="space-y-6">
                        <div>
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            Fecha de aplicación
                          </div>
                          <div className="text-lg font-semibold text-gray-900 mb-2">
                            {formatDate(record.first_date)}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-emerald-600" />
                              <span className="text-sm text-emerald-600 font-medium">
                                {getRelativeDate(record.first_date)}
                              </span>
                            </div>
                            <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                              Programada
                            </div>
                          </div>
                        </div>

                        {record.second_date && (
                          <div className="pt-6 border-t border-gray-100">
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              Próxima fecha
                            </div>
                            <div className="text-lg font-semibold text-gray-900 mb-2">
                              {formatDate(record.second_date)}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-emerald-600" />
                                <span className="text-sm text-emerald-600 font-medium">
                                  {getRelativeDate(record.second_date)}
                                </span>
                              </div>
                              <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                                Programada
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Columna derecha: Detalles específicos y notas */}
                  <div className="space-y-6">
                    {/* Detalles específicos por tipo */}
                    {record.type === "VACUNA" && (
                      <div className="bg-gradient-to-br from-purple-50/40 to-white rounded-xl p-6 border border-purple-200/50">
                        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                          <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Syringe className="w-4.5 h-4.5 text-purple-600" />
                          </div>
                          <span>Detalles de la vacuna</span>
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              Tipo de vacuna
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                              <div className="font-medium text-gray-900">
                                {record.description
                                  ?.split(" - ")[0]
                                  ?.replace("Vacuna ", "") || "Vacuna general"}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {record.type === "TRATAMIENTO" && (
                      <div className="bg-gradient-to-br from-amber-50/40 to-white rounded-xl p-6 border border-amber-200/50">
                        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                          <div className="w-9 h-9 bg-amber-100 rounded-lg flex items-center justify-center">
                            <Pill className="w-4.5 h-4.5 text-amber-600" />
                          </div>
                          <span>Detalles del tratamiento</span>
                        </h3>

                        <div className="space-y-4">
                          <div>
                            <div className="text-sm font-medium text-gray-700 mb-2">
                              Medicamento
                            </div>
                            <div className="p-3 bg-white rounded-lg border border-gray-200">
                              <div className="font-medium text-gray-900">
                                {record.description?.split(" - ")[0] ||
                                  "Tratamiento"}
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
                        </div>
                      </div>
                    )}

                    {record.type === "CHEQUEO" && (
                      <div className="bg-gradient-to-br from-emerald-50/40 to-white rounded-xl p-6 border border-emerald-200/50">
                        <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-3">
                          <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-4.5 h-4.5 text-emerald-600" />
                          </div>
                          <span>Tipo de chequeo</span>
                        </h3>

                        <div className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="text-lg font-semibold text-gray-900">
                            {record.description?.split(" - ")[0] ||
                              "Chequeo general"}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Veterinario y*/}
                    <div className="grid  col-span-2 ">
                      {/* Veterinario */}
                      {record.vet_name && (
                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200/50">
                          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-600" />
                            <span>Veterinario</span>
                          </h3>
                          <div className="space-y-2">
                            <div className="font-medium text-gray-900">
                              {record.vet_name}
                            </div>
                            {details?.match(/clínica\s*:\s*(.+)/i)?.[1] && (
                              <div className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="truncate">
                                  {details.match(/clínica\s*:\s*(.+)/i)?.[1]}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200/50">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="text-lg">Descripción completa</span>
                    </h3>
                    <div className="p-4 bg-white rounded-lg border border-gray-200">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {record.description ||
                          "No hay descripción disponible para este registro."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Resumen de métricas - Abajo del todo */}
                <div className="pt-8 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Resumen del registro
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-emerald-50 to-white p-5 rounded-xl border border-emerald-100">
                      <div className="text-xl font-bold text-emerald-700 mb-2">
                        ✓
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Procedimiento completado
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Estado actual del registro
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl border border-blue-100">
                      <div className="text-xl font-bold text-blue-700 mb-2">
                        {record.document_urls?.length || 0}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Documentos adjuntos
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Archivos relacionados
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl border border-purple-100">
                      <div className="text-xl font-bold text-purple-700 mb-2">
                        {record.second_date ? "✓" : "—"}
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Próxima cita
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {record.second_date ? "Programada" : "Sin programar"}
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-amber-50 to-white p-5 rounded-xl border border-amber-100">
                      <div className="text-xl font-bold text-amber-700 mb-2">
                        !
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        Seguimiento
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Revisión recomendada
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos adjuntos */}
            {record.document_urls && record.document_urls.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">
                      Documentos adjuntos
                    </h2>
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {record.document_urls.length} archivo
                      {record.document_urls.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {record.document_urls.map((url, index) => {
                      const fileName =
                        url.split("/").pop() || `documento-${index + 1}`;
                      const fileExtension =
                        fileName.split(".").pop()?.toLowerCase() || "file";
                      const isImage = [
                        "jpg",
                        "jpeg",
                        "png",
                        "gif",
                        "webp",
                      ].includes(fileExtension);
                      const isPDF = fileExtension === "pdf";

                      return (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all group hover:border-gray-300"
                        >
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              isImage
                                ? "bg-blue-50"
                                : isPDF
                                ? "bg-red-50"
                                : "bg-gray-50"
                            }`}
                          >
                            {isImage ? (
                              <div className="text-blue-500">🖼️</div>
                            ) : isPDF ? (
                              <div className="text-red-500">📄</div>
                            ) : (
                              <File className="w-6 h-6 text-gray-500" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate mb-1">
                              {fileName}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-3">
                              <span className="uppercase bg-gray-100 px-2 py-0.5 rounded text-xs">
                                {fileExtension}
                              </span>
                              <span className="text-blue-600 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
                                Ver documento
                                <Download className="w-3 h-3" />
                              </span>
                            </div>
                          </div>

                          <div className="text-xs text-gray-400">
                            #{index + 1}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha - Acciones e información */}
          <div className="space-y-6">
            {/* Acciones rápidas */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Acciones
              </h3>

              <div className="space-y-3">
                <button
                  onClick={handleEdit}
                  className="w-full px-4 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-medium flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
                >
                  <FileEdit className="w-5 h-5" />
                  <span>Editar registro</span>
                </button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <Printer className="w-5 h-5" />
                    Imprimir
                  </button>

                  <button
                    onClick={handleShare}
                    className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <Share2 className="w-5 h-5" />
                    Compartir
                  </button>
                </div>
              </div>
            </div>

            {/* Recordatorio automático */}
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

            {/* Acción de eliminación */}
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
                    Esta acción eliminará permanentemente el registro y todos
                    sus archivos adjuntos.
                  </p>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium text-sm"
                  >
                    Eliminar registro
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 transform transition-all animate-scale-in">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Eliminar registro
              </h3>
              <p className="text-gray-600">
                ¿Estás seguro de que quieres eliminar este registro?
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium mb-1">
                    Esta acción no se puede deshacer
                  </p>
                  <ul className="text-red-600 text-sm space-y-1">
                    <li>• Se eliminarán todos los archivos adjuntos</li>
                    <li>• Se eliminará el recordatorio asociado</li>
                    <li>• La información no podrá recuperarse</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all disabled:opacity-50 font-medium flex items-center justify-center gap-2 shadow-md"
              >
                {isDeleting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    Eliminando...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-5 h-5" />
                    Eliminar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecordDetailPage;
