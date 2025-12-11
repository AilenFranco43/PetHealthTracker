import React, { useState, useEffect } from "react";
import TabNavigation from "../components/health/TabNavigation";
import { Stethoscope, Plus } from "lucide-react";
import HealthRecordFormModal from "../components/health/HealthRecordFormModal";
import HealthRecordDetail from "./HealthRecordDetailPage";
import { toast } from "react-hot-toast";
import RecordCard from "../components/health/RecordCard";
import { useHealthRecords } from '../hooks/useHealthRecords';

const HealthPage = () => {
  const [activeTab, setActiveTab] = useState("vaccines");
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [allRecords, setAllRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getHealthRecords, deleteHealthRecord } = useHealthRecords();

  const labels = { 
    vaccines: "vacuna", 
    checkups: "chequeo", 
    treatments: "tratamiento" 
  };
  
  const emptyMessages = {
    vaccines: "Aún no registraste ninguna vacuna.",
    checkups: "Todavía no registraste ningún chequeo.",
    treatments: "No hay tratamientos registrados por el momento.",
  };

  // Filtrar registros según la pestaña activa
  const filteredRecords = allRecords.filter(record => {
    const typeMap = {
      vaccines: "VACUNA",
      checkups: "CHEQUEO",
      treatments: "TRATAMIENTO"
    };
    return record.type === typeMap[activeTab];
  });

  // Cargar registros al montar el componente
  useEffect(() => {
    loadHealthRecords();
  }, []);

  const loadHealthRecords = async () => {
    try {
      setLoading(true);
      const data = await getHealthRecords();
      setAllRecords(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading health records:', error);
      toast.error('Error al cargar los registros de salud');
      setAllRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNewRecord = (newRecord) => {
    // Agregar el nuevo registro al inicio del array
    setAllRecords(prev => [newRecord, ...prev]);
    toast.success(`${labels[activeTab]} agregado correctamente!`);
  };

  const handleDeleteRecord = async (recordId) => {
    try {
      await deleteHealthRecord(recordId);
      
      // Actualizar el estado eliminando el registro
      setAllRecords(prev => prev.filter(record => record.id !== recordId));
      
      // Si el registro eliminado es el que está en detalle, cerrar detalle
      if (selectedRecord && selectedRecord.id === recordId) {
        setShowDetail(false);
        setSelectedRecord(null);
      }
      
      toast.success("Registro eliminado correctamente");
    } catch (error) {
      console.error('Error deleting record:', error);
      toast.error(error.message || "Error al eliminar el registro");
      throw error;
    }
  };

  const handleViewDetail = (record) => {
    setSelectedRecord(record);
    setShowDetail(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 sm:p-8 rounded-3xl shadow-md mb-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Registros de Salud</h1>
            <p className="text-blue-100 text-base lg:text-lg">Historial médico completo</p>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {filteredRecords.length} {labels[activeTab]}{filteredRecords.length !== 1 ? 's' : ''} registrada{filteredRecords.length !== 1 ? 's' : ''}
            </h2>
            <p className="text-gray-600 text-sm">
              {activeTab === "vaccines" && "Controla el calendario de vacunación"}
              {activeTab === "checkups" && "Seguimiento de chequeos médicos"}
              {activeTab === "treatments" && "Registro de tratamientos aplicados"}
            </p>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl px-6 py-3 shadow-lg flex items-center justify-center gap-2 font-medium transition-all hover:shadow-xl"
          >
            <Plus className="w-5 h-5" /> Agregar {labels[activeTab]}
          </button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredRecords.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Stethoscope className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {emptyMessages[activeTab].split('.')[0]}
            </h3>
            <p className="text-gray-600 mb-6">
              {emptyMessages[activeTab].split('.')[1] || 'Comienza agregando el primer registro'}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow hover:shadow-md"
            >
              Crear mi primer {labels[activeTab]}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <RecordCard
                key={record.id}
                data={record}
                type={activeTab === "vaccines" ? "vaccine" : activeTab === "checkups" ? "checkup" : "treatment"}
                onDelete={handleDeleteRecord}
                onClick={handleViewDetail}
              />
            ))}
          </div>
        )}
      </div>

  <HealthRecordFormModal
  open={showModal}
  activeTab={activeTab}
  onClose={() => setShowModal(false)}
  onSubmit={(newRecord) => {
    handleNewRecord(newRecord);
    setShowModal(false);
  }}
/>

      {showDetail && selectedRecord && (
        <HealthRecordDetail
          record={selectedRecord}
          onClose={() => {
            setShowDetail(false);
            setSelectedRecord(null);
          }}
          onDelete={handleDeleteRecord}
          onEdit={() => {
            // Aquí puedes implementar la edición si la necesitas
            toast("Función de edición en desarrollo", { icon: "🔧" });
          }}
        />
      )}

      <div className="h-20 lg:hidden"></div>
    </div>
  );
};

export default HealthPage;