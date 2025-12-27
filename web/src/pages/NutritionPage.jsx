import { useEffect } from 'react';
import NutritionSection from '../components/nutrition/NutritionSection';
import NutritionPageSkeleton from '../components/nutrition/NutritionPageSkeleton';
import { usePets } from '../hooks/usePets';

export default function NutritionPage() {
  const { pets, getPets, loading } = usePets();

  useEffect(() => {
    getPets();
  }, []);

  if (loading && pets.length === 0) {
    return <NutritionPageSkeleton />;
  }

  return <NutritionSection />;
}
