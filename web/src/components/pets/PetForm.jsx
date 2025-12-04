// components/pets/PetForm.jsx
import { useState, useEffect } from "react";

const PetForm = ({ pet, onSave, onCancel, mode = "create" }) => {
  // Inicializar el estado
  const [form, setForm] = useState({
    name: "",
    specie: "",
    breed: "",
    age: "",
    weight: "",
    photo: null,
    photo_url: "",
  });

  // Efecto para cargar datos cuando el pet cambia
  useEffect(() => {
    if (pet) {
      setForm({
        name: pet.name || "",
        specie: pet.specie || "",
        breed: pet.breed || "",
        age: pet.age || "",
        weight: pet.weight ? pet.weight.toString() : "",
        photo: null,
        photo_url: pet.image || pet.photo_url || "", // Usar image o photo_url
      });
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      if (file) {
        setForm({
          ...form,
          photo: file,
          photo_url: URL.createObjectURL(file),
        });
      }
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  const removePhoto = () => {
    setForm({
      ...form,
      photo: null,
      photo_url: "",
    });
  };

  return (
    <form
      className="flex flex-col gap-4 w-full max-h-[60vh] overflow-y-auto p-4 sm:p-6"
      onSubmit={handleSubmit}
    >
      {/* FOTO */}
      <div className="flex flex-col items-center gap-2">
        <label className="font-medium text-center">
          {mode === "create" ? "Foto de la mascota" : "Cambiar foto"}
        </label>

        <label
          htmlFor="photo-upload"
          className="
            w-24 h-24 sm:w-28 sm:h-28 
            rounded-full bg-gray-100 flex items-center justify-center 
            overflow-hidden cursor-pointer border-2 border-dashed border-gray-300
            hover:border-teal-400 transition-colors relative
          "
        >
          {form.photo_url ? (
            <>
              <img
                src={form.photo_url}
                alt="preview"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white text-xs font-medium opacity-0 hover:opacity-100">
                  Cambiar
                </span>
              </div>
            </>
          ) : (
            <div className="text-center p-2">
              <div className="text-3xl text-gray-400 mb-1">+</div>
              <span className="text-gray-500 text-xs">
                {mode === "create" ? "Agregar foto" : "Cambiar foto"}
              </span>
            </div>
          )}
        </label>

        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          name="photo"
          className="hidden"
          onChange={handleChange}
        />
        
        {form.photo_url && (
          <button
            type="button"
            onClick={removePhoto}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Remover foto
          </button>
        )}
      </div>

      {/* CAMPOS */}
      <div className="space-y-4">
        {/* NOMBRE */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            placeholder="Ej: Luna"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        {/* ESPECIE */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">
            Especie <span className="text-red-500">*</span>
          </label>
          <input
          type="text"
            name="specie"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={form.specie}
            onChange={handleChange}
            required
          >
          </input>
        </div>

        {/* RAZA */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Raza</label>
          <input
            name="breed"
            placeholder="Ej: Golden Retriever"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={form.breed}
            onChange={handleChange}
          />
        </div>

        {/* EDAD */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Edad</label>
          <input
            name="age"
            placeholder="Ej: 2 años, 6 meses"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        {/* PESO */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Peso (kg)</label>
          <input
            type="number"
            name="weight"
            className="border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            value={form.weight}
            onChange={handleChange}
            min="0"
            step="0.1"
            placeholder="Ej: 5.2"
          />
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex justify-between gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium"
        >
          {mode === "create" ? "Agregar mascota" : "Guardar cambios"}
        </button>
      </div>
    </form>
  );
};

export default PetForm;