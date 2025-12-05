import { useState } from "react";
import {
  FaHome,
  FaHeart,
  FaHeartbeat,
  FaBell,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { PiDogFill } from "react-icons/pi";
import { FaCarrot } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();


  // Función para determinar si un ítem está activo
  const isActive = (path) => {
    // Para la ruta de pets/:id
    if (path === "/pets" && location.pathname.startsWith("/pets/")) {
      return true;
    }
    return location.pathname === path;
  };

  // Función para obtener el nombre activo para mostrar
  const getActiveName = () => {
    // Mapeo de rutas a nombres
    const routeToName = {
      "/dashboard": "Dashboard",
      "/pets": "Mis mascotas",
      "/health": "Salud",
      "/nutrition": "Nutrition",
      "/reminders": "Recordatorios",
      "/configuration": "Configuración",
    };

    // Para rutas como /pets/:id
    if (location.pathname.startsWith("/pets/")) {
      return "Mis mascotas";
    }

    return routeToName[location.pathname] || "";
  };

  const navItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Mis mascotas", icon: <PiDogFill />, path: "/pets" },
    { name: "Salud", icon: <FaHeartbeat />, path: "/health" },
    { name: "Nutrition", icon: <FaCarrot />, path: "/nutrition" },
    { name: "Recordatorios", icon: <FaBell />, path: "/reminders" },
    { name: "Configuración", icon: <FaUser />, path: "/configuration" },
  ];

  const Logo = () => (
    <div className="flex items-center gap-3">
      <div className="bg-gradient-to-r from-[#00BFA5] to-[#00C8FF] w-10 h-10 rounded-2xl flex items-center justify-center shadow-md shadow-[#00BFA5]/30">
        <FaHeart className="text-white text-lg" />
      </div>
      <h1 className="text-[#0A99A5] text-xl font-poppins font-bold">
        Pet Health
      </h1>
    </div>
  );

  return (
    <>
      {/* Fondo del header movil */}
      <div className="md:hidden fixed top-0 left-0 w-full h-20 bg-white z-40 shadow-sm"></div>

      {/* logo en movil (visible cuando el menu esta cerrado) */}
      <div
        className={`md:hidden fixed top-4 left-4 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <Logo />
      </div>

      {/* Boton de menu */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md text-teal-600 transition-colors"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <FaBars
            size={24}
            className={`absolute transition-all duration-300 transform ${
              isOpen
                ? "opacity-0 rotate-180 scale-75"
                : "opacity-100 rotate-0 scale-100"
            }`}
          />
          <FaTimes
            size={24}
            className={`absolute transition-all duration-300 transform ${
              isOpen
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-180 scale-75"
            }`}
          />
        </div>
      </button>

      {/* Overlay para movil */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Contenedor del menu */}
      <div
        className={`
          fixed top-0 left-0 h-screen z-50
          w-64 bg-white border-r border-gray-100 flex flex-col p-4 shadow-sm
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Logo dentro del menu */}
        <div className="mb-8 px-2 border-b-2 pb-6 border-gray-100">
          <Logo />
        </div>

        {/* Navegacion */}
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)} // Cierra el menú en móvil al hacer clic
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  active
                    ? "bg-cyan-50 text-teal-500 font-medium shadow-sm"
                    : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                }`}
              >
                <span
                  className={`text-lg ${
                    active
                      ? "text-teal-500"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Seccion de cierre de sesion */}
        <div className="mt-4 pt-4 border-t-2 border-gray-100">
          <button
          onClick={() => {logout();
            navigate("/login")
          }}
           className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200">
            <FaSignOutAlt className="text-lg" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SideBar;