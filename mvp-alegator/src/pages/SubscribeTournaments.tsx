import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SubscribeTournaments: React.FC = () => {
  const navigate = useNavigate();

  const handleRegisterJudgeClick = () => {
    console.log("Registrar juez");
    navigate('/subscribe-tournament/judge');
  };

  const handleRegisterDebatientClick = () => {
    console.log("Registrar debatientes");
    navigate('/subscribe-tournament/debatient');
  };

  return (
    <div className="min-h-screen flex flex-col mt-8">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#ADBC9F] mt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#11372A]">REGISTRO</h1>
        <div className="bg-[#657656] p-4 md:p-6 rounded-lg shadow-md mb-8 text-center w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
          <h2 className="mb-4 text-sm md:text-base lg:text-lg text-white text-center">
            <strong>¿A QUIEN QUIERES REGISTRAR?</strong>
          </h2>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 justify-center">
            <button 
              onClick={handleRegisterDebatientClick} 
              className="bg-green-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#6B9026] transition-colors"
            >
              Equipo debatiente
            </button>
            <button 
              onClick={handleRegisterJudgeClick} 
              className="bg-green-800 text-white px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-[#6B9026] transition-colors"
            >
              Juez
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubscribeTournaments;