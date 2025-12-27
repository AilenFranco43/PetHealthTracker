import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import WeeklyChart from './WeeklyChart';
import PetInfoCard from './PetInfoCard';
import Modal from '../common/Modal';
import NutritionRecordForm from './NutritionRecordForm';
import { usePets } from '../../hooks/usePets';
import { getWeightRecordsRequest } from '../../api/weightRecords';
import { useNutritionRecords } from '../../hooks/useNutritionRecords';

export default function NutritionSection() {
  const { pets } = usePets();

  const [selectedPet, setSelectedPet] = useState(null);
  const [weights, setWeights] = useState([]);
  const [loadingWeights, setLoadingWeights] = useState(false);
  const [showNutritionForm, setShowNutritionForm] = useState(false);

  const {
    records: nutritionRecords,
    getRecords: getNutritionRecords,
  } = useNutritionRecords();

  // 🔹 Seleccionar primera mascota
  useEffect(() => {
    if (pets.length > 0 && !selectedPet) {
      setSelectedPet(pets[0]);
    }
  }, [pets, selectedPet]);

  // 🔹 Cargar nutrición
  useEffect(() => {
    if (!selectedPet) return;
    getNutritionRecords(selectedPet.id);
  }, [selectedPet]);

  // 🔹 Cargar pesos
  useEffect(() => {
    if (!selectedPet) return;

    const loadWeights = async () => {
      try {
        setLoadingWeights(true);
        const data = await getWeightRecordsRequest(selectedPet.id);
        setWeights(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingWeights(false);
      }
    };

    loadWeights();
  }, [selectedPet]);

  const latestNutritionRecord =
    nutritionRecords.length > 0
      ? nutritionRecords[nutritionRecords.length - 1]
      : null;

  /* =============================
     🟢 SI NO HAY PET TODAVÍA
     (EVITA PANTALLA BLANCA)
     ============================= */
  if (!selectedPet) {
    return <div className="max-w-7xl mx-auto p-4 lg:p-8 h-96" />;
  }

  /* =============================
     🟢 CONTENIDO REAL
     ============================= */
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 lg:p-8 mb-6 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-1">Nutrición</h1>
            <p className="text-purple-100">Plan de alimentación</p>
          </div>
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyChart
          pets={pets}
          selectedPet={selectedPet}
          onSelectPet={setSelectedPet}
          weights={weights}
          loading={loadingWeights}
        />

        <div className="space-y-6">
          <PetInfoCard
            pet={selectedPet}
            nutritionRecord={latestNutritionRecord}
          />

          <button
            onClick={() => setShowNutritionForm(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
          >
            <span className="text-2xl">+</span>
            <span>Agregar registro de salud</span>
          </button>
        </div>
      </div>

      <Modal
        open={showNutritionForm}
        onClose={() => setShowNutritionForm(false)}
      >
        <NutritionRecordForm
          pet={selectedPet}
          onClose={() => setShowNutritionForm(false)}
        />
      </Modal>
    </div>
  );
}
