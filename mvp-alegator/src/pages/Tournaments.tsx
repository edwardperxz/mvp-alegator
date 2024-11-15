import React from 'react';
import Header from '../components/Header';

const Tournaments: React.FC = () => {

  const handleCreateTournament = () => {
    console.log("Crear un nuevo torneo");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header /> 
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="w-full max-w-4xl p-8 bg-[#11372A] text-white rounded-lg shadow-lg flex flex-col items-center">
          <button 
            onClick={handleCreateTournament} 
            className="w-full max-w-md bg-green-700 text-white py-3 rounded-full mb-12 hover:bg-green-800 transition-colors"
          >
            CREAR TORNEO NUEVO
          </button>
          <div className="w-full border-t border-gray-300 my-8"></div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">LISTA DE TUS TORNEOS</h2>
        </div>
      </div>
    </div>
  );
};

export default Tournaments;