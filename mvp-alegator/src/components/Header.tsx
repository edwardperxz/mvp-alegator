import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoHeader from '../assets/alegator-logo-letras-blancas-fondo-transparente.png';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import { supabase } from '../supabaseClient';

const Header: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const user = (await supabase.auth.getUser()).data?.user;
      setIsAuthenticated(!!user);
    };

    checkUser();
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      console.log('Sesión cerrada correctamente');
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error al cerrar sesión:', error.message);
      } else {
        console.error('Error al cerrar sesión:', error);
      }
    }
  };

  const handleTournamentsClick = () => {
    if (isAuthenticated) {
      navigate('/tournaments');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className="bg-[#11372A] text-white p-4 fixed w-full top-0 left-0 z-50 flex items-center justify-between">
      <div className="flex items-center h-16">
        <Link to="/">
          <img src={logoHeader} alt="Logo" className="w-auto h-24" />
        </Link>
      </div>
      <div className="flex items-center space-x-12">
        <nav className="hidden md:flex space-x-8 lg:space-x-16">
          <Link to="/" className="hover:text-gray-300">INICIO</Link>
          <button onClick={handleTournamentsClick} className="hover:text-gray-300">TORNEOS</button>
          <Link to="/events" className="hover:text-gray-300">EVENTOS</Link>
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <AccountCircle className="cursor-pointer" style={{ fontSize: 30 }} />
              </Link>
              <button onClick={handleLogout}>
                <ExitToAppIcon style={{ fontSize: 30 }} className="cursor-pointer" />
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-gray-300">
              <LoginIcon style={{ fontSize: 30 }} />
            </Link>
          )}
        </div>
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
              <Link to="/home" className="hover:text-gray-300" onClick={toggleSidebar}>INICIO</Link>
              <button onClick={() => { handleTournamentsClick(); toggleSidebar(); }} className="hover:text-gray-300">TORNEOS</button>
              <Link to="/events" className="hover:text-gray-300" onClick={toggleSidebar}>EVENTOS</Link>
            </nav>
          </div>
          <div className="flex justify-between w-full px-4 mb-4">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="bg-[#6B9026] text-white py-4 px-6 rounded-lg hover:bg-[#507A1B] flex items-center justify-center" onClick={toggleSidebar}>
                  <AccountCircle style={{ fontSize: 40 }} className="mr-2" /> PERFIL
                </Link>
                <button className="bg-[#6B9026] text-white py-4 px-6 rounded-lg hover:bg-[#507A1B] flex items-center justify-center ml-2" onClick={handleLogout}>
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-[#6B9026] text-white py-4 px-6 rounded-lg hover:bg-[#507A1B] flex items-center justify-center" onClick={toggleSidebar}>
                <LoginIcon style={{ fontSize: 40 }} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;