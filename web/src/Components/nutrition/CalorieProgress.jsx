import React from 'react';

export default function CalorieProgress({ current, total }) {
  const percentage = (current / total) * 100;
  
  return (
    <div className="bg-white rounded-2xl shadow-lg p-5 mb-4 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">Calorías diarias</span>
        <span className="text-gray-900 font-medium">
          {current} / {total} kcal
        </span>
      </div>
      <div className="relative w-full overflow-hidden rounded-full h-3 bg-gray-100">
        <div 
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}