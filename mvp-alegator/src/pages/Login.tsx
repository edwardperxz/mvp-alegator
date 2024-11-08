import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/alegator-logo-footer.png';
import hojaAsset from '../assets/hoja-asset.png';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="relative flex justify-center z-10">
        <img src={logo} alt="Alegator" className="h-36 md:h-48 lg:h-60 -mb-20 md:-mb-24 lg:-mb-24" />
      </div>
      <div className="bg-[#11372A] p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-2xl relative z-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center">INICIO DE SESIÓN</h2>
        <form className="space-y-6 md:space-y-8">
          <div>
            <label htmlFor="username" className="sr-only">Nombre de Usuario</label>
            <input type="text" id="username" placeholder="Nombre de Usuario" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-3 md:py-4 rounded-full hover:bg-green-600 transition-colors text-lg">INGRESAR</button>
        </form>
        <div className="mt-12 text-center text-white">
          ¿No tienes una cuenta? <div><Link to="/register" className="text-yellow-400 hover:underline text-xl">REGÍSTRATE</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Login;