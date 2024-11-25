import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import ivan from '../assets/ivan-fondo-transparente.png';

const Confirmation: React.FC = () => {
  const location = useLocation();
  const state = location.state as { context?: string } | undefined;

  const getTitle = () => {
    switch (state?.context) {
      case 'createTournament':
        return '¡TORNEO CREADO Y ACTIVADO CON ÉXITO!';
      case 'subscribeTournament':
        return '¡TE HAS INSCRITO AL TORNEO CON ÉXITO!';
      case 'signup':
      default:
        return '¡TE HAS REGISTRADO CON ÉXITO!';
    }
  };

  const getMessage = () => {
    switch (state?.context) {
      case 'createTournament':
        return 'See You Later, Alegator.';
      case 'subscribeTournament':
        return 'See You Later, Alegator.';
      case 'signup':
      default:
        return 'See You Later, Alegator.';
    }
  };

  const getButtonText = () => {
    switch (state?.context) {
      case 'createTournament':
        return 'VOLVER A TORNEOS';
      case 'subscribeTournament':
        return 'VER MIS TORNEOS';
      case 'signup':
      default:
        return 'VOLVER AL INICIO';
    }
  };

  const getLink = () => {
    switch (state?.context) {
      case 'createTournament':
        return '/tournaments';
      case 'subscribeTournament':
        return '/tournaments';
      case 'signup':
      default:
        return '/login';
    }
  };

  return (
    <div className="min-h-screen bg-[#ADBC9F] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center z-20 mt-8 lg:mt-12 space-y-3 lg:space-y-4 w-full max-w-sm lg:max-w-md">
        <img src={ivan} alt="Alegator" className="w-32 md:w-40 lg:w-48 object-contain mb-3" />
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#11372A] mb-3">{getTitle()}</h2>
        <p className="text-md md:text-lg lg:text-xl text-[#1C1C1C] mb-4"><em>{getMessage()}</em></p>
        <Link to={getLink()} className="bg-[#6B9026] text-white py-2 md:py-3 lg:py-3 px-3 md:px-5 lg:px-6 rounded-full hover:bg-[#507A1B] transition-colors text-sm md:text-md lg:text-lg">{getButtonText()}</Link>
      </div>
    </div>
  );
  
};

export default Confirmation;
