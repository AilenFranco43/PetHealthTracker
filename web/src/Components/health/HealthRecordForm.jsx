import { useState, useEffect } from "react";
import { usePets } from "../../hooks/usePets";
import { useHealthRecords } from "../../hooks/useHealthRecords";
import { toast } from "react-hot-toast";
import Button from "../common/Button";

// Configuración de formularios
const formConfigs = {
  vaccines: {
    title: "Nueva Vacuna",
    typeLabel: "Nombre de la vacuna",
    typePlaceholder: "Ej: Rabia, Moquillo, Parvovirus",
    descriptionLabel: "Descripción (opcional)",
    descriptionPlaceholder: "Ej: Vacuna anual, lote #ABC123, reactivo leve",
    firstDateLabel: "Fecha de aplicación",
    secondDateLabel: "Próxima aplicación (opcional)",
    recordType: "VACUNA",
  },
  checkups: {
    title: "Nuevo Chequeo",
    typeLabel: "Tipo de chequeo",
    typePlaceholder: "Ej: General, Dental, Dermatológico",
    descriptionLabel: "Descripción detallada",
    descriptionPlaceholder:
      "Ej: Control de peso, examen de sangre, observaciones",
    firstDateLabel: "Fecha realizado",
    secondDateLabel: "Próximo chequeo (opcional)",
    recordType: "CHEQUEO",
  },
  treatments: {
    title: "Nuevo Tratamiento",
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
  },
];

export default function HealthRecordForm({ activeTab, onClose, onSubmit }) {
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState([]);
  const { createHealthRecord } = useHealthRecords();
  const { pets, getPets } = usePets();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = formConfigs[activeTab];

  useEffect(() => {
    getPets();
  }, []);

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

      let description = formData.type.trim();
      if (formData.description && formData.description.trim() !== "") {
        description = `${formData.type.trim()} - ${formData.description.trim()}`;
      }

      const requestData = {
        pet_id: formData.pet,
        type: config.recordType,
        description,
        first_date: formData.first_date,
      };

      if (formData.second_date?.trim())
        requestData.second_date = formData.second_date;
      if (formData.vet?.trim()) requestData.vet_name = formData.vet.trim();
      if (files.length > 0) requestData.documents = files;

      const newRecord = await createHealthRecord(requestData);
      toast.success(`${config.title} guardado correctamente!`);

      if (onSubmit) onSubmit(newRecord);
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

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      {commonFields.map((field) => {
        const fieldConfig = getFieldConfig(field.name);
        const label = field.label || fieldConfig.label || field.name;
        const placeholder =
          field.placeholder ||
          fieldConfig.placeholder ||
          (field.required ? "Campo requerido" : "Opcional");

        return (
          <div key={field.name} className="space-y-1">
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
              <div className="space-y-1">
                <input
                  type="file"
                  name={field.name}
                  onChange={handleFileChange}
                  multiple={field.multiple}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white disabled:opacity-50 disabled:cursor-not-allowed file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {files.length > 0 ? (
                  <p className="text-xs text-gray-600">
                    📎 {files.length} archivo(s) seleccionado(s)
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Puedes subir fotos, PDFs, recetas, etc.
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
        <Button
          text="Cancelar"
          mode="delete"
          loading={isSubmitting}
          type="button"
          onClick={onClose}
        />

        <Button text="Guardar registro" mode="create" loading={isSubmitting} />
      </div>
    </form>
  );
}
