import React, { useState } from 'react';
import { FaUserCircle, FaSignOutAlt, FaBell, FaMoon, FaQuestionCircle, FaInfoCircle, FaLock, FaEnvelope, FaChevronRight } from 'react-icons/fa';
import ToggleSwitch from '../components/ToggleSwitch';

const SettingsPage = () => {
    const [notifications, setNotifications] = useState({
        reminders: true,
        push: false,
    });
    const [darkMode, setDarkMode] = useState(false);

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 lg:p-8">
            {/* Encabezado */}
            
            <div className=" bg-slate-800 text-white p-6 lg:p-8 rounded-3xl shadow-xl mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl lg:text-4xl font-bold mb-2">Configuración</h1>
                        <p className="text-slate-400 text-base lg:text-lg">Gestiona tu cuenta y preferencias</p>
                    </div>
                    <FaUserCircle className="text-4xl text-slate-300" />
                </div>
            </div>

            {/* Contenedor Principal */}
            <div className="max-w-6xl mx-auto p-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Columna Izquierda */}
                    <div className="space-y-6">

                        {/* Módulo Cuenta */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 ml-1">Cuenta</h2>
                            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                                {/* Tarjeta de Usuario */}
                                <div className="p-6 border-b border-gray-100 flex items-center gap-4">
                                    <FaUserCircle className="text-6xl text-slate-200" />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-slate-800">Usuario Demo</h3>
                                        <p className="text-slate-500 text-sm">usuario@demo.com</p>
                                    </div>
                                    <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors">
                                        Editar perfil
                                    </button>
                                </div>

                                {/* Opciones de Cuenta */}
                                <div className="p-4 space-y-4">
                                    <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                                            <FaEnvelope />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-500">Correo Electrónico</p>
                                            <p className="text-slate-800">usuario@demo.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-500">
                                            <FaLock />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-500">Contraseña</p>
                                            <p className="text-slate-800">Cambiar contraseña</p>
                                        </div>
                                        <FaChevronRight className="text-gray-300" />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Módulo Notificaciones */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 ml-1">Notificaciones</h2>
                            <div className="bg-white rounded-xl shadow-md p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                                            <FaBell />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">Recordatorios</p>
                                            <p className="text-sm text-slate-500">Recibir alertas de citas y vacunas</p>
                                        </div>
                                    </div>
                                    <ToggleSwitch
                                        checked={notifications.reminders}
                                        onChange={() => toggleNotification('reminders')}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                                            <FaBell />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">Notificaciones push</p>
                                            <p className="text-sm text-slate-500">Recibir notificaciones en el móvil</p>
                                        </div>
                                    </div>
                                    <ToggleSwitch
                                        checked={notifications.push}
                                        onChange={() => toggleNotification('push')}
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Columna Derecha */}
                    <div className="space-y-6">

                        {/* Módulo Preferencias */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 ml-1">Preferencias</h2>
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
                                            <FaMoon />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-800">Modo oscuro</p>
                                            <p className="text-sm text-slate-500">Cambiar la apariencia de la app</p>
                                        </div>
                                    </div>
                                    <ToggleSwitch
                                        checked={darkMode}
                                        onChange={setDarkMode}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Módulo Ayuda y Soporte */}
                        <section>
                            <h2 className="text-xl font-bold text-slate-800 mb-4 ml-1">Ayuda y Soporte</h2>
                            <div className="bg-white rounded-xl shadow-md p-4 space-y-2">
                                <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-500">
                                        <FaQuestionCircle />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-800">Centro de ayuda</p>
                                    </div>
                                    <FaChevronRight className="text-gray-300" />
                                </div>
                                <div className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-500">
                                        <FaInfoCircle />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-slate-800">Acerca de</p>
                                    </div>
                                    <FaChevronRight className="text-gray-300" />
                                </div>
                            </div>
                        </section>

                        {/* Botón Cerrar Sesión */}
                        <section className="pt-4">
                            <button className="w-full flex items-center justify-center gap-3 p-4 rounded-xl border border-red-200 text-red-500 hover:bg-red-50 transition-colors font-medium">
                                <FaSignOutAlt />
                                <span>Cerrar sesión</span>
                            </button>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
