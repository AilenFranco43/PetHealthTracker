import { useState, useEffect } from "react";

import WeeklyChart from "./WeeklyChart";
import PetInfoCard from "./PetInfoCard";
import Modal from "../common/Modal";
import ConfirmModal from "../common/ConfirmModal";
import NutritionRecordForm from "./NutritionRecordForm";
import WeightRecordForm from "./WeightRecordForm";

import { getWeightRecordsRequest } from "../../api/weightRecords";
import { useNutritionRecords } from "../../hooks/useNutritionRecords";

export default function NutritionSection({ pets }) {
  const [selectedPet, setSelectedPet] = useState(null);
  const [weights, setWeights] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  const [showNutritionForm, setShowNutritionForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const {
    records: nutritionRecords,
    getRecords: getNutritionRecords,
    deleteRecord,
  } = useNutritionRecords();

  const latestNutritionRecord =
    nutritionRecords.length > 0
      ? nutritionRecords[nutritionRecords.length - 1]
      : null;

  const loadData = async (petId) => {
    try {
      setLoadingData(true);

      const [weightsData] = await Promise.all([
        getWeightRecordsRequest(petId),
        getNutritionRecords(petId),
      ]);

      setWeights(weightsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (pets.length === 0) return;

    const firstPet = pets[0];
    setSelectedPet(firstPet);

    loadData(firstPet.id);
  }, [pets]);

  const handleSelectPet = async (pet) => {
    setSelectedPet(pet);
    loadData(pet.id);
  };

  const handleDeleteNutrition = async () => {
    if (!latestNutritionRecord) return;

    try {
      setDeleting(true);
      await deleteRecord(latestNutritionRecord.id);
      setShowConfirm(false);
    } catch (error) {
      console.error(error);
    } finally {
      setDeleting(false);
    }
  };

  const loadWeights = async (petId) => {
    try {
      const data = await getWeightRecordsRequest(petId);
      setWeights(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!selectedPet) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WeeklyChart
          pets={pets}
          selectedPet={selectedPet}
          onSelectPet={handleSelectPet}
          weights={weights}
          loading={loadingData}
        />

        <div className="space-y-6">
          <PetInfoCard
            pet={selectedPet}
            nutritionRecord={latestNutritionRecord}
            onRequestDelete={() => setShowConfirm(true)}
          />

          <ConfirmModal
            open={showConfirm}
            title="Eliminar información nutricional"
            message="¿Estás seguro de que querés eliminar esta información?"
            confirmText="Eliminar"
            cancelText="Cancelar"
            loading={deleting}
            warningItems={[
              "Se perderán los datos nutricionales",
              "No podrás recuperarlos luego",
            ]}
            onConfirm={handleDeleteNutrition}
            onCancel={() => setShowConfirm(false)}
          />

          <div className="flex gap-2">
            <button
              onClick={() => setShowNutritionForm(true)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 
    text-white py-4 rounded-2xl 
    flex items-center justify-center gap-3 
    font-medium text-sm
    shadow-md hover:shadow-xl
    hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200"
            >
              {latestNutritionRecord ? (
                "Actualizar registro de nutrición"
              ) : (
                <>
                  <span className="text-xl">+</span> Agregar
                  registro de nutrición
                </>
              )}
            </button>

            <button
              onClick={() => setShowWeightForm(true)}
              className="w-full bg-gradient-to-r from-pink-500 to-purple-500 
    text-white py-4 rounded-2xl 
    flex items-center justify-center gap-3 
    font-medium text-sm
    shadow-md hover:shadow-xl
    hover:scale-[1.02] active:scale-[0.98]
    transition-all duration-200"
            >
              <span className="text-xl">+</span>
              Agregar registro de peso
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={showNutritionForm}
        onClose={() => setShowNutritionForm(false)}
      >
        <NutritionRecordForm
          pet={selectedPet}
          onClose={() => setShowNutritionForm(false)}
          onSaved={() => getNutritionRecords(selectedPet.id)}
        />
      </Modal>

      <Modal open={showWeightForm} onClose={() => setShowWeightForm(false)}>
        <WeightRecordForm
          pet={selectedPet}
          onClose={() => setShowWeightForm(false)}
          onSaved={() => loadWeights(selectedPet.id)}
        />
      </Modal>
    </div>
  );
}
