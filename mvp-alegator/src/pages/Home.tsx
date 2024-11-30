import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import logo from '../assets/ivan-fondo-transparente.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { UserDashboard } from '../types/Users';
import useUsers from '../hooks/useUsers';

const Home: React.FC = () => {
  const [user, setUser] = useState<UserDashboard>();
  const { fetchUsernameAndShortId } = useUsers();

  useEffect(() => {
    const fetchUser = async () => {
      const userId = (await supabase.auth.getUser()).data?.user?.id;
      if (userId) {
        const userData: UserDashboard = await fetchUsernameAndShortId(userId);
        setUser(userData);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col p-4 relative bg-[#ADBC9F] overflow-x-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center flex-grow mt-8 space-y-8 md:space-y-0 md:space-x-8">
          <div className="flex justify-center md:justify-start w-full md:w-auto md:-ml-16 lg:-ml-20">
            <img src={logo} alt="Ivan" className="h-72 md:h-[28rem] lg:h-[32rem] transform -scale-x-100" />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">Bienvenido a Alegator {user?.username ?? ''}</h1>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;