import { useMemo } from "react";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function WeeklyChart({
  pets = [],
  selectedPet,
  onSelectPet,
  weights = [],
  loading,
}) {
  if (!selectedPet) return null;

  const chartData = useMemo(() => {
    const sorted = [...weights].sort(
      (a, b) => new Date(a.recorded_at) - new Date(b.recorded_at)
    );

    return sorted.map((record) => ({
      date: new Date(record.recorded_at).toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
      }),
      weight: record.weight,
    }));
  }, [weights]);

  const currentWeight =
    chartData.length > 0 ? chartData[chartData.length - 1].weight : null;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-[#0A99A5]" />
          <h2 className="text-lg font-semibold">Evolución de peso</h2>
        </div>

        {currentWeight && (
          <div className="text-right">
            <p className="text-xs text-gray-400">Peso actual</p>
            <p className="text-lg font-semibold text-[#0A99A5]">
              {currentWeight} kg
            </p>
          </div>
        )}
      </div>

      {/* Chart */}
      {loading ? (
        <p className="text-gray-400 text-center">Cargando pesos...</p>
      ) : chartData.length === 0 ? (
        <p className="text-gray-400 text-center">
          Todavía no hay registros de peso para {selectedPet.name}
        </p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={chartData}>
            {/* Gradient */}
            <defs>
              <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0A99A5" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#0A99A5" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis domain={["auto", "auto"]} />

            <Tooltip
              formatter={(value) => [`${value} kg`, "Peso"]}
              labelFormatter={(label) => `Fecha: ${label}`}
            />

            <Line
              type="monotone"
              dataKey="weight"
              stroke="url(#colorWeight)"
              strokeWidth={3}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
              animationDuration={500}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      {/* Selector mascota */}
      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-500 mb-3">Seleccioná una mascota:</p>

        {pets.map((pet) => (
          <button
            key={pet.id}
            aria-label={`Seleccionar mascota ${pet.name}`}
            onClick={() => onSelectPet(pet)}
            className={`w-full px-4 py-3 rounded-xl mb-2 transition ${
              selectedPet.id === pet.id
                ? "bg-[#0A99A5]/10 border border-[#0A99A5]"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {pet.name}
          </button>
        ))}
      </div>
    </div>
  );
}