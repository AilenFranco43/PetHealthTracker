// components/health/HealthRecordForm.jsx
import React, { useState, useEffect } from "react";
import { usePets } from "../../hooks/usePets";
import { useHealthRecords } from "../../hooks/useHealthRecords";
import { toast } from "react-hot-toast";
import Button from "../common/Button";

// Configuración de formularios
const formConfigs = {
  VACUNA: {
    title: "Vacuna",
    typeLabel: "Nombre de la vacuna",
    typePlaceholder: "Ej: Rabia, Moquillo, Parvovirus",
    descriptionLabel: "Descripción (opcional)",
    descriptionPlaceholder: "Ej: Vacuna anual, lote #ABC123, reactivo leve",
    firstDateLabel: "Fecha de aplicación",
    secondDateLabel: "Próxima aplicación (opcional)",
    recordType: "VACUNA",
  },
  CHEQUEO: {
    title: "Chequeo",
    typeLabel: "Tipo de chequeo",
    typePlaceholder: "Ej: General, Dental, Dermatológico",
    descriptionLabel: "Descripción detallada",
    descriptionPlaceholder: "Ej: Control de peso, examen de sangre, observaciones",
    firstDateLabel: "Fecha realizado",
    secondDateLabel: "Próximo chequeo (opcional)",
    recordType: "CHEQUEO",
  },
  TRATAMIENTO: {
    title: "Tratamiento",
    typeLabel: "Nombre del tratamiento",
    typePlaceholder: "Ej: Antibióticos, Desparasitación, Terapia física",
    descriptionLabel: "Descripción del tratamiento",
    descriptionPlaceholder: "Ej: Dosificación, frecuencia, precauciones",
    firstDateLabel: "Fecha inicio",
    secondDateLabel: "Fecha fin (opcional)",
    recordType: "TRATAMIENTO",
  },
};

// Campos comunes
const commonFields = [
  { name: "type", type: "text", required: true },
  { name: "description", type: "textarea", required: false },
  { name: "pet", label: "Mascota", type: "pet-select", required: true },
  { name: "first_date", type: "date", required: true },
  { name: "second_date", type: "date", required: false },
  {
    name: "vet",
    label: "Veterinario",
    type: "text",
    required: false,
    placeholder: "Ej: Dr. Martínez - Clínica Central",
  },
  {
    name: "documents",
    label: "Documentos adjuntos",
    type: "file",
    multiple: true,
    required: false,
    accept: "image/*,.pdf,.doc,.docx",
  },
];

