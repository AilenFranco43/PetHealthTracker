import React, { useEffect, useState } from "react";
import { FaHeart, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

import PetList from "../components/pets/PetList";
import { usePets } from "../hooks/usePets";
import UpcomingEvents from "../components/UpcomingEvents";
import QuickActions from "../components/QuickActions";
import { useAuth } from "../hooks/useAuth";
import SkeletonPetCard from "../components/pets/SkeletonPetCard";
import { useReminders } from "../hooks/useReminders";
import UpcomingEventsSkeleton from "../components/UpcomingEventsSkeleton";

const Dashboard = () => {
  const { user } = useAuth();
  const { pets, getPets, loading } = usePets();
  const { getReminders } = useReminders();
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    getPets();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const allReminders = await getReminders();

        const upcoming = allReminders
          .filter((r) => !r.is_completed && r.date)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);

        setUpcomingEvents(upcoming);
      } catch (error) {
        console.error("Error cargando próximos eventos", error);
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-50">
      <div className="flex-1 p-4">
        {/* Header Gradient */}
        <div className="relative p-6 md:p-8 w-full max-w-full min-h-[280px] md:h-[300px] rounded-3xl bg-gradient-to-r from-[#00BA7D] to-[#00BFA5] shadow-xl">
          <button className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30">
            <FaHeart className="h-5 w-5" />
          </button>

          <div className="mb-6">
            <p className="font-poppins text-base text-white">
              Hola, {user?.username || "Usuario"} 👋
            </p>
            <h1 className="font-poppins text-3xl md:text-4xl font-bold text-white">
              Dashboard
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#33BC9C] p-6 shadow-lg">
              <FaHeart className="h-6 w-6 mb-4 text-white" />
              <div className="font-poppins text-3xl font-bold text-white">
                2/2
              </div>
              <div className="font-poppins text-sm text-white/80">
                Vacunas al día
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#33BC9C] p-6 shadow-lg">
              <FaCalendarAlt className="h-6 w-6 mb-4 text-white" />
              <div className="font-poppins text-3xl font-bold text-white">
                3
              </div>
              <div className="font-poppins text-sm text-white/80">
                Próximas citas
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl bg-[#33BC9C] p-6 shadow-lg">
              <FaExclamationTriangle className="h-6 w-6 mb-4 text-white" />
              <div className="font-poppins text-3xl font-bold text-white">
                1
              </div>
              <div className="font-poppins text-sm text-white/80">
                Alertas activas
              </div>
            </div>
          </div>
        </div>

        {/* Sección inferior */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
          {/* --- MIS MASCOTAS --- */}
          <div className="col-span-1 w-full p-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Mis Mascotas
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lista de mascotas */}
              {loading ? (
                <>
                  <SkeletonPetCard />
                  <SkeletonPetCard />
                </>
              ) : (
                <PetList pets={pets} />
              )}

              {/* Botón para ir a /pets */}
              <Link
                to="/pets"
                className="w-full border-2 border-dashed border-teal-500 rounded-2xl bg-teal-50 flex flex-col items-center justify-center min-h-[200px] cursor-pointer transition-transform hover:scale-105 p-4"
              >
                <div className="w-14 h-14 lg:w-16 lg:h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                  <Plus className="w-7 h-7 lg:w-8 text-emerald-600" />
                </div>
                <span className="text-teal-700 font-medium">
                  Agregar mascota
                </span>
              </Link>
            </div>
          </div>

          {/* Próximos eventos */}
          <div className="col-span-1 p-5">
            <h3 className="pl-4 text-xl font-medium">Próximos eventos</h3>
            {loadingEvents ? (
              <UpcomingEventsSkeleton />
            ) : (
              <UpcomingEvents events={upcomingEvents} />
            )}
          </div>

          {/* Acciones rápidas */}
          <div className="col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
