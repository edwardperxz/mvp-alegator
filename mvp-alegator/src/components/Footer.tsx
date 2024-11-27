import React from 'react';
import { Link } from 'react-router-dom';
import logoFooter from '../assets/ivan-lentes-fondo-transparente.png'; 
import { Instagram, Facebook, Twitter } from '@mui/icons-material'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#11372A] text-white p-6 flex-shrink-0 relative mt-32">
      <div className="container mx-auto flex flex-col items-center">
        <div className="relative w-full flex justify-center">
          <img src={logoFooter} alt="Alegator" className="h-36 mb-4 absolute -top-28" />
        </div>
        <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <h2 className="text-lg font-bold mb-4">ENLACES RÁPIDOS</h2>
            <ul>
              <li><Link to="/home" className="hover:text-gray-300">Inicio</Link></li>
              <li><Link to="/tournaments" className="hover:text-gray-300">Mis Torneos</Link></li>
              <li><Link to="/events" className="hover:text-gray-300">Eventos</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">CONTÁCTANOS</h2>
            <ul>
              <li className="hover:text-gray-300">+507 6777-7777</li>
              <li className="hover:text-gray-300">alegator@gmail.com</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg font-bold mb-4">SÍGUENOS</h2>
            <div className="flex justify-center space-x-4">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Instagram />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Facebook />
              </a>
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
                <Twitter />
              </a>
            </div>
          </div>
        </div>
        <hr className="border-t border-gray-300 my-4 w-full" /> 
        <div className="text-center text-xs">
          © 2024 Alegator. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;