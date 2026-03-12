import { useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../common/Button";
import { useWeightRecords } from "../../hooks/useWeightRecords";

export default function WeightRecordForm({ pet, onClose, onSaved }) {
  const { addWeight, loading } = useWeightRecords();

  const [form, setForm] = useState({
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pet?.id) {
      toast.error("No se pudo identificar la mascota");
      return;
    }

    if (!form.weight) {
      toast.error("El peso es obligatorio");
      return;
    }

    const payload = {
      weight: parseFloat(form.weight),
    };

    try {
      await addWeight(pet.id, payload);

      if (onSaved) {
        await onSaved(pet.id);
      }

      toast.success("Registro de peso guardado");

      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Registrar peso</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Peso <span className="text-red-500">*</span>
        </label>

        <input
          type="number"
          name="weight"
          step="0.1"
          placeholder="Peso (kg)"
          value={form.weight}
          onChange={handleChange}
          disabled={loading}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg
          focus:ring-2 focus:ring-[#0A99A5] focus:border-[#0A99A5]
          disabled:opacity-50"
        />
      </div>

      <Button mode="create" entity="registro" type="submit" loading={loading} />
    </form>
  );
}