import React, { useState } from 'react';
import { FaBell, FaCalendarAlt, FaClock, FaPlus } from 'react-icons/fa';
import CalendarModal from '../components/CalendarModal';
import AddReminderModal from '../components/AddReminderModal';

const Reminders = () => {

    const [activeTab, setActiveTab] = useState('upcoming');
    const [showAddModal, setShowAddModal] = useState(false);

    const [reminders, setReminders] = useState([
        {
            id: 1,
            title: 'Vacuna antirrábica',
            pet: 'Luna',
            date: '15 de noviembre, 2025',
            time: '10:00',
            type: 'Vacuna',
            urgent: true,
            iconColor: 'bg-purple-100 text-purple-500',
        },
        {
            id: 2,
            title: 'Chequeo anual',
            pet: 'Milo',
            date: '20 de noviembre, 2025',
            time: '15:30',
            type: 'Cita',
            urgent: false,
            iconColor: 'bg-blue-100 text-blue-500',
        },
        {
            id: 3,
            title: 'Desparasitación',
            pet: 'Rocky',
            date: '22 de noviembre, 2025',
            time: '09:00',
            type: 'Medicamento',
            urgent: false,
            iconColor: 'bg-green-100 text-green-500',
        },
        {
            id: 4,
            title: 'Corte de pelo',
            pet: 'Max',
            date: '25 de noviembre, 2025',
            time: '11:00',
            type: 'Higiene',
            urgent: false,
            iconColor: 'bg-amber-100 text-amber-500',
        },
    ]);

    const handleAddReminder = (data) => {
        const iconColors = {
            'Vacuna': 'bg-purple-100 text-purple-500',
            'Cita': 'bg-blue-100 text-blue-500',
            'Medicamento': 'bg-green-100 text-green-500',
            'Higiene': 'bg-amber-100 text-amber-500',
        };

        const newReminder = {
            id: reminders.length + 1,
            title: data.title,
            pet: data.pet,
            date: new Date(data.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
            time: data.time,
            type: data.type,
            urgent: data.urgent,
            iconColor: iconColors[data.type] || 'bg-gray-100 text-gray-500',
        };

        setReminders([newReminder, ...reminders]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
            
            {/* HEADER */}
            <header className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl text-white p-6 pt-8 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Recordatorios</h1>
                        <p className="text-orange-100 text-base lg:text-lg">
                            Próximas citas y eventos
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                        <FaBell className="text-white text-xl" />
                    </div>
                </div>
            </header>

            {/* TABS */}
            <div className="px-4 mt-6">
                <div className="bg-white rounded-2xl shadow-md p-1.5 flex mb-6">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                            activeTab === 'upcoming'
                                ? 'bg-orange-50 text-orange-500 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        Próximos ({reminders.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
                            activeTab === 'completed'
                                ? 'bg-orange-50 text-orange-500 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        Completados (2)
                    </button>
                </div>

                {/* Botón agregar */}
                <button
                    onClick={() => setShowAddModal(true)}
                    className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 mb-6 hover:opacity-95"
                >
                    <FaPlus className="text-lg" />
                    <span>Agregar recordatorio</span>
                </button>

                {/* Listado */}
                <div className="space-y-4">
                    {reminders.map((r) => (
                        <div key={r.id} className="bg-white rounded-2xl p-4 shadow-sm border flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${r.iconColor}`}>
                                <FaBell className="text-lg" />
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-gray-800 truncate">{r.title}</h3>
                                    {r.urgent && (
                                        <span className="bg-amber-100 text-amber-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
                                            URGENTE
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-500 mb-1">
                                    {r.pet} • {r.type}
                                </p>

                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <div className="flex items-center gap-1">
                                        <FaCalendarAlt />
                                        <span>{r.date}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaClock />
                                        <span>{r.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CALENDARIO INTEGRADO DIRECTO */}
                <CalendarModal reminders={reminders} />

            </div>

            <AddReminderModal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onAdd={handleAddReminder}
            />

        </div>
    );
};

export default Reminders;
