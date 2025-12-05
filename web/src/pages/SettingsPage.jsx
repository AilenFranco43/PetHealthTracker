import React, { useState } from 'react';
import { User, Mail, Shield, Bell, Moon, HelpCircle, Info, LogOut, ArrowLeft, X } from 'lucide-react';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    reminders: true,
    push: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Usuario Demo',
    email: 'demo@pethealth.com',
    phone: ''
  });
  const [formData, setFormData] = useState({ ...profile });

  const toggleNotification = (type) => {
    setNotifications(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile(formData);
    setShowEditModal(false);
  };

  const handleCancelEdit = () => {
    setFormData(profile);
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-br from-gray-700 to-gray-900 text-white p-6 lg:p-8 rounded-3xl shadow-lg mb-6">
          <button className="flex items-center gap-2 text-white hover:bg-white/20 px-3 py-2 rounded-lg transition-colors mb-4 lg:hidden">
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">Configuración</h1>
              <p className="text-gray-300">Gestiona tu cuenta y preferencias</p>
            </div>
            <div className="w-14 h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
              <User className="w-7 h-7 lg:w-8 lg:h-8" />
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-gray-900 font-semibold mb-1">{profile.name}</h3>
                  <p className="text-sm text-gray-600">{profile.email}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowEditModal(true)}
                className="w-full py-2.5 rounded-xl border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 transition-colors font-medium"
              >
                Editar perfil
              </button>
            </div>

            {/* Account Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 px-2">Cuenta</h2>
              <div className="bg-white rounded-xl shadow-md divide-y divide-gray-100">
                <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium">Correo electrónico</p>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                  </div>
                </button>
                
                <button className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium">Cambiar contraseña</p>
                    <p className="text-sm text-gray-500">Actualiza tu contraseña</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Notifications Section */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 px-2">Notificaciones</h2>
              <div className="bg-white rounded-xl shadow-md divide-y divide-gray-100">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Recordatorios</p>
                      <p className="text-sm text-gray-500">Recibe alertas de eventos</p>
                    </div>
                  </div>
                  <Toggle 
                    checked={notifications.reminders} 
                    onChange={() => toggleNotification('reminders')} 
                  />
                </div>
                
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <Bell className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">Notificaciones push</p>
                      <p className="text-sm text-gray-500">Alertas en tiempo real</p>
                    </div>
                  </div>
                  <Toggle 
                    checked={notifications.push} 
                    onChange={() => toggleNotification('push')} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Preferences Section */}
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Preferencias</h2>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="p-5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                      <Moon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium lg:text-lg">Modo oscuro</p>
                      <p className="text-sm lg:text-base text-gray-500">Tema de la aplicación</p>
                    </div>
                  </div>
                  <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </div>
              </div>
            </div>

            {/* Help & Support Section */}
            <div>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-3">Ayuda y soporte</h2>
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow divide-y divide-gray-100">
                <button className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <HelpCircle className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Centro de ayuda</p>
                    <p className="text-sm lg:text-base text-gray-500">Preguntas frecuentes</p>
                  </div>
                </button>
                
                <button className="w-full p-5 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Info className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-gray-900 font-medium lg:text-lg">Acerca de</p>
                    <p className="text-sm lg:text-base text-gray-500">Versión 1.0.0</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Logout Button */}
            <button className="w-full py-4 rounded-xl border-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors font-medium flex items-center justify-center gap-2">
              <LogOut className="w-5 h-5" />
              Cerrar sesión
            </button>

            {/* Footer */}
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">Pet Health Tracker v1.0.0</p>
              <p className="text-xs text-gray-400 mt-1">© 2025 Todos los derechos reservados</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Editar Perfil</h2>
              <button 
                onClick={handleCancelEdit}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-5">
              {/* Profile Picture */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button 
                  type="button"
                  className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  Cambiar foto
                </button>
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none transition-colors"
                  placeholder="Ingresa tu nombre"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none transition-colors"
                  placeholder="tu@email.com"
                  required
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-400 focus:outline-none transition-colors"
                  placeholder="+57 123 456 7890"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 font-medium transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Toggle Component
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
      checked ? 'bg-emerald-500' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-5' : 'translate-x-0.5'
      }`}
    />
  </button>
);

export default SettingsPage;