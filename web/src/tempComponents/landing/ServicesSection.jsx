
import React from 'react'
import { FaClipboardList, FaBell, FaShieldAlt, FaCalendarAlt } from "react-icons/fa";
import ServiceCard from '../ServicesSection/ServiceCard';


const ServicesSection = () => {
  const features = [
    {
      title: "Historial Médico",
      description: "Mantén todos los registros veterinarios, vacunas e historial médico en un solo lugar.",
      icon: FaClipboardList,
      color: "from-pink-500 to-purple-500 ",
    },
    {
      title: "Recordatorios Inteligentes",
      description: "Nunca pierdas una cita, vacuna o hora de alimentación con alertas inteligentes.",
      icon: FaCalendarAlt,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Notificaciones en Tiempo Real",
      description: "Recibe actualizaciones instantáneas sobre eventos de salud próximos e hitos importantes.",
      icon: FaBell,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Seguro y Privado",
      description: "Los datos de tu mascota están encriptados y almacenados de forma segura con protección empresarial.",
      icon: FaShieldAlt,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Todo lo que tu Mascota Necesita
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Herramientas completas para el cuidado y la salud de tu mascota.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <ServiceCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesSection
