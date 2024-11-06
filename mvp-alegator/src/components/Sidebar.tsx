{/*Vista de administradores y creadores de torneos*/}

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoSidebar from '../assets/logo-sidebar.png';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const getLinkClass = (path: string) => {
    return location.pathname === path ? 'bg-[#6B9026] text-white font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white';
  };

  const handleLinkClick = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-4 left-4 z-50 p-2 text-white bg-[#11372A] rounded-md md:hidden ${isOpen ? 'hidden' : 'block'}`}
      >
        ☰
      </button>
      <aside className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 bg-[#11372A] text-white font-roboto transition-transform duration-300 md:relative md:translate-x-0 md:flex md:flex-col md:h-full`}>
        <div className="flex flex-col h-full justify-between">
          <div className="flex flex-col items-center justify-center p-2 bg-[#11372A] text-white h-24">
            <img src={logoSidebar} alt="Logo" className="h-24 w-auto" />
            <button
              onClick={() => setIsOpen(false)}
              className="focus:outline-none md:hidden absolute top-4 right-4 p-2 text-white bg-[#11372A] text-xl rounded-md"
            >
              ✖
            </button>
          </div>
          <nav className="flex-1">
            <ul className="space-y-2">
              <li>
                <Link to="/" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/')}`} onClick={handleLinkClick}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/configure-tournament" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/configure-tournament')}`} onClick={handleLinkClick}>
                  Configurar Torneo
                </Link>
              </li>
              <li>
                <Link to="/register" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/register')}`} onClick={handleLinkClick}>
                  Registro
                </Link>
              </li>
              <li>
                <Link to="/rounds" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/rounds')}`} onClick={handleLinkClick}>
                  Rondas
                </Link>
              </li>
              <li>
                <Link to="/users" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/users')}`} onClick={handleLinkClick}>
                  Usuarios
                </Link>
              </li>
              <li>
                <Link to="/feedback" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/feedback')}`} onClick={handleLinkClick}>
                  Feedback
                </Link>
              </li>
              <li>
                <Link to="/staff" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/staff')}`} onClick={handleLinkClick}>
                  Staff
                </Link>
              </li>
              <li>
                <Link to="/incompatibility" className={`block py-2.5 px-4 transition duration-200 ${getLinkClass('/incompatibility')}`} onClick={handleLinkClick}>
                  Incompatibilidad
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;