import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/ivan-fondo-transparente.png';
import Header from '../components/Header';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [pin, setPin] = React.useState('');

  const handleJoinTournament = () => {
    console.log("PIN del torneo:", pin);
    navigate("/xd"); // haz la validacion en supa para el pin creado
  };

  return (
    <div className="min-h-screen flex flex-col p-4 relative bg-[#ADBC9F] overflow-x-hidden">
      <Header />
      <div className="flex flex-col md:flex-row items-center justify-center flex-grow mt-8">
        <div className="flex justify-center md:justify-start w-full md:w-auto md:-ml-16 lg:-ml-20">
          <img src={logo} alt="Ivan" className="h-72 md:h-[28rem] lg:h-[32rem] transform -scale-x-100" />
        </div>
        <div className="w-full md:w-auto lg:w-1/3 flex flex-col items-center mt-8 md:mt-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#11372A] mb-4 text-center">INGRESA UN PIN</h2>
          <input 
            type="text" 
            placeholder="PIN DEL TORNEO" 
            value={pin} 
            onChange={(e) => setPin(e.target.value)} 
            className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B] mb-4" 
          />
          <button 
            onClick={handleJoinTournament} 
            className="w-full bg-[#6B9026] text-white py-3 md:py-4 rounded-full hover:bg-[#507A1B] transition-colors text-lg"
          >
            INGRESAR
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;