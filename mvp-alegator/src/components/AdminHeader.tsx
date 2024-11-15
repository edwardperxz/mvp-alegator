import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoHeader from '../assets/alegator-logo-letras-blancas-fondo-transparente.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { supabase } from '../supabaseClient';

const AdminHeader: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    /*
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await supabase.auth.getUser(token);
        if (!userResponse.data) {
          localStorage.clear();  
        }
      }
    };

    checkLoginStatus();
    */
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      // localStorage.clear();
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <header className="bg-[#11372A] text-white p-4 fixed w-full top-0 left-0 z-50 flex items-center justify-between">
      <div className="flex items-center h-16">
        <img src={logoHeader} alt="Logo" className="h-full w-auto md:h-24" />
      </div>
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex space-x-6 lg:space-x-10"> {/* Reducir espacio entre opciones */}
          <Link to="/" className="hover:text-gray-300">INICIO</Link>
          <Link to="/configure-tournament" className="hover:text-gray-300">CONFIGURAR TORNEO</Link>
          <Link to="/register" className="hover:text-gray-300">REGISTRO</Link>
          <Link to="/rounds" className="hover:text-gray-300">RONDAS</Link>
          <Link to="/users" className="hover:text-gray-300">USUARIOS</Link>
          <Link to="/feedback" className="hover:text-gray-300">FEEDBACK</Link>
          <Link to="/staff" className="hover:text-gray-300">STAFF</Link>
          <Link to="/incompatibility" className="hover:text-gray-300">INCOMPATIBILIDAD</Link>
        </nav>
        <Link to="/profile" className="hidden md:block"><AccountCircle className="cursor-pointer" style={{ fontSize: 30 }} /></Link>
        <button className="md:hidden" onClick={toggleSidebar}>
          <MenuIcon style={{ fontSize: 30 }} />
        </button>
      </div>
      <div className={`fixed inset-0 bg-[#11372A] text-white z-40 transform ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="p-4 flex flex-col justify-between h-full">
          <div>
            <button className="absolute top-4 right-4" onClick={toggleSidebar}>
              <CloseIcon style={{ fontSize: 30 }} />
            </button>
            <div className="flex flex-col items-center mt-8">
              <img src={logoHeader} alt="Logo" className="h-32 md:h-36 mb-4" />
              <hr className="w-full border-t border-white mb-8" />
            </div>
            <nav className="flex flex-col items-center space-y-8"> {/* Incrementa el espacio vertical */}
              <Link to="/" className="hover:text-gray-300" onClick={toggleSidebar}>INICIO</Link>
              <Link to="/configure-tournament" className="hover:text-gray-300" onClick={toggleSidebar}>CONFIGURAR TORNEO</Link>
              <Link to="/register" className="hover:text-gray-300" onClick={toggleSidebar}>REGISTRO</Link>
              <Link to="/rounds" className="hover:text-gray-300" onClick={toggleSidebar}>RONDAS</Link>
              <Link to="/users" className="hover:text-gray-300" onClick={toggleSidebar}>USUARIOS</Link>
              <Link to="/feedback" className="hover:text-gray-300" onClick={toggleSidebar}>FEEDBACK</Link>
              <Link to="/staff" className="hover:text-gray-300" onClick={toggleSidebar}>STAFF</Link>
              <Link to="/incompatibility" className="hover:text-gray-300" onClick={toggleSidebar}>INCOMPATIBILIDAD</Link>
            </nav>
          </div>
          <div className="flex justify-between mb-4 w-full px-4">
            <Link to="/profile" className="bg-[#6B9026] text-white py-4 px-6 w-1/2 rounded-lg hover:bg-[#507A1B] flex items-center justify-center" onClick={toggleSidebar}>
              <AccountCircle style={{ fontSize: 40 }} className="mr-2" /> PERFIL
            </Link>
            <button className="bg-[#6B9026] text-white py-4 px-6 w-1/2 rounded-lg hover:bg-[#507A1B] flex items-center justify-center ml-2" onClick={handleLogout}>
              CERRAR SESIÓN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;