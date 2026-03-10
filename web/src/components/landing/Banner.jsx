import React from 'react';
import { FaCheckCircle, FaArrowRight, FaPaw  } from 'react-icons/fa';
import heroDog from '/img-principal.jpg';


const Banner = () => {
    return (
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50 relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                    <div className="w-full lg:w-1/2 flex flex-col  items-start text-left sm:items-center sm:text-center leading-10  z-10">
                        <div className='text-start '>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-4 sm:mb-6 leading-tight">
                                La Salud de tu Mascota,
                                <span className="bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                                    {" "}Todo en un Solo Lugar
                                </span>
                            </h1>

                            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed">
                                Lleva el control de vacunas, citas, medicamentos y el historial completo de salud de tu mascota con nuestra plataforma intuitiva.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto py-2">
                                <button className="group flex items-center justify-center 
            bg-gradient-to-r from-cyan-500 to-teal-600 
            shadow-xl text-white font-medium 
            px-8 py-4 text-lg rounded-xl gap-3
            hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                    Comenzar
                                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            <p className="font-poppins text-slate-600 text-base flex items-center gap-2 mt-8">
                                <FaPaw className="text-cyan-600 text-xl" />
                                Porque su salud también es parte de tu familia
                            </p>

                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end ">
                        <div className="relative rounded-[2rem]  overflow-hidden shadow-2xl bg-gradient-to-r from-cyan-500 to-teal-600">
                            <img
                                src={heroDog}
                                alt="Happy dog smiling"
                                className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full"
                            />
                        </div>


                        <div className="hidden sm:block absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl ">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg sm:rounded-xl flex items-center justify-center">
                                    <FaCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div>
                                    <p className="font-poppins font-bold text-slate-700 text-sm">Vacunación Completa</p>
                                    <p className="font-poppins text-sm text-slate-500">Max • Ahora mismo</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-bl from-teal-50/50 to-transparent rounded-bl-full opacity-60"></div>
        </section>
    );
};

export default Banner;