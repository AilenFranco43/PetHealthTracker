import React, { useState } from 'react';
import { Apple, Plus } from 'lucide-react';
import WeeklyStats from './WeeklyStats';
import PetCard from './PetCard';

export default function NutritionSection() {
  const [pets, setPets] = useState([
    {
      id: 1,
      name: 'Luna',
      species: 'Golden Retriever',
      calories: { current: 850, total: 1200 },
      meals: [
        { id: 1, name: 'Desayuno', time: '08:00', amount: '200g', completed: true },
        { id: 2, name: 'Almuerzo', time: '13:00', amount: '250g', completed: true },
        { id: 3, name: 'Cena', time: '19:00', amount: '250g', completed: false }
      ]
    },
    {
      id: 2,
      name: 'Milo',
      species: 'Gato Siamés',
      calories: { current: 200, total: 300 },
      meals: [
        { id: 1, name: 'Desayuno', time: '09:00', amount: '80g', completed: true },
        { id: 2, name: 'Cena', time: '20:00', amount: '80g', completed: false }
      ]
    }
  ]);

  const toggleMeal = (petId, mealId) => {
    setPets(prevPets => 
      prevPets.map(pet => {
        if (pet.id === petId) {
          return {
            ...pet,
            meals: pet.meals.map(meal => 
              meal.id === mealId ? { ...meal, completed: !meal.completed } : meal
            )
          };
        }
        return pet;
      })
    );
  };

  const handleAddReminder = () => {
    alert('Funcionalidad de agregar recordatorio');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white p-6 lg:p-8 rounded-3xl shadow-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Nutrición</h1>
              <p className="text-purple-100 text-base lg:text-lg">Plan de alimentación</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <Apple className="w-8 h-8" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <WeeklyStats />
            <PetCard 
              pet={pets[0]} 
              onToggleMeal={(mealId) => toggleMeal(1, mealId)}
            />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <PetCard 
              pet={pets[1]} 
              onToggleMeal={(mealId) => toggleMeal(2, mealId)}
            />

            <button 
              onClick={handleAddReminder}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-xl py-4 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 font-medium text-base"
            >
              <Plus className="w-5 h-5" />
              Agregar recordatorio de comida
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}