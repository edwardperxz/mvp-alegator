import React from 'react';
import { Link } from 'react-router-dom';
import ivan from '../assets/ivan_alegator_confirmationPage.png';

const Confirmation: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ADBC9F] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center z-20 mt-10 lg:mt-20 space-y-4 lg:space-y-6 w-full max-w-md lg:max-w-xl">
        <img src={ivan} alt="Alegator" className="w-40 md:w-52 lg:w-64 object-contain mb-4" />
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#11372A] mb-4">¡TE HAS REGISTRADO CON ÉXITO!</h2>
        <p className="text-lg md:text-xl lg:text-2xl text-[#1C1C1C] mb-6">See You Later, Alegator.</p>
        <Link to="/login" className="bg-[#6B9026] text-white py-2 md:py-3 lg:py-4 px-4 md:px-6 lg:px-8 rounded-full hover:bg-[#507A1B] transition-colors text-base md:text-lg lg:text-xl">VOLVER AL INICIO</Link>
      </div>
    </div>
  );
};

export default Confirmation;
