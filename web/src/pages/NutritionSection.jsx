import { useState } from 'react';
import { Clock } from 'lucide-react';
import WeeklyChart from '/components/nutrition/WeeklyChart';
import PetInfoCard from '/components/nutrition/PetInfoCard';
import ReminderModal from '/components/nutrition/ReminderModal';

const petsData = [
  {
    id: '1',
    name: 'Milo',
    breed: 'Gato Siamés',
    color: '#a855f7',
    weight: '4.5 kg',
    foodInfo: {
      tipoComida: 'Comida seca',
      marca: 'Royal Canin',
      porcionDiaria: '2',
      porcionPeso: '80',
      observaciones: 'Servir en porciones iguales mañana y noche',
    },
    dailyCalories: '200 / 300 kcal',
  },
  {
    id: '2',
    name: 'Luna',
    breed: 'Golden Retriever',
    color: '#ec4899',
    weight: '27.0 kg',
    foodInfo: {
      tipoComida: 'Comida mixta',
      marca: 'Pedigree',
      porcionDiaria: '3',
      porcionPeso: '250',
      observaciones:
        'Combinar comida seca con húmeda. Evitar sobrealimentación',
    },
    dailyCalories: '850 / 1200 kcal',
  },
  {
    id: '3',
    name: 'Max',
    breed: 'Labrador',
    color: '#10b981',
    weight: '15.8 kg',
    foodInfo: {
      tipoComida: 'Comida seca',
      marca: 'Pro Plan',
      porcionDiaria: '2',
      porcionPeso: '180',
    },
    dailyCalories: '650 / 950 kcal',
  },
];

export default function NutritionSection() {
  const [selectedPet, setSelectedPet] = useState(petsData[0]);
  const [showReminderForm, setShowReminderForm] = useState(false);

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
        {/* Left Column - Weight Chart */}
        <WeeklyChart
          pets={petsData}
          selectedPet={selectedPet}
          onSelectPet={setSelectedPet}
        />

        {/* Right Column - Selected Pet Details */}
        <div className="space-y-6">
          <PetInfoCard pet={selectedPet} />

          {/* Add Reminder Button */}
          <button
            onClick={() => setShowReminderForm(true)}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-2xl hover:shadow-lg transition-all flex items-center justify-center gap-2 font-medium"
          >
            <span className="text-2xl">+</span>
            <span>Agregar recordatorio de comida</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      <ReminderModal
        isOpen={showReminderForm}
        onClose={() => setShowReminderForm(false)}
      />
    </div>
  );
}