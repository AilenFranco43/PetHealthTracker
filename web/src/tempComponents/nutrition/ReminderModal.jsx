import { useState } from 'react';
import { X } from 'lucide-react';

export default function ReminderModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    tipoComida: '',
    marca: '',
    porcionDiaria: '',
    porcionPeso: '',
    observaciones: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos del formulario:', formData);
    // Aquí puedes agregar la lógica para guardar el recordatorio
    onClose();
    // Resetear formulario
    setFormData({
      tipoComida: '',
      marca: '',
      porcionDiaria: '',
      porcionPeso: '',
      observaciones: '',
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Agregar recordatorio de comida
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tipo de comida */}
          <div>
            <label
              htmlFor="tipoComida"
              className="block text-sm mb-2 text-gray-700 font-medium"
            >
              Tipo de comida *
            </label>
            <select
              id="tipoComida"
              name="tipoComida"
              value={formData.tipoComida}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Seleccionar tipo</option>
              <option value="seca">Comida seca</option>
              <option value="humeda">Comida húmeda</option>
              <option value="casera">Comida casera</option>
              <option value="barf">BARF</option>
              <option value="mixta">Mixta</option>
            </select>
          </div>

          {/* Marca */}
          <div>
            <label
              htmlFor="marca"
              className="block text-sm mb-2 text-gray-700 font-medium"
            >
              Marca (opcional)
            </label>
            <input
              type="text"
              id="marca"
              name="marca"
              value={formData.marca}
              onChange={handleInputChange}
              placeholder="Ej: Royal Canin, Pedigree..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Porción diaria */}
          <div>
            <label
              htmlFor="porcionDiaria"
              className="block text-sm mb-2 text-gray-700 font-medium"
            >
              Porción diaria (cantidad de porciones) *
            </label>
            <input
              type="number"
              id="porcionDiaria"
              name="porcionDiaria"
              value={formData.porcionDiaria}
              onChange={handleInputChange}
              required
              min="1"
              placeholder="Ej: 2"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Porción en peso */}
          <div>
            <label
              htmlFor="porcionPeso"
              className="block text-sm mb-2 text-gray-700 font-medium"
            >
              Porción en peso (gramos por porción) *
            </label>
            <input
              type="number"
              id="porcionPeso"
              name="porcionPeso"
              value={formData.porcionPeso}
              onChange={handleInputChange}
              required
              min="1"
              placeholder="Ej: 150"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Observaciones */}
          <div>
            <label
              htmlFor="observaciones"
              className="block text-sm mb-2 text-gray-700 font-medium"
            >
              Observaciones
            </label>
            <textarea
              id="observaciones"
              name="observaciones"
              value={formData.observaciones}
              onChange={handleInputChange}
              rows={3}
              placeholder="Información adicional..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:shadow-lg transition-shadow font-medium"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}