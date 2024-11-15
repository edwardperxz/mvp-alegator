import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoHeader from '../assets/alegator-logo-letras-blancas-fondo-transparente.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { supabase } from '../supabaseClient';

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResponse = await supabase.auth.getUser(token);
        if (userResponse.data) {
          setIsLoggedIn(true);
        } else {
          localStorage.clear(); 
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);  

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('token'); 
      setIsLoggedIn(false);
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
        <nav className="hidden md:flex space-x-8 lg:space-x-16">
          <Link to="/" className="hover:text-gray-300">INICIO</Link>
          <Link to="/tournaments" className="hover:text-gray-300">TORNEOS</Link>
          <Link to="/events" className="hover:text-gray-300">EVENTOS</Link>
        </nav>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
          <Link to="/profile" className="hidden md:block">
            <AccountCircle className="cursor-pointer" style={{ fontSize: 30 }} />
          </Link>

          <button onClick={handleLogout} className="md:block">
            <ExitToAppIcon style={{ fontSize: 30 }} className="cursor-pointer" />
          </button>
        </div>
        ) : (
          <Link to="/login" className="bg-[#6B9026] text-white py-2 px-4 rounded-full hover:bg-[#507A1B]">INICIAR SESIÓN</Link>
        )}
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
            <nav className="flex flex-col items-center space-y-4">
              <Link to="/" className="hover:text-gray-300" onClick={toggleSidebar}>INICIO</Link>
              <Link to="/tournaments" className="hover:text-gray-300" onClick={toggleSidebar}>TORNEOS</Link>
              <Link to="/events" className="hover:text-gray-300" onClick={toggleSidebar}>EVENTOS</Link>
            </nav>
          </div>
          <div className="flex justify-between mb-4 w-full px-4">
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="bg-[#6B9026] text-white py-4 px-6 w-1/2 rounded-lg hover:bg-[#507A1B] flex items-center justify-center" onClick={toggleSidebar}>
                  <AccountCircle style={{ fontSize: 40 }} className="mr-2" /> PERFIL 
                </Link>
                <button className="bg-[#6B9026] text-white py-4 px-6 w-1/2 rounded-lg hover:bg-[#507A1B] flex items-center justify-center ml-2" onClick={handleLogout}>
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-[#6B9026] text-white py-4 px-6 w-1/2 rounded-lg hover:bg-[#507A1B] flex items-center justify-center" onClick={toggleSidebar}>
                INICIAR SESIÓN
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;