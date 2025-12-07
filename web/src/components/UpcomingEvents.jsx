import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const UpcomingEvents = ({events}) => {

   const getCategoryStyles = (category) => {
    switch (category) {
      case "VACUNA":
        return "bg-amber-100 text-amber-500";
      case "ALIMENTACION":
      case "TRATAMIENTO":
        return "bg-blue-100 text-blue-500";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  if (!events || events.length === 0) return <p>No hay próximos eventos</p>;

    return (
         <div className="w-full p-4">
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative bg-white rounded-2xl shadow-md p-4 flex items-center gap-4 transition-transform hover:scale-[1.02]"
          >
            <div
              className={`p-3 rounded-xl flex items-center justify-center ${getCategoryStyles(event.type)}`}
            >
              <FaCalendarAlt size={20} />
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {event.pet?.name} • {event.type}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>

            {event.is_urgent && (
              <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                Urgente
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default UpcomingEvents;