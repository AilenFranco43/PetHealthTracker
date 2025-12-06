import { useState, useEffect } from "react";

const PetForm = ({
  pet,
  onSave,
  onCancel,
  mode = "create",
  loading = false,
}) => {
  const [form, setForm] = useState({
    name: "",
    specie: "",
    breed: "",
    age: "",
    weight: "",
    photo_url: "", // preview o URL existente
    file: null, // archivo real
  });

  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (pet) {
      setForm({
        name: pet.name || "",
        specie: pet.specie || "",
        breed: pet.breed || "",
        age: pet.age || "",
        weight: pet.weight ? pet.weight.toString() : "",
        photo_url: pet.photo_url || "",
        file: null,
      });
      setHasChanges(false);
    }
  }, [pet]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // Manejo del archivo
    if (name === "photo_url") {
      const file = files[0];
      if (file) {
        setForm({
          ...form,
          file,
          photo_url: URL.createObjectURL(file),
        });
        setHasChanges(true);
      }
      return;
    }

    setForm({
      ...form,
      [name]: value,
    });
    setHasChanges(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("specie", form.specie);

    // Enviar siempre, aunque estén vacíos (para que el backend los reciba)
    formData.append("breed", form.breed || "");
    formData.append("age", form.age || "");

    // Convertir weight a número
    if (form.weight) {
      formData.append("weight", parseFloat(form.weight));
    } else {
      formData.append("weight", "");
    }

    if (form.file instanceof File) {
      formData.append("photo_url", form.file);
    }

    onSave(formData, mode);
  };

  const removePhoto = () => {
    setForm({
      ...form,
      photo_url: "",
      file: null,
    });
    setHasChanges(true);
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
          className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-gray-300 hover:border-teal-400 transition-colors relative"
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
          name="photo_url"
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
        <div className="flex flex-col">
          <label className="font-medium mb-1">Nombre *</label>
          <input
            name="name"
            placeholder="Ej: Luna"
            className="border p-3 rounded-lg"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Especie *</label>
          <input
            type="text"
            name="specie"
            className="border p-3 rounded-lg"
            value={form.specie}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Raza</label>
          <input
            name="breed"
            className="border p-3 rounded-lg"
            value={form.breed}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Edad</label>
          <input
            name="age"
            className="border p-3 rounded-lg"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium mb-1">Peso (kg)</label>
          <input
            type="number"
            name="weight"
            className="border p-3 rounded-lg"
            value={form.weight}
            onChange={handleChange}
            min="0"
            step="0.1"
          />
        </div>
      </div>

      {/* BOTONES */}
      <div className="flex justify-between gap-3 mt-6 pt-4 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          disabled={loading}
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="flex-1 px-4 py-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading || (mode === "edit" && !hasChanges)}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {mode === "create" ? "Creando..." : "Guardando..."}
            </span>
          ) : mode === "create" ? (
            "Agregar mascota"
          ) : (
            "Guardar cambios"
          )}
        </button>
      </div>
    </form>
  );
};

export default PetForm;
