import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const weightData = [
  { week: 'Sem 1', Milo: 5.8, Luna: 6.3, Max: 4.9 },
  { week: 'Sem 2', Milo: 7.1, Luna: 5.4, Max: 6.7 },
  { week: 'Sem 3', Milo: 4.6, Luna: 6.1, Max: 5.9 },
  { week: 'Sem 4', Milo: 7.0, Luna: 6.4, Max: 5.2 },
];

export default function WeeklyChart({ pets, selectedPet, onSelectPet }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-purple-600" />
        <h2 className="text-lg font-semibold text-gray-900">
          Control de peso de todas las mascotas
        </h2>
      </div>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={weightData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="week"
            tick={{ fontSize: 12 }}
            stroke="#888"
          />
          <YAxis
            tick={{ fontSize: 12 }}
            stroke="#888"
            domain={[2, 'auto']}
            label={{
              value: 'kg',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Milo"
            stroke="#a855f7"
            strokeWidth={2}
            dot={{ fill: '#a855f7', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Luna"
            stroke="#ec4899"
            strokeWidth={2}
            dot={{ fill: '#ec4899', r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="Max"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Pet selector tabs */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-500 mb-3">Selecciona una mascota:</p>
        <div className="space-y-2">
          {pets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => onSelectPet(pet)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                selectedPet.id === pet.id
                  ? 'bg-purple-50 border-2 border-purple-300'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {pet.name} - {pet.breed}
                  </p>
                  <p className="text-sm text-gray-600">Peso: {pet.weight}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}