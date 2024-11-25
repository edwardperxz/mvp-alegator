import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Tournaments: React.FC = () => {
  const [showYourTournaments, setShowYourTournaments] = useState(false);
  const [showParticipatedTournaments, setShowParticipatedTournaments] = useState(false);
  const navigate = useNavigate();

  const handleCreateTournament = () => {
    navigate('/create-tournament');
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col mt-20">
        <div className="flex-grow p-4 flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl p-8 bg-[#ADBC9F] text-[#11372A] rounded-lg flex flex-col items-center">
            <button 
              onClick={handleCreateTournament} 
              className="w-full max-w-md bg-[#6B9026] text-white py-3 rounded-full mb-12 hover:bg-green-800 transition-colors"
            >
              CREAR TORNEO NUEVO
            </button>
            <div className="w-full border-t border-gray-300 my-8"></div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6">LISTA DE TUS TORNEOS</h2>
            
            <div className="w-full max-w-3xl mb-4">
              <button 
                onClick={() => setShowYourTournaments(!showYourTournaments)}
                className="w-full bg-[#11372A] text-white px-6 py-3 rounded-full hover:bg-[#507A1B] transition-colors text-lg"
              >
                TUS TORNEOS
              </button>
              {showYourTournaments && (
                <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                  {/* Lista de torneos del user */}
                  <p className="text-gray-800">Lista de tus torneos...</p>
                </div>
              )}
            </div>

            <div className="w-full max-w-3xl">
              <button 
                onClick={() => setShowParticipatedTournaments(!showParticipatedTournaments)}
                className="w-full bg-[#11372A] text-white px-6 py-3 rounded-full hover:bg-[#507A1B] transition-colors text-lg"
              >
                TORNEOS EN LOS QUE PARTICIPASTE
              </button>
              {showParticipatedTournaments && (
                <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                  {/* Lista de torneos en los que participó */}
                  <p className="text-gray-800">Lista de torneos en los que participaste...</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Tournaments;