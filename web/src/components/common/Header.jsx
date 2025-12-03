import React from 'react';
import { Stethoscope } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 sm:p-8 rounded-3xl shadow-md mb-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Registros de Salud</h1>
            <p className="text-blue-100 text-base lg:text-lg">Historial médico completo</p>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
            <Stethoscope className="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;