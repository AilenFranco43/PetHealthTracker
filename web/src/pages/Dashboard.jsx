import React from "react";
import { FaHeart, FaCalendarAlt, FaExclamationTriangle } from "react-icons/fa";
import SideBar from "../components/SideBar";
import MyPetsDashboard from "../components/MyPetsDashboard";
import UpcomingEvents from "../components/UpcomingEvents";
import QuickActions from "../components/QuickActions";
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
   const { user } = useAuth();

  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-gray-50">

      {/* Contenido */}
      <div className="flex-1 p-4">
        {/* Header Gradient */}
        <div className="relative p-6 md:p-8 w-full max-w-full min-h-[280px] md:h-[300px] rounded-3xl bg-gradient-to-r from-[#00BA7D] to-[#00BFA5] shadow-xl">
          {/* Botón */}
          <button className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30">
            <FaHeart className="h-5 w-5" />
          </button>

          {/* Título */}
          <div className="mb-6">
            <p className="font-poppins text-base text-white">
              Hola, {user?.username || "Usuario"}👋
            </p>
            <h1 className="font-poppins text-3xl md:text-4xl font-bold text-white">
              Dashboard
            </h1>
          </div>

          {/* Cards */}
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
          <div className="col-span-1">
            <MyPetsDashboard />
          </div>

          <div className="col-span-1">
            <UpcomingEvents />
          </div>

          <div className="col-span-1">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
