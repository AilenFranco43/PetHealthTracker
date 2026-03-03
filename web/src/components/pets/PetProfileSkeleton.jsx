const PetProfileSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8 animate-pulse">
      <div className="flex gap-3 mb-5">
        <div className="h-5 w-20 bg-gray-300 rounded"></div>
      </div>

      <div className="max-w-3xl mx-auto p-4 relative">
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-br from-emerald-500 to-teal-600 p-4 lg:p-6 lg:rounded-t-3xl"></div>

        <div className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto text-center z-10 relative">
          {/* Imagen */}
          <div className="flex justify-center">
            <div className="w-36 h-36 rounded-full bg-gray-300 shadow-md"></div>
          </div>

          {/* Nombre */}
          <div className="h-8 bg-gray-300 rounded mt-4 mx-auto w-48"></div>

          {/* Badge especie */}
          <div className="h-6 bg-gray-200 rounded-full mt-2 mx-auto w-24"></div>

          {/* Stats */}
          <div className="flex justify-center gap-10 mt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded mt-2 w-16"></div>
                <div className="h-5 bg-gray-300 rounded mt-1 w-20"></div>
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex justify-center gap-6 mt-10">
            <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
            <div className="h-10 bg-gray-200 rounded-xl w-full"></div>
          </div>
        </div>

        {/* Records */}
        <div className="mt-10">
          <div className="h-40 bg-gray-100 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default PetProfileSkeleton;