export default function HealthRecordForm({ 
  record = null, // Para edición, null para creación
  onClose, 
  onSuccess,
  mode = "create" // 'create' o 'edit'
}) {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const { createHealthRecord, updateHealthRecord } = useHealthRecords();
  const { pets, getPets } = usePets();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = formConfigs[record?.type || formData.recordType || "VACUNA"];

  useEffect(() => {
    getPets();
    
    // Si estamos en modo edición, prellenar el formulario
    if (record && mode === "edit") {
      // Extraer tipo y descripción separadas
      const descriptionParts = record.description?.split(" - ") || [];
      const type = descriptionParts[0] || "";
      const description = descriptionParts.slice(1).join(" - ") || "";
      
      setFormData({
        type: type,
        description: description,
        pet: record.pet?.id || "",
        first_date: record.first_date ? record.first_date.split('T')[0] : "",
        second_date: record.second_date ? record.second_date.split('T')[0] : "",
        vet: record.vet_name || "",
        recordType: record.type, // Mantener el tipo original
      });
    } else if (mode === "create") {
      // Si es creación, establecer valores por defecto
      setFormData({
        type: "",
        description: "",
        pet: "",
        first_date: "",
        second_date: "",
        vet: "",
        recordType: "VACUNA", // Valor por defecto
      });
    }
  }, [record, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files ? Array.from(e.target.files) : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validaciones
      if (!formData.pet) {
        toast.error("Debes seleccionar una mascota");
        setIsSubmitting(false);
        return;
      }

      if (!formData.type || formData.type.trim() === "") {
        toast.error(`El campo "${config.typeLabel}" es requerido`);
        setIsSubmitting(false);
        return;
      }

      if (!formData.first_date) {
        toast.error(`"${config.firstDateLabel}" es requerido`);
        setIsSubmitting(false);
        return;
      }

      // Construir descripción
      let description = formData.type.trim();
      if (formData.description && formData.description.trim() !== "") {
        description = `${formData.type.trim()} - ${formData.description.trim()}`;
      }

      // Preparar datos para la API
      const requestData = {
        pet_id: formData.pet,
        type: formData.recordType || config.recordType,
        description,
        first_date: formData.first_date,
      };

      if (formData.second_date?.trim()) requestData.second_date = formData.second_date;
      if (formData.vet?.trim()) requestData.vet_name = formData.vet.trim();
      if (files.length > 0) requestData.documents = files;

      let result;
      if (mode === "edit" && record) {
        // Actualizar registro existente
        result = await updateHealthRecord(record.id, requestData);
        toast.success("✅ Registro actualizado correctamente");
      } else {
        // Crear nuevo registro
        result = await createHealthRecord(requestData);
        toast.success("✅ Registro creado correctamente");
      }

      if (onSuccess) onSuccess(result);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Ocurrió un error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFieldConfig = (fieldName) => {
    switch (fieldName) {
      case "type":
        return { label: config.typeLabel, placeholder: config.typePlaceholder };
      case "description":
        return {
          label: config.descriptionLabel,
          placeholder: config.descriptionPlaceholder,
        };
      case "first_date":
        return {
          label: config.firstDateLabel,
          placeholder: "Selecciona una fecha",
        };
      case "second_date":
        return {
          label: config.secondDateLabel,
          placeholder: "Selecciona una fecha (opcional)",
        };
      default:
        return {};
    }
  };

  // Selector de tipo de registro
  const handleTypeChange = (type) => {
    setFormData({ ...formData, recordType: type });
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {mode === "edit" ? `Editar ${config.title}` : `Nuevo ${config.title}`}
        </h2>
        
        {/* Selector de tipo solo para creación */}
        {mode === "create" && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de registro <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(formConfigs).map(([key, value]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleTypeChange(key)}
                  className={`px-4 py-3 rounded-lg border transition-all ${
                    formData.recordType === key
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  <div className="font-medium">{value.title}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {commonFields.map((field) => {
        const fieldConfig = getFieldConfig(field.name);
        const label = field.label || fieldConfig.label || field.name;
        const placeholder =
          field.placeholder ||
          fieldConfig.placeholder ||
          (field.required ? "Campo requerido" : "Opcional");

        return (
          <div key={field.name} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {label}{" "}
              {field.required && <span className="text-red-500">*</span>}
            </label>

            {field.type === "pet-select" ? (
              <select
                name="pet"
                value={formData.pet || ""}
                onChange={handleInputChange}
                required={field.required}
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Seleccionar mascota...</option>
                {pets?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            ) : field.type === "textarea" ? (
              <textarea
                name={field.name}
                rows="3"
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
                disabled={isSubmitting}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed resize-none"
              />
            ) : field.type === "file" ? (
              <div className="space-y-2">
                <input
                  type="file"
                  name={field.name}
                  onChange={handleFileChange}
                  multiple={field.multiple}
                  disabled={isSubmitting}
                  accept={field.accept}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {files.length > 0 ? (
                  <p className="text-xs text-gray-600">
                    📎 {files.length} archivo(s) seleccionado(s)
                  </p>
                ) : mode === "edit" && record?.document_urls?.length > 0 ? (
                  <p className="text-xs text-gray-600">
                    📎 {record.document_urls.length} archivo(s) existente(s)
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Puedes subir fotos, PDFs, recetas, etc. (Max 10MB por archivo)
                  </p>
                )}
              </div>
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                required={field.required}
                disabled={isSubmitting}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            )}
          </div>
        );
      })}

      <div className="flex gap-3 pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition font-medium disabled:opacity-50 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
              {mode === "edit" ? "Actualizando..." : "Guardando..."}
            </>
          ) : (
            <>{mode === "edit" ? "Actualizar registro" : "Guardar registro"}</>
          )}
        </button>
      </div>
    </form>
  );
}