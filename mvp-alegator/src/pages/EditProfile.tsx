import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../supabaseClient';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useUsers from '../hooks/useUsers';
import { UserData } from '../types/Users';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const usernameSchema = z.object({
  username: z.string().min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
});

type UsernameFormFields = z.infer<typeof usernameSchema>;

const EditProfile: React.FC = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UsernameFormFields>({
    resolver: zodResolver(usernameSchema)
  });
  const [user, setUser] = useState<UserData | null>(null);
  const [canChangeUsername, setCanChangeUsername] = useState(true);
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
        const userData = await fetchUserbyShortId(user.id);
        setUser(userData);
        setValue('username', userData.username || '');

        // Check if the username was changed in the last 30 days
        const lastChanged = new Date(userData.updated_at || '');
        const now = new Date();
        const diffDays = Math.floor((now.getTime() - lastChanged.getTime()) / (1000 * 60 * 60 * 24));
        setCanChangeUsername(diffDays >= 30);
      }
    };

    fetchUser();
  }, [setValue, fetchUserbyShortId]);

  const onSubmitUsername = async (data: UsernameFormFields) => {
    try {
      // Update username
      const updates: any = {
        username: data.username,
      };

      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user?.id);

      if (error) {
        throw error;
      }

      console.log('Nombre de usuario actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario:', error);
    }
  };

  const handleBackToProfile = () => {
    navigate('/profile');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#ADBC9F] mt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#11372A]">PERFIL</h1>
        <div className="bg-[#11372A] p-8 md:p-12 lg:p-16 rounded-lg shadow-lg w-full max-w-md md:max-w-lg lg:max-w-2xl relative z-0">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6 md:mb-8 lg:mb-10 text-center">Editar Información</h2>
          <div className="flex justify-center mb-4 relative">
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <PersonIcon style={{ fontSize: 60, color: '#11372A' }} />
              </div>
            )}
          </div>
          <div className="space-y-6 md:space-y-8">
            <div>
              <label htmlFor="first_name" className="sr-only">Nombre</label>
              <input
                type="text"
                id="first_name"
                placeholder="Nombre"
                className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
                value={user?.first_name || ''}
                disabled
              />
            </div>
            <div>
              <label htmlFor="last_name" className="sr-only">Apellido</label>
              <input
                type="text"
                id="last_name"
                placeholder="Apellido"
                className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
                value={user?.last_name || ''}
                disabled
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Correo</label>
              <input
                type="email"
                id="email"
                placeholder="Correo"
                className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
                value={user?.email || ''}
                disabled
              />
            </div>
            <div>
              <label htmlFor="country" className="sr-only">País</label>
              <input
                type="text"
                id="country"
                placeholder="País"
                className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full bg-gray-200 text-gray-500 cursor-not-allowed"
                value={user?.country || ''}
                disabled
              />
            </div>
          </div>
          <form className="space-y-6 md:space-y-8 mt-8" onSubmit={handleSubmit(onSubmitUsername)}>
            <div>
              <label htmlFor="username" className="sr-only">Nombre de Usuario</label>
              <input {...register("username")}
                type="text" id="username" placeholder="Nombre de Usuario" className="w-full px-4 py-3 md:px-5 md:py-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#507A1B]" disabled={!canChangeUsername} />
              {errors.username && (
                <div className='text-red-500 text-sm mt-1'>{errors.username.message}</div>
              )}
              {!canChangeUsername && (
                <div className='text-yellow-500 text-sm mt-1'>No puedes cambiar tu nombre de usuario en este momento. Inténtalo de nuevo en 30 días.</div>
              )}
            </div>
            <button type="submit" className="w-full bg-[#6B9026] text-white py-3 md:py-4 rounded-full hover:bg-[#507A1B] transition-colors text-lg" disabled={!canChangeUsername}>Actualizar Nombre de Usuario</button>
          </form>
          <button onClick={handleBackToProfile} className="w-full bg-gray-500 text-white py-3 md:py-4 rounded-full hover:bg-gray-600 transition-colors text-lg mt-4">Volver al Perfil</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfile;