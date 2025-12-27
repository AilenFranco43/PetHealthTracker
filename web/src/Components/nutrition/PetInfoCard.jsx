export default function PetInfoCard({
  pet,
  nutritionRecord,
  weightRecord,
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">
          {pet.name} - {pet.breed}
        </h2>
        <p className="text-sm text-emerald-600 font-medium">● Activo</p>
      </div>

      {/* Peso */}
      {weightRecord && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">Peso actual</p>
          <p className="text-lg font-semibold text-gray-800">
            {weightRecord.weight} kg
          </p>
          <p className="text-xs text-gray-400">
            Registrado el {new Date(weightRecord.created_at).toLocaleDateString()}
          </p>
        </div>
      )}

      {/* Nutrición */}
      {nutritionRecord ? (
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Tipo de comida</p>
            <p className="text-gray-800 font-medium">
              {nutritionRecord.food_type}
            </p>
          </div>

          {nutritionRecord.food_brand && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Marca</p>
              <p className="text-gray-800 font-medium">
                {nutritionRecord.food_brand}
              </p>
            </div>
          )}

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Comidas diarias
            </p>
            <p className="text-gray-800 font-medium">
              {nutritionRecord.daily_meals}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">
              Tamaño de porción
            </p>
            <p className="text-gray-800 font-medium">
              {nutritionRecord.portion_size}
            </p>
          </div>

          {nutritionRecord.notes && (
            <div>
              <p className="text-sm text-gray-500 mb-1">Observaciones</p>
              <p className="text-gray-700">
                {nutritionRecord.notes}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-400 italic">
          No hay información nutricional registrada
        </p>
      )}
    </div>
  );
}
