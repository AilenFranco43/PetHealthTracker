import React from 'react';

const CalendarModal = ({ reminders }) => {

    const daysInMonth = 30;
    const firstDayOfMonth = 6;

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const getRemindersForDay = (day) => {
        if (!day) return [];
        return reminders.filter(r => {
            const dayStr = r.date.split(' ')[0];
            return parseInt(dayStr) === day;
        });
    };

    return (
        <div className="w-full bg-white rounded-2xl shadow-lg border p-2 mt-4 max-w-sm mx-auto">

            <div className="bg-[#E17100] p-2 text-white rounded-xl mb-2 leading-3">
                <h2 className="text-xl font-bold ">Noviembre 2025</h2>
                <p className="text-orange-100 text-sm ">
                    {reminders.length} eventos programados
                </p>
            </div>

            <div className="grid grid-cols-7 mb-1 text-center">
                {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                    <div key={index} className="text-gray-400 font-bold text-sm">
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-[3px]">
                {days.map((day, index) => {
                    const dayReminders = getRemindersForDay(day);
                    const hasReminders = dayReminders.length > 0;
                    const isToday = day === 25;

                    return (
                        <div key={index} className="relative group aspect-square flex items-center justify-center">
                            {day && (
                                <>
                                  
                                    <div
                                        className={`
                                            w-5 h-5 rounded-full flex items-center justify-center
                                            text-sm font-medium transition-all cursor-pointer
                                            ${hasReminders
                                                ? 'bg-[#E17100] text-white shadow shadow-orange-200'
                                                : isToday
                                                    ? 'bg-gray-100 text-[#E17100] font-bold border border-orange-200'
                                                    : 'text-gray-700 hover:bg-gray-200'
                                            }
                                        `}
                                    >
                                        {day}
                                    </div>

                                   
                                    {hasReminders && (
                                        <div className="
                                            hidden group-hover:block
                                            absolute top-[28px] left-1/2 -translate-x-1/2
                                            bg-white text-gray-700 text-[10px]
                                            p-2 rounded-lg shadow-lg border w-28 z-20
                                        ">
                                            {dayReminders.map((r, i) => (
                                                <p key={i} className="leading-tight">
                                                     {r.title}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default CalendarModal;
