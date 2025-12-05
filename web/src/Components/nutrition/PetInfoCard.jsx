export default function PetInfoCard({ pet }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">
          {pet.name} - {pet.breed}
        </h2>
        <p className="text-sm text-emerald-600 font-medium">● Activo</p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Tipo de comida</p>
          <p className="text-gray-800 font-medium">{pet.foodInfo.tipoComida}</p>
        </div>

        {pet.foodInfo.marca && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Marca</p>
            <p className="text-gray-800 font-medium">{pet.foodInfo.marca}</p>
          </div>
        )}

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Porción diaria (cantidad de porciones diarias)
          </p>
          <p className="text-gray-800 font-medium">
            {pet.foodInfo.porcionDiaria} porciones
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">
            Porción en peso (cantidad en peso por porción)
          </p>
          <p className="text-gray-800 font-medium">
            {pet.foodInfo.porcionPeso} gramos
          </p>
        </div>

        {pet.foodInfo.observaciones && (
          <div>
            <p className="text-sm text-gray-500 mb-1">Observaciones</p>
            <p className="text-gray-800">{pet.foodInfo.observaciones}</p>
          </div>
        )}

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-1">Calorías diarias</p>
          <p className="text-gray-800 font-semibold text-lg">
            {pet.dailyCalories}
          </p>
        </div>
      </div>
    </div>
  );
}