import { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../common/Button";
import { useNutritionRecords } from "../../hooks/useNutritionRecords";

export default function NutritionRecordForm({ pet, onClose }) {
  const { createRecord, loading } = useNutritionRecords();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    food_type: "",
    food_brand: "",
    daily_meals: "",
    portion_size: "",
    notes: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pet?.id) {
      toast.error("No se pudo identificar la mascota");
      return;
    }

    
    if (!form.food_type.trim()) {
      toast.error("El tipo de alimento es obligatorio");
      return;
    }

    if (!form.daily_meals) {
      toast.error("Debes indicar cuántas comidas diarias");
      return;
    }

    if (Number(form.daily_meals) <= 0) {
      toast.error("Las comidas diarias deben ser mayor a 0");
      return;
    }

    if (!form.portion_size.trim()) {
      toast.error("El tamaño de la porción es obligatorio");
      return;
    }

    const payload = {
      pet_id: pet.id,
      food_type: form.food_type.trim(),
      food_brand: form.food_brand?.trim() || undefined,
      daily_meals: Number(form.daily_meals),
      portion_size: form.portion_size.trim(),
      notes: form.notes?.trim() || undefined,
    };

    try {
      setIsSubmitting(true);
      await createRecord(payload);
      toast.success("✅ Registro de nutrición guardado");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        error?.message || "Ocurrió un error al guardar el registro"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">
          Registro de nutrición
        </h2>
        <p className="text-sm text-gray-500">
          Mascota: <span className="font-medium">{pet?.name}</span>
        </p>
      </div>

      {/* Tipo de alimento */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tipo de alimento <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="food_type"
          value={form.food_type}
          onChange={handleChange}
          placeholder="Croquetas, BARF, comida casera..."
          required
          disabled={loading || isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-[#0A99A5] focus:border-[#0A99A5]
            disabled:opacity-50"
        />
      </div>

      {/* Marca */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Marca (opcional)
        </label>
        <input
          type="text"
          name="food_brand"
          value={form.food_brand}
          onChange={handleChange}
          placeholder="Royal Canin, Pro Plan..."
          disabled={loading || isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-[#0A99A5] focus:border-[#0A99A5]
            disabled:opacity-50"
        />
      </div>

      {/* Comidas diarias */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Comidas diarias <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          min={1}
          max={10}
          name="daily_meals"
          value={form.daily_meals}
          onChange={handleChange}
          required
          disabled={loading || isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-[#0A99A5] focus:border-[#0A99A5]
            disabled:opacity-50"
        />
      </div>

      {/* Tamaño de porción */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Tamaño de porción <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="portion_size"
          value={form.portion_size}
          onChange={handleChange}
          placeholder="200g, 1 taza, 1/2 lata"
          required
          disabled={loading || isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg
            focus:ring-2 focus:ring-[#0A99A5] focus:border-[#0A99A5]
            disabled:opacity-50"
        />
      </div>

      {/* Observaciones */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Observaciones
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows={3}
          placeholder="Notas adicionales sobre la alimentación"
          disabled={loading || isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none
            focus:ring-2 focus:ring-[#0A99A5] focus:border-[#0A99A5]
            disabled:opacity-50"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          disabled={loading || isSubmitting}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg
            hover:bg-gray-50 transition font-medium disabled:opacity-50"
        >
          Cancelar
        </button>

        <Button
          mode="create"
          entity="registro"
          type="submit"
          loading={loading || isSubmitting}
        />
      </div>
    </form>
  );
}
