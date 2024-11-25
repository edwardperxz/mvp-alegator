import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/alegator-logo-letras-blancas-fondo-transparente.png';

const ErrorPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#ADBC9F] p-4">
      <div className="max-w-md w-full text-center bg-[#11372A] p-8 rounded-lg shadow-lg">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Alegator" className="h-36" />
        </div>
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-4">Página no encontrada :(</h2>
        <p className="text-white mb-8">Lo sentimos, pero la página que estás buscando no existe. Puede que haya sido movida o eliminada.</p>
        <Link 
          to="/home" 
          className="inline-block bg-green-700 text-white py-2 px-4 rounded-full hover:bg-green-800 transition-colors"
        >
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;