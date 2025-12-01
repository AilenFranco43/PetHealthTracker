import React from 'react';
import { Clock } from 'lucide-react';

export default function MealItem({ meal, onToggle }) {
  return (
    <div 
      onClick={onToggle}
      className={`rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer ${
        meal.completed ? 'bg-green-50' : 'bg-white'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
          meal.completed ? 'bg-green-100' : 'bg-purple-100'
        }`}>
          <Clock className={`w-7 h-7 ${
            meal.completed ? 'text-green-600' : 'text-purple-600'
          }`} />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-gray-900 font-medium text-lg">{meal.name}</h3>
            {meal.completed && (
              <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-600 text-white">
                Completado
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600">{meal.time} • {meal.amount}</p>
        </div>
      </div>
    </div>
  );
}