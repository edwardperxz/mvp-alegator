import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CreateTournament: React.FC = () => {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    console.log("Crear Torneo Demo");
  };

  const handleBack = () => {
    navigate('/tournaments');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Confirmar creación de torneo");
    navigate('/confirmation', { state: { context: 'createTournament' } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#ADBC9F] mt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#11372A]">CREAR TORNEO NUEVO</h1>
        <div className="bg-[#657656] p-4 md:p-6 rounded-lg shadow-md mb-8 text-center w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
          <p className="text-[#FFE682] mb-2 text-sm md:text-base lg:text-lg text-left">Consejo:</p>
          <p className="mb-4 text-sm md:text-base lg:text-lg text-white text-justify">
            <strong>¿Eres nuevo en Alegator?</strong> Puedes crear un torneo de demostración que esté con una configuración preestablecida de equipos, jueces y salas.
          </p>
          <button 
            onClick={handleDemoClick} 
            className="bg-[#FFE682] text-[#11372A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Torneo Demo
          </button>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-[#11372A]">INGRESE LOS SIGUIENTES DATOS</h2>
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-2">NOMBRE DE TORNEO</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg text-base" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-2">LUGAR</label>
            <input type="text" className="w-full px-4 py-2 border rounded-lg text-base" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-2">FECHA</label>
            <input type="date" className="w-full px-4 py-2 border rounded-lg text-base" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-2">RONDAS</label>
            <input type="number" className="w-full px-4 py-2 border rounded-lg text-base" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-2">DESCRIPCIÓN</label>
            <textarea className="w-full px-4 py-2 border rounded-lg text-base" required></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-base mb-2">MAX. EQUIPOS</label>
            <input type="number" className="w-full px-4 py-2 border rounded-lg text-base" required />
          </div>
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <button 
              type="button" 
              onClick={handleBack} 
              className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors w-full md:w-auto"
            >
              Volver
            </button>
            <button 
              type="submit" 
              className="bg-[#6B9026] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors w-full md:w-auto"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateTournament;
