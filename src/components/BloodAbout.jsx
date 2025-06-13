import React from 'react';
import { Droplet } from 'lucide-react';

const BloodAbout = ({ onNavigate }) => {
  return (
    <div className="px-4 py-10 md:py-16 bg-gradient-to-br from-red-50 via-red-100 to-white min-h-screen flex flex-col items-center justify-center text-center">
      <div className="bg-white px-6 py-10 md:px-10 md:py-12 rounded-3xl shadow-2xl border border-red-200 w-full max-w-4xl">
        <div className="flex items-center justify-center gap-3 mb-6 md:mb-8">
          <h2 className="text-3xl md:text-5xl font-extrabold text-red-800 drop-shadow-md">
            RedDrop – Banco de Sangre
          </h2>
          <Droplet className="text-red-600 w-8 h-8 md:w-10 md:h-10 animate-drip" />
        </div>

        <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 text-justify">
          <span className="font-semibold">RedDrop</span> es una aplicación académica desarrollada con <span className="font-semibold">React</span>, enfocada en el registro y control de donaciones de sangre.
          Este proyecto simula un sistema real de banco de sangre, permitiendo la gestión de donantes, control de inventario,
          administración de centros de recolección y monitoreo de unidades sanguíneas próximas a vencer.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-4 mt-8 flex items-center justify-center gap-3 animate-bounceSlow">
          <span role="img" aria-label="rocket" className="text-3xl md:text-4xl">🚀</span> Objetivo
        </h3>

        <p className="text-base text-gray-600 mb-8 leading-relaxed text-justify max-w-3xl mx-auto">
          El objetivo principal es representar el funcionamiento de un banco de sangre a través de una plataforma digital,
          como parte de un proyecto académico. Está diseñado exclusivamente con fines educativos y no debe utilizarse en entornos clínicos reales.
        </p>

        <h3 className="text-2xl md:text-3xl font-bold text-red-700 mb-5 mt-8 flex items-center justify-center gap-3 animate-bounceSlow">
          <span role="img" aria-label="puzzle" className="text-3xl md:text-4xl">🧩</span> Funcionalidades
        </h3>

        <ul className="list-disc list-inside text-left text-base md:text-lg text-gray-700 space-y-3 max-w-md mx-auto">
          <li>Registro y gestión de donantes</li>
          <li>Control de inventario de sangre por tipo y cantidad</li>
          <li>Administración de centros de recolección</li>
          <li>Notificación de unidades sanguíneas próximas a vencer</li>
        </ul>

        <button
          onClick={() => onNavigate('home')}
          className="mt-10 md:mt-12 bg-red-700 text-white py-3 px-8 md:py-4 md:px-10 rounded-xl text-lg md:text-xl font-semibold shadow-lg hover:bg-red-600 transition-colors duration-300"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default BloodAbout;