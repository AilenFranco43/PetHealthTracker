export default function SkeletonPetCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col animate-pulse">
      {/* Imagen */}
      <div className="h-48 w-full bg-gray-300" />

      <div className="p-4 space-y-3">
        {/* Nombre */}
        <div className="h-6 w-1/2 bg-gray-300 rounded-md"></div>

        {/* Breed + Age */}
        <div className="h-4 w-1/3 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
}
