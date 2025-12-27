function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
}

export default function NutritionSectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-6 bg-gray-50">
      {/* HEADER */}
      <div className="rounded-3xl p-6 lg:p-8 bg-gray-100 animate-pulse">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
          <Skeleton className="w-12 h-12 lg:w-16 lg:h-16 rounded-full" />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* WEEKLY CHART */}
        <div className="bg-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-40" />
          </div>

          <Skeleton className="h-[250px] w-full rounded-xl" />

          {/* Selector mascotas */}
          <div className="pt-4 border-t border-gray-200 space-y-3">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>

        {/* INFO + BUTTON */}
        <div className="space-y-6">
          {/* PET INFO CARD */}
          <div className="bg-gray-100 rounded-2xl p-6 shadow-sm space-y-6">
            {/* Header */}
            <div className="space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-24" />
            </div>

            {/* Nutrition blocks */}
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-48" />

              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-40" />

              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>

          {/* BUTTON */}
          <Skeleton className="h-16 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
