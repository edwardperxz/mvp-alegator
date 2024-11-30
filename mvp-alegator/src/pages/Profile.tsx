import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useUsers from '../hooks/useUsers';
import { UserData } from '../types/Users';
import PersonIcon from '@mui/icons-material/Person';

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const { fetchUserbyShortId } = useUsers();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        return;
      }
      const user = data?.user;
      if (user) {
        try {
          const userData = await fetchUserbyShortId(user.id);
          setUser(userData);
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    };

    fetchUser();
  }, [fetchUserbyShortId]);

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#ADBC9F] mt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#11372A]">PERFIL</h1>
        <div className="bg-[#11372A] p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-2xl relative z-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center">Información del Usuario</h2>
          {user ? (
            <div className="text-white space-y-4">
              <div className="flex justify-center mb-4">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                    <PersonIcon style={{ fontSize: 60, color: '#11372A' }} />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Nombre:</label>
                <p className="bg-gray-200 text-gray-800 p-2 rounded">{user.first_name}</p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Apellido:</label>
                <p className="bg-gray-200 text-gray-800 p-2 rounded">{user.last_name}</p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Nombre de Usuario:</label>
                <p className="bg-gray-200 text-gray-800 p-2 rounded">{user.username}</p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Correo:</label>
                <p className="bg-gray-200 text-gray-800 p-2 rounded">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Contraseña:</label>
                <p className="bg-gray-200 text-gray-800 p-2 rounded">********</p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">País:</label>
                <p className="bg-gray-200 text-gray-800 p-2 rounded">{user.country}</p>
              </div>
            </div>
          ) : (
            <p className="text-white text-center">Cargando información del usuario...</p>
          )}
          <button
            onClick={handleEditProfile}
            className="mt-6 w-full bg-[#6B9026] text-white py-3 md:py-4 rounded-full hover:bg-[#507A1B] transition-colors text-lg"
          >
            Editar Perfil
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;