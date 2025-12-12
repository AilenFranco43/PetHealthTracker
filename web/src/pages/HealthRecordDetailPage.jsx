import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, ChevronLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { useHealthRecordDetail } from "../hooks/useHealthRecordDetail";
import { useHealthRecords } from "../hooks/useHealthRecords";
import HealthRecordDetailSkeleton from "../components/health/HealthRecordDetailSkeleton";
import PetInfoCard from "../components/health/PetInfoCard";
import HealthInfoCard from "../components/health/HealthInfoCard";
import HealthRecordHeader from "../components/health/HealthRecordHeader";
import DocumentList from "../components/health/DocumentList";
import ActionSidebar from "../components/health/ActionSidebar";
import ConfirmModal from "../components/common/ConfirmModal";
import HealthRecordForm from "../components/health/HealthRecordForm";
import Modal from "../components/common/Modal";

const HealthRecordDetailPage = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { updateHealthRecord, getHealthRecord, deleteHealthRecord } =
    useHealthRecords();

  const {
    record,
    config,
    loading,
    showDeleteConfirm,
    isDeleting,
    setShowDeleteConfirm,
    handleDelete,
    formatShortDate,
    formatHealthDate,
    formatPrintDate,
    getRelativeDate,
    loadRecord,
  } = useHealthRecordDetail();

  const handlePrint = () => {
    if (!record) return;

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
            <p>${formatPrintDate(record.created_at)}</p>
          </div>
          <div class="section">
            <div class="label">Mascota:</div>
            <div class="value">${record.pet?.name || "No especificada"}</div>
          </div>
          <div class="section">
            <div class="label">Fecha:</div>
            <div class="value">${formatPrintDate(record.first_date)}</div>
          </div>
          ${
            record.second_date
              ? `
          <div class="section">
            <div class="label">Próxima fecha:</div>
            <div class="value">${formatPrintDate(record.second_date)}</div>
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
    if (!record || !navigator.share) return;

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
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleEditSuccess = (updatedRecord) => {
    // Recargar los datos del servidor
    loadRecord();
    toast.success("✅ Registro actualizado correctamente");
    setShowEditModal(false);
  };

  if (loading) {
    return <HealthRecordDetailSkeleton />;
  }

  const handleAddDocument = async (file, customName) => {
    console.log("Subiendo archivo:", file.name, file.size);
    console.log("Custom name:", customName);
    console.log("Documentos antes:", record?.document_urls);

    if (!record) return;

    try {
      // IMPORTANTE: Si document_urls está vacío, NO lo incluyas en la data
      const updateData = {
        documents: [file], // Solo el archivo
      };

      // Solo agregar document_urls si hay documentos existentes
      const existingDocs = record.document_urls || [];
      if (existingDocs.length > 0) {
        updateData.document_urls = existingDocs;
      }

      console.log("Enviando objeto:", updateData);
      console.log("document_urls incluido?", "document_urls" in updateData);

      const result = await updateHealthRecord(record.id, updateData);
      console.log("Respuesta del servidor:", result);

      loadRecord();
      toast.success("✅ Documento subido correctamente");
    } catch (error) {
      console.error("Error completo:", error);
      toast.error(`❌ Error: ${error.message}`);
    }
  };

  const handleDeleteDocument = async (index) => {
    if (!record) return;

    try {
      // Crear nueva lista sin el documento a eliminar
      const updatedDocuments = [...record.document_urls];
      updatedDocuments.splice(index, 1);

      // Enviar solo la nueva lista de document_urls
      await updateHealthRecord(record.id, {
        document_urls: updatedDocuments,
      });

      // Recargar los datos
      loadRecord();
      toast.success("✅ Documento eliminado correctamente");
    } catch (error) {
      console.error("Error al eliminar documento:", error);
      toast.error("❌ Error al eliminar documento");
    }
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <HealthRecordHeader
        record={record}
        config={config}
        formatShortDate={formatShortDate}
        handleEdit={handleEdit}
        handlePrint={handlePrint}
        handleShare={handleShare}
      />

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información principal */}
          <div className="lg:col-span-2 space-y-6">
            <PetInfoCard pet={record.pet} />

            <HealthInfoCard
              record={record}
              config={config}
              formatDate={formatHealthDate}
              getRelativeDate={getRelativeDate}
            />

            <DocumentList
              documents={record.document_urls}
              onAddDocument={handleAddDocument}
              onDeleteDocument={handleDeleteDocument}
            />
          </div>

          {/* Columna derecha - Acciones e información */}
          <div className="space-y-6">
            <ActionSidebar
              onEdit={handleEdit}
              onPrint={handlePrint}
              onShare={handleShare}
              onDelete={() => setShowDeleteConfirm(true)}
            />
          </div>
        </div>
      </div>

      {/* Modal de confirmación de eliminación */}
      <ConfirmModal
        open={showDeleteConfirm}
        title="Eliminar registro"
        message="¿Estás seguro de que quieres eliminar este registro?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={isDeleting}
        mode="delete"
        showWarning={true}
        warningItems={[
          "Se eliminarán todos los archivos adjuntos",
          "Se eliminará el recordatorio asociado",
          "La información no podrá recuperarse",
        ]}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirm(false)}
      />

      {/* Modal de edición */}
      <Modal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        className="max-w-2xl"
      >
        <HealthRecordForm
          record={record}
          mode="edit"
          onClose={() => setShowEditModal(false)}
          onSuccess={handleEditSuccess}
        />
      </Modal>
    </div>
  );
};

export default HealthRecordDetailPage;
