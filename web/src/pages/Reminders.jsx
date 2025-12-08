import React, { useState, useEffect } from "react";
import { Bell, CalendarDays, Plus } from "lucide-react";
import CalendarModal from "../components/CalendarModal";
import AddReminderModal from "../components/AddReminderModal";
import RemindersList from "../components/reminders/RemindersList";
import { useReminders } from "../hooks/useReminders";
import { usePets } from "../hooks/usePets";

const Reminders = () => {
  const { getReminders, createReminder, deleteReminder, updateReminder } =
    useReminders();
  const { pets, loading: petsLoading } = usePets();

  const [activeTab, setActiveTab] = useState("upcoming");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReminders = async () => {
      try {
        const data = await getReminders();
        setReminders(data);
      } catch (error) {
        console.error("Error cargando recordatorios", error);
      } finally {
        setLoading(false);
      }
    };

    loadReminders();
  }, []);

  const handleAddReminder = async (data) => {
    try {
      const newReminder = await createReminder({
        pet_id: data.pet_id,
        title: data.title,
        type: data.type,
        date: data.date,
        is_completed: false,
        is_urgent: data.is_urgent || false,
        times: data.times || null,
        is_routine: data.is_routine || false,
      });

      setReminders((prev) => [newReminder, ...prev]);
    } catch (error) {
      console.error("Error creando recordatorio:", error);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await deleteReminder(id);
      setReminders((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error("Error eliminando recordatorio:", error);
    }
  };

  const handleToggleCompleted = async (id, currentStatus) => {
    try {
      const updated = await updateReminder(id, {
        is_completed: !currentStatus,
      });
      setReminders((prev) => prev.map((r) => (r.id === id ? updated : r)));
    } catch (error) {
      console.error("Error actualizando estado:", error);
    }
  };

  const sortedReminders = reminders.sort((a, b) => {
    if (a.is_routine && !b.is_routine) return -1;
    if (!a.is_routine && b.is_routine) return 1;
    if (!a.is_routine && !b.is_routine)
      return new Date(a.date) - new Date(b.date);
    return 0;
  });

  const filteredReminders = sortedReminders.filter((reminder) => {
    if (activeTab === "upcoming") return !reminder.is_completed;
    if (activeTab === "urgent")
      return reminder.is_urgent && !reminder.is_completed;
    if (activeTab === "completed") return reminder.is_completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl text-white p-6 pt-8 shadow-lg relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              Recordatorios
            </h1>
            <p className="text-orange-100 text-base lg:text-lg">
              Próximas citas y eventos
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl shadow-sm">
            <Bell className="text-white text-xl" />
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="px-4 mt-6 relative z-20">
        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-md p-1.5 flex mb-6">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
              activeTab === "upcoming"
                ? "bg-orange-50 text-orange-500 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Próximos
          </button>

          <button
            onClick={() => setActiveTab("urgent")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
              activeTab === "urgent"
                ? "bg-orange-50 text-orange-500 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Urgentes
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
              activeTab === "completed"
                ? "bg-orange-50 text-orange-500 shadow-sm"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            Completados
          </button>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowAddModal(true)}
          className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2 mb-6 hover:opacity-95 transition-opacity"
        >
          <Plus className="text-lg" />
          <span>Agregar recordatorio</span>
        </button>

        {/* Reminders List */}
        <RemindersList
          reminders={filteredReminders}
          onDelete={handleDeleteReminder}
          onToggleCompleted={handleToggleCompleted}
          loading={loading}
        />

        {/* Calendar Section */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-[#E17100] mb-3">
            <CalendarDays className="text-xl" />
          </div>
          <h3 className="font-bold text-gray-800 text-lg mb-1">
            Vista calendario
          </h3>
          <p className="text-sm text-gray-400 mb-4 max-w-xs">
            Visualiza todos tus recordatorios en un calendario mensual
          </p>
          <button
            onClick={() => setShowCalendar(true)}
            className="px-6 py-2.5 rounded-xl border border-[#E17100] text-[#E17100] font-bold hover:bg-orange-50 transition-colors text-sm"
          >
            Abrir calendario
          </button>
        </div>
      </div>

      {/* Modals */}
      <CalendarModal
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
        reminders={reminders}
      />

      <AddReminderModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddReminder}
        pets={pets}
        petsLoading={petsLoading}
      />
    </div>
  );
};

export default Reminders;
