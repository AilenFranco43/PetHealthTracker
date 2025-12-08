import BenefitItem from "./BenefitItem";
import { FaShieldAlt } from "react-icons/fa";


export default function BenefitsSection() {
  const benefits = [
    "Rastrea múltiples mascotas en una cuenta",
    "Accede a registros desde cualquier dispositivo",
    "Comparte información de salud con tu veterinario",
    "Exporta reportes e historial",
    "Planes de nutrición y alimentación",
    "Recordatorios de medicamentos",
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Imagen */}
        <div className="order-2 lg:order-1 flex justify-center">
          <img
            src="/public/img-beneficios.jpg"
            alt="Beneficios mascotas"
            className="rounded-3xl shadow-2xl h-[600px] max-w-[450px] object-cover"
          />
        </div>

        {/* Texto */}
        <div className="order-1 lg:order-2 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl text-gray-900 mb-6">
            Por qué nos Aman los Dueños de Mascotas
          </h2>

          <p className="text-lg text-gray-600 mb-8">
            Únete a miles de dueños de mascotas que confían en nosotros con la
            salud de sus miembros peludos de la familia.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {benefits.map((b, index) => (
              <BenefitItem key={index} text={b} />
            ))}
          </div>
          <div className="mt-8">
            <p className="text-lg font-medium text-slate-700 flex items-center gap-2">
              <FaShieldAlt className="text-teal-600 text-xl" />
              Más de <span className="font-bold">10.000 dueños</span> ya confían en Pet Health
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
