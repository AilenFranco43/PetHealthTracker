import React from "react";

const InfoSection = () => {
  const stats = [
    { number: "10K+", label: "Usuarios Activos" },
    { number: "25K+", label: "Mascotas Registradas" },
    { number: "50K+", label: "Vacunas Registradas" },
    { number: "4.9", label: "Calificación Promedio" },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">

          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-sm sm:text-base text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default InfoSection;
    