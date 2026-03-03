import React, { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarModal = ({ reminders }) => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("es-ES", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 domingo

  const remindersThisMonth = reminders.filter((r) => {
    const date = new Date(r.date);
    return date.getMonth() === month && date.getFullYear() === year;
  });

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < firstDayIndex; i++) arr.push(null);
    for (let i = 1; i <= daysInMonth; i++) arr.push(i);
    return arr;
  }, [daysInMonth, firstDayIndex]);

  const getRemindersForDay = (day) => {
    if (!day) return [];

    return reminders.filter((r) => {
      const date = new Date(r.date);

      return (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      );
    });
  };

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg border p-4 mt-4 max-w-md mx-auto">
      {/* HEADER*/}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 p-3 rounded-3xl mb-6 shadow-lg">
        {/* Mes y controles */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={previousMonth} className="p-2">
            <ChevronLeft className="text-white" />
          </button>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white capitalize drop-shadow-sm">
              {monthName} {year}
            </h2>
          </div>

          <button onClick={nextMonth} className="p-2">
            <ChevronRight className="text-white" />
          </button>
        </div>

        {/* Estadísticas */}
        <div className="w-full flex flex-row gap-3 justify-center ">
          <div className="bg-white/20 p-2 rounded-xl text-center backdrop-blur-sm shadow-sm w-full">
            <p className="text-xs text-orange-100 uppercase tracking-wide">
              Total
            </p>
            <p className="text-lg font-bold text-white">{reminders.length}</p>
          </div>

          <div className="bg-white/20 p-2 rounded-xl text-center backdrop-blur-sm shadow-sm w-full">
            <p className="text-xs text-orange-100 uppercase tracking-wide">
              Este mes
            </p>
            <p className="text-lg font-bold text-white">
              {remindersThisMonth.length}
            </p>
          </div>
        </div>
      </div>

      {/* DAYS OF WEEK */}
      <div className="grid grid-cols-7 mb-2 text-center">
        {["D", "L", "M", "M", "J", "V", "S"].map((d) => (
          <div key={d} className="text-gray-400 font-bold text-sm">
            {d}
          </div>
        ))}
      </div>

      {/* CALENDAR GRID */}
      <div className="grid grid-cols-7 gap-[6px]">
        {days.map((day, index) => {
          const dayReminders = getRemindersForDay(day);
          const hasEvent = dayReminders.length > 0;
          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={index}
              className="relative group aspect-square flex items-center justify-center"
            >
              {day && (
                <>
                  <div
                    className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      text-sm font-medium cursor-pointer transition-all
                      ${
                        hasEvent
                          ? "bg-orange-500 text-white shadow"
                          : isToday
                          ? "bg-gray-200 text-orange-500 font-bold"
                          : "text-gray-700 hover:bg-gray-100"
                      }
                    `}
                  >
                    {day}
                  </div>

                  {hasEvent && (
                    <div
                      className="
                      hidden group-hover:block absolute top-10 left-1/2 -translate-x-1/2
                      bg-white border shadow-lg rounded-lg p-2 text-xs w-32 z-30
                    "
                    >
                      {dayReminders.map((r, i) => (
                        <p key={i} className="leading-tight text-gray-700">
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
