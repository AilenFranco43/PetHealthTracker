import React from "react";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";

const AddReminderModal = ({ isOpen, onClose, onAdd, pets = [], petsLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      timesInputs: ["08:00"],
      is_routine: false,
      urgent: false,
    },
  });

  const watchIsRoutine = watch("is_routine", false);
  const watchTimes = watch("timesInputs", ["08:00"]);

  if (!isOpen) return null;

  const onSubmit = (data) => {
    if (!data.pet_id) return; // seguridad extra
    const reminderData = {
      pet_id: data.pet_id,
      title: data.title,
      type: data.type,
      is_completed: false,
      is_urgent: data.urgent,
      is_routine: data.is_routine,
      times: data.is_routine ? data.timesInputs : [],
      date: data.is_routine
        ? null
        : new Date(`${data.date}T${data.time}:00`).toISOString(),
    };

    onAdd(reminderData);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-auto">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#E17100] p-6 text-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Nuevo Recordatorio</h2>
            <p className="text-orange-100 text-sm">
              Completa los datos para tu mascota
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Mascota */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Mascota
            </label>
            <select
              {...register("pet_id", { required: "Selecciona una mascota" })}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] outline-none"
              defaultValue=""
            >
              <option value="" disabled>
                {petsLoading ? "Cargando mascotas..." : "Seleccionar mascota"}
              </option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
            {errors.pet_id && (
              <p className="text-red-500 text-xs mt-1">{errors.pet_id.message}</p>
            )}
          </div>

          {/* Título */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              {...register("title", { required: "El título es obligatorio" })}
              placeholder="Ej: Vacuna antirrábica"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] outline-none"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
            )}
          </div>

          {/* Tipo de evento */}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Tipo de evento</label>
            <select
              {...register("type", { required: "Selecciona un tipo" })}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] outline-none"
            >
              <option value="">Seleccionar tipo</option>
              <option value="VACUNA">Vacuna</option>
              <option value="ALIMENTACION">Alimentación</option>
              <option value="VISITA">Visita al veterinario</option>
              <option value="TRATAMIENTO">Tratamiento</option>
              <option value="OTRO">Otro</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-xs mt-1">{errors.type.message}</p>
            )}
          </div>

          {/* Rutina */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_routine"
              {...register("is_routine")}
              className="w-5 h-5 rounded border-gray-300 text-[#E17100]"
            />
            <label htmlFor="is_routine" className="text-sm font-medium text-gray-700">
              Es rutina diaria
            </label>
          </div>

          {/* Campos según tipo */}
          {!watchIsRoutine ? (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha</label>
                <input
                  type="date"
                  {...register("date", { required: !watchIsRoutine && "La fecha es obligatoria" })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] outline-none"
                />
                {errors.date && (
                  <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Hora</label>
                <input
                  type="time"
                  {...register("time", { required: !watchIsRoutine && "La hora es obligatoria" })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] outline-none"
                />
                {errors.time && (
                  <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Horarios de rutina</label>
              {watchTimes.map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="time"
                    {...register(`timesInputs.${index}`, { required: true })}
                    className="px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] outline-none flex-1"
                  />
                  {watchTimes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...watchTimes];
                        updated.splice(index, 1);
                        setValue("timesInputs", updated);
                      }}
                      className="text-red-500 font-bold px-2 py-1 rounded-xl border border-red-300"
                    >
                      ❌
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => setValue("timesInputs", [...watchTimes, "08:00"])}
                className="text-sm text-[#E17100] font-bold mt-1"
              >
                + Agregar horario
              </button>
            </div>
          )}

          {/* Urgente */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="urgent"
              {...register("urgent")}
              className="w-5 h-5 rounded border-gray-300 text-[#E17100]"
            />
            <label htmlFor="urgent" className="text-sm font-medium text-gray-700">
              Marcar como urgente
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-4 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg hover:opacity-95 transition-opacity"
          >
            Guardar Recordatorio
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReminderModal;
