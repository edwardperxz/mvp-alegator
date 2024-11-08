import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/alegator-logo-footer.png';

const Signup: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="relative flex justify-center z-10">
        <img src={logo} alt="Alegator" className="h-36 md:h-48 lg:h-60 -mb-20 md:-mb-24 lg:-mb-24" />
      </div>
      <div className="bg-[#11372A] p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-2xl relative z-0">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center">CREAR UNA CUENTA</h2>
        <form className="space-y-6 md:space-y-8">
          <div className="flex justify-between">
            <div className="w-1/2 pr-2">
              <label htmlFor="firstName" className="sr-only">Nombre</label>
              <input type="text" id="firstName" placeholder="Nombre" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div className="w-1/2 pl-2">
              <label htmlFor="lastName" className="sr-only">Apellido</label>
              <input type="text" id="lastName" placeholder="Apellido" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>
          <div>
            <label htmlFor="username" className="sr-only">Nombre de Usuario</label>
            <input type="text" id="username" placeholder="Nombre de Usuario" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Correo</label>
            <input type="email" id="email" placeholder="Correo" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Contraseña</label>
            <input type="password" id="password" placeholder="Contraseña" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="sr-only">Repetir Contraseña</label>
            <input type="password" id="confirmPassword" placeholder="Repetir Contraseña" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-3 md:py-4 rounded-full hover:bg-green-600 transition-colors text-lg">REGISTRARSE</button>
        </form>
        <div className="mt-6 text-center text-white">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-yellow-400 hover:underline">INICIAR SESIÓN</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;