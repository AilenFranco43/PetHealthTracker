import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function WeeklyStats() {
  const weeklyStats = [
    { day: 'Lun', percentage: 95 },
    { day: 'Mar', percentage: 100 },
    { day: 'Mié', percentage: 85 },
    { day: 'Jue', percentage: 100 },
    { day: 'Vie', percentage: 90 },
    { day: 'Sáb', percentage: 100 },
    { day: 'Dom', percentage: 70 }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Estadísticas Semanales</h2>
      </div>
      <div className="flex items-end justify-between gap-2 h-40">
        {weeklyStats.map((stat, index) => (
          <div key={index} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-gray-100 rounded-full overflow-hidden flex flex-col justify-end h-full">
              <div 
                className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-500 hover:from-purple-600 hover:to-pink-600"
                style={{ height: `${stat.percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 font-medium">{stat.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}