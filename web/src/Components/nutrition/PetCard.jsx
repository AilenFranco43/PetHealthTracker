import React from 'react';
import CalorieProgress from './CalorieProgress';
import MealItem from './MealItem';

export default function PetCard({ pet, onToggleMeal }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold text-gray-900">
          {pet.name} - {pet.species}
        </h2>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">
          Activo
        </span>
      </div>

      <CalorieProgress 
        current={pet.calories.current} 
        total={pet.calories.total} 
      />

      <div className="space-y-3">
        {pet.meals.map(meal => (
          <MealItem 
            key={meal.id}
            meal={meal}
            onToggle={() => onToggleMeal(meal.id)}
          />
        ))}
      </div>
    </div>
  );
}