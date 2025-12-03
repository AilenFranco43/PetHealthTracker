import React from 'react';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';

const AddReminderModal = ({ isOpen, onClose, onAdd }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    if (!isOpen) return null;

    const onSubmit = (data) => {
        onAdd(data);
        reset();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-[#E17100] p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Nuevo Recordatorio</h2>
                        <p className="text-orange-100 text-sm">Agrega un evento para tu mascota</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">

                    {/* Título */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
                        <input
                            {...register("title", { required: "El título es obligatorio" })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            placeholder="Ej. Vacuna antirrábica"
                        />
                        {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
                    </div>

                    {/* Mascota */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mascota</label>
                        <input
                            {...register("pet", { required: "El nombre de la mascota es obligatorio" })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            placeholder="Ej. Luna"
                        />
                        {errors.pet && <p className="text-red-500 text-xs mt-1">{errors.pet.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Fecha */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha</label>
                            <input
                                type="date"
                                {...register("date", { required: "La fecha es obligatoria" })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            />
                            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date.message}</p>}
                        </div>

                        {/* Hora */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Hora</label>
                            <input
                                type="time"
                                {...register("time", { required: "La hora es obligatoria" })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                            />
                            {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time.message}</p>}
                        </div>
                    </div>

                    {/* Tipo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de evento</label>
                        <select
                            {...register("type", { required: "Selecciona un tipo" })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-[#E17100] focus:ring-2 focus:ring-orange-200 outline-none transition-all bg-white"
                        >
                            <option value="Vacuna">Vacuna</option>
                            <option value="Cita">Cita</option>
                            <option value="Medicamento">Medicamento</option>
                            <option value="Higiene">Higiene</option>
                        </select>
                    </div>

                    {/* Urgente */}
                    <div className="flex items-center gap-2 pt-2">
                        <input
                            type="checkbox"
                            id="urgent"
                            {...register("urgent")}
                            className="w-5 h-5 rounded border-gray-300 text-[#E17100] focus:ring-[#E17100]"
                        />
                        <label htmlFor="urgent" className="text-sm font-medium text-gray-700">Marcar como urgente</label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full mt-4 bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/30 hover:opacity-95 transition-opacity"
                    >
                        Guardar Recordatorio
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddReminderModal;
