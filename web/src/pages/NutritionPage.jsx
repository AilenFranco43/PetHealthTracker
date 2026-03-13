import { useEffect } from "react";
import NutritionSection from "../components/nutrition/NutritionSection";
import NutritionPageSkeleton from "../components/nutrition/NutritionPageSkeleton";
import { usePets } from "../hooks/usePets";
import { Clock } from "lucide-react";

export default function NutritionPage() {
  const { pets, getPets, loading } = usePets();

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 mt-14 lg:mt-0">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 lg:p-8 mb-6 text-white shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">Nutrición</h2>
            <p className="text-purple-100 text-base lg:text-lg">
              Plan de alimentación
            </p>
          </div>

          <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center lg:w-16 lg:h-16 lg:rounded-3xl">
            <Clock className="w-6 h-6 lg:w-6 lg:h-8" />
          </div>
        </div>
      </div>

      {loading ? <NutritionPageSkeleton /> : <NutritionSection pets={pets} />}
    </div>
  );
}
