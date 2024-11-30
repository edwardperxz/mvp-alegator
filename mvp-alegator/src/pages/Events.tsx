import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Events: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#ADBC9F] mt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#11372A]">EVENTOS</h1>

        <div className="w-full max-w-4xl">
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#11372A]">Eventos Nacionales</h2>
            <Link to="/event1" className="block bg-white p-6 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-[#11372A]">Torneo Nacional de Debate Escolar</h3>
              <p className="text-gray-700">Fecha: 15 de noviembre de 2024</p>
              <p className="text-gray-700">Lugar: Ciudad de Panamá, Panamá</p>
              <p className="text-gray-700">Descripción: Un evento anual donde estudiantes de todo el país compiten en debates sobre temas actuales y relevantes.</p>
            </Link>
            <Link to="/event2" className="block bg-white p-6 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-[#11372A]">Congreso Nacional de Oratoria</h3>
              <p className="text-gray-700">Fecha: 10 de diciembre de 2024</p>
              <p className="text-gray-700">Lugar: Universidad de Panamá, Panamá</p>
              <p className="text-gray-700">Descripción: Un congreso que reúne a los mejores oradores del país para compartir técnicas y experiencias.</p>
            </Link>
            <Link to="/event3" className="block bg-white p-6 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-[#11372A]">Reunión Anual de Clubes de Debate</h3>
              <p className="text-gray-700">Fecha: 20 de enero de 2025</p>
              <p className="text-gray-700">Lugar: Hotel El Panamá, Panamá</p>
              <p className="text-gray-700">Descripción: Una reunión para discutir el estado actual del debate en Panamá y planificar futuros eventos y actividades.</p>
            </Link>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#11372A]">Eventos Internacionales</h2>
            <Link to="/event4" className="block bg-white p-6 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-[#11372A]">Campeonato Mundial de Debate Universitario</h3>
              <p className="text-gray-700">Fecha: 5 de marzo de 2025</p>
              <p className="text-gray-700">Lugar: Londres, Reino Unido</p>
              <p className="text-gray-700">Descripción: El evento más prestigioso en el mundo del debate universitario, con equipos de todo el mundo compitiendo por el título.</p>
            </Link>
            <Link to="/event5" className="block bg-white p-6 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-[#11372A]">Conferencia Internacional de Oratoria</h3>
              <p className="text-gray-700">Fecha: 12 de abril de 2025</p>
              <p className="text-gray-700">Lugar: Nueva York, Estados Unidos</p>
              <p className="text-gray-700">Descripción: Una conferencia que reúne a oradores de todo el mundo para compartir sus conocimientos y experiencias.</p>
            </Link>
            <Link to="/event6" className="block bg-white p-6 rounded-lg shadow-md mb-4 hover:bg-gray-100 transition-colors">
              <h3 className="text-lg md:text-xl font-bold text-[#11372A]">Foro Global de Debate y Comunicación</h3>
              <p className="text-gray-700">Fecha: 25 de mayo de 2025</p>
              <p className="text-gray-700">Lugar: Tokio, Japón</p>
              <p className="text-gray-700">Descripción: Un foro que aborda los desafíos y oportunidades en el campo del debate y la comunicación a nivel global.</p>
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Events;