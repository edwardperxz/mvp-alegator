import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoSidebar from '../assets/logo-sidebar.png'; 

const SetPin: React.FC = () => {
  const [pin, setPin] = useState('');

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log('PIN establecido:', pin);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ADBC9F]">
      {/* Navbar */}
      <nav className="bg-[#11372A] text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-300">INICIO</Link>
          <Link to="/my-tournaments" className="hover:text-gray-300">MIS TORNEOS</Link>
          <Link to="/events" className="hover:text-gray-300">EVENTOS</Link>
        </div>
        <div className="leaf-graphic h-8 w-8 bg-green-700 rounded-full"></div>
      </nav>

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center">
          <img src={logoSidebar} alt="Alligator" className="h-32 mb-4" /> 
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">INGRESA UN PIN</h1>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="pin" className="block text-gray-700 sr-only">PIN DEL TORNEO</label>
              <input
                type="password"
                id="pin"
                value={pin}
                onChange={handlePinChange}
                className="mt-2 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-[#11372A]"
                placeholder="PIN DEL TORNEO"
                maxLength={6}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#6B9026] text-white py-2 rounded-md hover:bg-green-600 transition duration-300"
            >
              INGRESAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SetPin;