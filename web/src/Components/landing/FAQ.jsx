import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ pregunta, respuesta, isOpen, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left flex justify-between items-center gap-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-inset"
      >
        <span className="font-semibold text-gray-800 text-lg">
          {pregunta}
        </span>
        <ChevronDown
          className={`flex-shrink-0 w-5 h-5 text-indigo-600 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="px-6 pb-5 pt-2 text-gray-600 leading-relaxed">
          {respuesta}
        </div>
      </div>
    </div>
  );
};

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      pregunta: "¿Cómo creo una cuenta?",
      respuesta: "Crear una cuenta es rápido y gratuito. Haz clic en 'Registrarse' en la parte superior, completa tus datos básicos como nombre, correo y contraseña, y verifica tu correo electrónico. Con tu cuenta podrás acceder a todas las funcionalidades de la plataforma y personalizar tu experiencia."
    },
    {
      pregunta: "¿Qué métodos de pago aceptan?",
      respuesta: "Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencias bancarias y PSE. Todos los pagos están protegidos con encriptación de nivel bancario. Puedes gestionar tus métodos de pago desde la sección de configuración de tu cuenta."
    },
    {
      pregunta: "¿Cómo cancelo mi suscripción?",
      respuesta: "Puedes cancelar tu suscripción en cualquier momento desde la sección 'Mi Cuenta' > 'Suscripción'. La cancelación será efectiva al final de tu período de facturación actual y mantendrás acceso hasta esa fecha. No hay penalizaciones por cancelar."
    },
    {
      pregunta: "¿Puedo cambiar mi plan?",
      respuesta: "Sí, puedes actualizar o cambiar tu plan en cualquier momento. Si actualizas a un plan superior, el cambio es inmediato y se prorratea el costo. Si cambias a un plan inferior, el cambio se aplicará al inicio del siguiente período de facturación."
    },
    {
      pregunta: "¿Mis datos están seguros?",
      respuesta: "La seguridad es nuestra prioridad. Utilizamos encriptación de extremo a extremo, autenticación de dos factores opcional, y cumplimos con estándares internacionales de protección de datos. Nunca compartimos tu información personal con terceros sin tu consentimiento."
    },
    {
      pregunta: "¿Ofrecen soporte técnico?",
      respuesta: "Sí, nuestro equipo de soporte está disponible de lunes a viernes de 8:00 AM a 8:00 PM. Puedes contactarnos a través del chat en vivo, correo electrónico o nuestro centro de ayuda. Los usuarios premium tienen acceso a soporte prioritario 24/7."
    },
    {
      pregunta: "¿Puedo usar la aplicación en múltiples dispositivos?",
      respuesta: "Sí, puedes acceder a tu cuenta desde cualquier dispositivo con conexión a internet. Tus datos se sincronizan automáticamente entre todos tus dispositivos. El número de dispositivos simultáneos depende de tu plan de suscripción."
    },
    {
      pregunta: "¿Hay una versión de prueba gratuita?",
      respuesta: "Sí, ofrecemos una prueba gratuita de 14 días sin necesidad de tarjeta de crédito. Tendrás acceso completo a todas las funcionalidades premium. Al finalizar la prueba, puedes elegir el plan que mejor se adapte a tus necesidades."
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            Preguntas Frecuentes
          </h1>
          <p className="text-gray-600">
            Encuentra respuestas rápidas a las dudas más comunes
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              pregunta={faq.pregunta}
              respuesta={faq.respuesta}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}