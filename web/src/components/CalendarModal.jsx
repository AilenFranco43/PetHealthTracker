import React from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalendarModal = ({ isOpen, onClose, reminders }) => {
    if (!isOpen) return null;

    // Hardcoded for November 2025 as per mock data context
    const daysInMonth = 30;
    const firstDayOfMonth = 6; // Saturday (0=Sun, 1=Mon, ..., 6=Sat)

    // Generate calendar grid
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
        days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        days.push(i);
    }

    // Helper to check if a day has reminders
    const getRemindersForDay = (day) => {
        if (!day) return [];
        return reminders.filter(r => {
            // Assuming date format "15 de noviembre, 2025"
            const dayStr = r.date.split(' ')[0];
            return parseInt(dayStr) === day;
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
                {/* Header */}
                <div className="bg-[#E17100] p-6 text-white flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold">Noviembre 2025</h2>
                        <p className="text-orange-100 text-sm">4 eventos programados</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                        <FaTimes className="text-xl" />
                    </button>
                </div>

                {/* Calendar Grid */}
                <div className="p-6">
                    {/* Weekdays */}
                    <div className="grid grid-cols-7 mb-4 text-center">
                        {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                            <div key={index} className="text-gray-400 font-bold text-sm">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Days */}
                    <div className="grid grid-cols-7 gap-2">
                        {days.map((day, index) => {
                            const dayReminders = getRemindersForDay(day);
                            const hasReminders = dayReminders.length > 0;
                            const isToday = day === 25; // Mocking "today" as the 25th for context

                            return (
                                <div key={index} className="aspect-square flex items-center justify-center relative">
                                    {day && (
                                        <button
                                            className={`
                                                w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all
                                                ${hasReminders
                                                    ? 'bg-[#E17100] text-white shadow-md shadow-orange-200'
                                                    : isToday
                                                        ? 'bg-gray-100 text-[#E17100] font-bold border border-orange-200'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                }
                                            `}
                                        >
                                            {day}
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend/List for selected day could go here, but for now just the visual calendar */}
                    <div className="mt-6 pt-6 border-t border-gray-100">
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl border-2 border-[#E17100] text-[#E17100] font-bold hover:bg-orange-50 transition-colors"
                        >
                            Cerrar calendario
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarModal;
