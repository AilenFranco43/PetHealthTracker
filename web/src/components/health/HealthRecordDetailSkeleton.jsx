import React from "react";

const HealthRecordDetailSkeleton = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header skeleton */}
      <div className="bg-gradient-to-r from-gray-300 to-gray-400 animate-pulse p-8 rounded-3xl">
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            {/* Contenido principal skeleton */}
            <div className="flex items-start gap-5">
              <div className="w-18 h-18 bg-gray-400 rounded-2xl"></div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-8 bg-gray-500 rounded w-32"></div>
                  <div className="h-6 bg-gray-400 rounded-full w-24"></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="h-4 bg-gray-400 rounded w-32"></div>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <div className="h-4 bg-gray-400 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Acciones skeleton */}
            <div className="flex items-center gap-2 self-start lg:self-center">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 bg-gray-400/70 rounded-xl"
                ></div>
              ))}
            </div>
          </div>

          {/* Indicador visual skeleton */}
          <div className="mt-6 pt-6 border-t border-gray-400/30">
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-400 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información principal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tarjeta de mascota skeleton */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-gray-300 rounded w-48"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>

                <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row items-start gap-6">
                    {/* Avatar de mascota skeleton */}
                    <div className="relative flex-shrink-0">
                      <div className="w-28 h-28 bg-gray-300 rounded-2xl"></div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gray-400 rounded-full"></div>
                    </div>

                    {/* Información principal skeleton */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="h-8 bg-gray-300 rounded w-40 mb-3"></div>
                        <div className="flex gap-2">
                          <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                          <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                        </div>
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <div className="flex flex-wrap gap-3">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-4 bg-gray-200 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sección de Información del Registro skeleton */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 overflow-hidden">
              <div className="p-8">
                {/* Header skeleton */}
                <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-300 rounded w-48"></div>
                      <div className="flex gap-2">
                        <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                        <div className="h-4 bg-gray-200 rounded w-40"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Grid de 2 columnas skeleton */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Columna izquierda skeleton */}
                  <div className="space-y-6">
                    {/* Tarjeta de fechas skeleton */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200/50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-gray-300 rounded-lg"></div>
                        <div className="h-5 bg-gray-300 rounded w-32"></div>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 bg-gray-300 rounded w-20"></div>
                            </div>
                            <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100">
                          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div className="h-6 bg-gray-300 rounded w-48 mb-2"></div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-4 bg-gray-300 rounded w-20"></div>
                            </div>
                            <div className="h-6 bg-gray-300 rounded-full w-24"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Columna derecha skeleton */}
                  <div className="space-y-6">
                    {/* Detalles específicos skeleton */}
                    <div className="bg-gradient-to-br from-gray-50/40 to-white rounded-xl p-6 border border-gray-200/50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-9 h-9 bg-gray-300 rounded-lg"></div>
                        <div className="h-5 bg-gray-300 rounded w-40"></div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                          <div className="h-12 bg-gray-200 rounded-lg"></div>
                        </div>
                      </div>
                    </div>

                    {/* Veterinario skeleton */}
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200/50">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-4 bg-gray-300 rounded w-20"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-5 bg-gray-300 rounded w-32"></div>
                        <div className="h-4 bg-gray-200 rounded w-48"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción skeleton */}
                <div className="mb-8">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200/50">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                      <div className="h-5 bg-gray-300 rounded w-40"></div>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Resumen de métricas skeleton */}
                <div className="pt-8 border-t border-gray-100">
                  <div className="h-6 bg-gray-300 rounded w-40 mb-6"></div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100"
                      >
                        <div className="h-8 bg-gray-300 rounded w-8 mb-2"></div>
                        <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Documentos adjuntos skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="h-6 bg-gray-300 rounded w-48"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>

                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200"
                    >
                      <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="flex items-center gap-3">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                          <div className="h-3 bg-gray-300 rounded w-20"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Acciones skeleton */}
          <div className="space-y-6">
            {/* Acciones rápidas skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="h-6 bg-gray-300 rounded w-24 mb-6"></div>

              <div className="space-y-3">
                <div className="h-12 bg-gray-300 rounded-xl"></div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                  <div className="h-10 bg-gray-200 rounded-xl"></div>
                </div>
              </div>
            </div>

            {/* Recordatorio automático skeleton */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-xl"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-blue-300 rounded w-32"></div>
                  <div className="h-3 bg-blue-200 rounded w-48"></div>
                  <div className="h-3 bg-blue-300 rounded w-24"></div>
                </div>
              </div>
            </div>

            {/* Acción de eliminación skeleton */}
            <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-200 rounded-xl"></div>
                <div className="space-y-3 flex-1">
                  <div className="h-5 bg-red-300 rounded w-32"></div>
                  <div className="h-3 bg-red-200 rounded w-48"></div>
                  <div className="h-8 bg-red-300 rounded-lg w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordDetailSkeleton;
