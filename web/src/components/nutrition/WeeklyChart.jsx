import { TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function WeeklyChart({
  pets = [],
  selectedPet,
  onSelectPet,
  weights = [],
  loading,
}) {
  if (!selectedPet) return null;

const chartData = weights.map((record) => ({
  date: new Date(record.recorded_at).toLocaleDateString('es-AR'),
  weight: record.weight,
}));

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-[#0A99A5]" />
        <h2 className="text-lg font-semibold">
          Evolución de peso
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center">Cargando pesos...</p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-400 text-center">
          No hay registros de peso
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#0A99A5"
              strokeWidth={2}
              dot
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Selector mascota */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-500 mb-3">
          Seleccioná una mascota:
        </p>

        {pets.map((pet) => (
          <button
            key={pet.id}
            onClick={() => onSelectPet(pet)}
            className={`w-full px-4 py-3 rounded-xl mb-2 ${
              selectedPet.id === pet.id
                ? 'bg-[#0A99A5]/10 border border-[#0A99A5]'
                : 'bg-gray-50'
            }`}
          >
            {pet.name}
          </button>
        ))}
      </div>
    </div>
  );
}
