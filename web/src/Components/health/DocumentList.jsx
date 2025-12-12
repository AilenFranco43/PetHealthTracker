import React, { useState, useRef } from "react";
import {
  Download,
  File,
  Loader2,
  Trash2,
  Plus,
  X,
  Upload,
  Check,
} from "lucide-react";
import ConfirmModal from "../common/ConfirmModal"; // Asegúrate de importarlo

const DocumentList = ({
  documents,
  onDeleteDocument,
  onAddDocument,
  readOnly = false,
}) => {
  const [downloading, setDownloading] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  
  // Estados para el modal de confirmación
  const [documentToDelete, setDocumentToDelete] = useState({
    index: null,
    name: "",
    showConfirm: false
  });
  const [isDeletingDocument, setIsDeletingDocument] = useState(false);

  // Función para manejar la selección de archivo
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("El archivo es demasiado grande. Máximo 10MB");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Tipo de archivo no permitido. Solo JPG, PNG, PDF y DOC");
        return;
      }

      setSelectedFile(file);
      setFileName(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  // Función para agregar documento
  const handleAddDocument = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      await onAddDocument(selectedFile, fileName || selectedFile.name);

      setSelectedFile(null);
      setFileName("");
      setShowAddForm(false);
      setUploadProgress(0);
    } catch (error) {
      console.error("Error al subir documento:", error);
      alert("Error al subir el documento: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  // Función para descargar
  const handleDownload = async (url, fileName, index) => {
    try {
      setDownloading(index);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Error al descargar:", error);
      window.open(url, "_blank");
    } finally {
      setDownloading(null);
    }
  };

  // Función para iniciar eliminación (muestra el modal)
  const handleDelete = (index) => {
    if (!onDeleteDocument) return;
    
    const fileName = getFileNameFromUrl(documents[index]);
    setDocumentToDelete({
      index,
      name: fileName,
      showConfirm: true
    });
  };

  // Función para confirmar eliminación
  const confirmDelete = async () => {
    if (documentToDelete.index === null || !onDeleteDocument) return;
    
    setIsDeletingDocument(true);
    try {
      await onDeleteDocument(documentToDelete.index);
      setDocumentToDelete({
        index: null,
        name: "",
        showConfirm: false
      });
    } catch (error) {
      console.error("Error al eliminar documento:", error);
    } finally {
      setIsDeletingDocument(false);
    }
  };

  // Función para obtener nombre del archivo
  const getFileNameFromUrl = (url) => {
    try {
      const urlParts = url.split("/");
      const fileNameWithParams = urlParts[urlParts.length - 1];
      const fileName = fileNameWithParams.split("?")[0];

      try {
        return decodeURIComponent(fileName);
      } catch {
        return fileName;
      }
    } catch {
      return "documento.pdf";
    }
  };

  if (!documents) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Documentos adjuntos
            </h2>
            {!readOnly && (
              <p className="text-sm text-gray-500 mt-1">
                Puedes agregar o eliminar documentos (máx. 10MB por archivo)
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {documents.length} archivo{documents.length !== 1 ? "s" : ""}
            </span>
            {!readOnly && (
              <button
                onClick={() => setShowAddForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm hover:shadow"
              >
                <Plus className="w-4 h-4" />
                Agregar
              </button>
            )}
          </div>
        </div>

        {/* Formulario para agregar nuevo documento */}
        {showAddForm && !readOnly && (
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-blue-900">
                Subir nuevo documento
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setSelectedFile(null);
                  setFileName("");
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-4">
              <div
                onClick={() => fileInputRef.current.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  selectedFile
                    ? "border-green-500 bg-green-50"
                    : "border-gray-300 hover:border-blue-500 hover:bg-blue-50"
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                />

                {selectedFile ? (
                  <div className="flex items-center justify-center gap-3">
                    <Check className="w-8 h-8 text-green-500" />
                    <div className="text-left">
                      <p className="font-medium text-green-700">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">
                      Haz clic para seleccionar un archivo
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, PNG, PDF, DOC (máx. 10MB)
                    </p>
                  </>
                )}
              </div>

              {selectedFile && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del archivo (opcional)
                  </label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="ejemplo: receta-medica"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Se mantendrá la extensión original del archivo
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={isUploading || !selectedFile}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Subiendo...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Subir documento
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de documentos */}
        <div className="space-y-3">
          {documents.length === 0 ? (
            <div className="text-center py-8">
              <File className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No hay documentos adjuntos</p>
              {!readOnly && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Subir tu primer documento
                </button>
              )}
            </div>
          ) : (
            documents.map((url, index) => {
              const fileName = getFileNameFromUrl(url);
              const fileExtension =
                fileName.split(".").pop()?.toLowerCase() || "file";
              const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(
                fileExtension
              );
              const isPDF = fileExtension === "pdf";

              return (
                <div
                  key={index}
                  className="group relative flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl border border-gray-200 transition-all hover:border-gray-300"
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
                    {downloading === index ? (
                      <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                    ) : isImage ? (
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
                      {downloading === index && (
                        <span className="ml-2 text-xs text-blue-600 animate-pulse">
                          Descargando...
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-3">
                      <span className="uppercase bg-gray-100 px-2 py-0.5 rounded text-xs">
                        {fileExtension}
                      </span>
                      <button
                        onClick={() => handleDownload(url, fileName, index)}
                        disabled={downloading === index}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {downloading === index ? "Procesando..." : "Descargar"}
                        {downloading !== index && (
                          <Download className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">#{index + 1}</span>
                    {!readOnly && (
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        title="Eliminar documento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modal de confirmación para eliminar documento */}
      <ConfirmModal
        open={documentToDelete.showConfirm}
        title="Eliminar documento"
        message={`¿Estás seguro de que quieres eliminar "${documentToDelete.name}"?`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={isDeletingDocument}
        mode="delete"
        showWarning={true}
        warningItems={[
          "El documento será eliminado permanentemente",
          "Esta acción no se puede deshacer",
        ]}
        onConfirm={confirmDelete}
        onCancel={() => setDocumentToDelete({
          index: null,
          name: "",
          showConfirm: false
        })}
      />
    </div>
  );
};

export default DocumentList;