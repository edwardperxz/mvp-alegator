{/*Vista de usuarios registrados en la plataforma*/}

import React from 'react';
import { Link } from 'react-router-dom';
import logoSidebar from '../assets/logo-sidebar.png';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header: React.FC = () => {
  return (
    <header className="bg-[#11372A] text-white p-4 fixed w-full top-0 left-0 z-50 flex items-center justify-between">
      <div className="flex items-center h-16">
        <img src={logoSidebar} alt="Logo" className="h-full w-auto md:h-24" />
      </div>
      <div className="flex items-center space-x-4">
        <nav className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">INICIO</Link>
          <Link to="/my-tournaments" className="hover:text-gray-300">MIS TORNEOS</Link>
          <Link to="/events" className="hover:text-gray-300">EVENTOS</Link>
        </nav>
        <Link to="/profile"><AccountCircle className="cursor-pointer" style={{ fontSize: 30 }} /></Link>
        
      </div>
    </header>
  );
};

export default Header;