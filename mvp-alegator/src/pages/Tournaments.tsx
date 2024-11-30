import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingModal from '../components/LoadingModal';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { UserDashboard } from '../types/Users';
import useUsers from '../hooks/useUsers';
import { supabase } from '../supabaseClient';

interface tournaments {
  id: string;
  name: string;
  shortname: string | null;
  place: string | null;
  description_tournament: string | null;
  tournament_status: string;
  missing_feedbacks: boolean;
  feedback_description: string | null;
  minimum_panel_score: number | null;
  avoid_same_instituion: boolean;
  start_date: Date | null;
  end_date: Date | null;
  created_at: string;
  updated_at: string;
  check_in: boolean;
  speaker_criteria: any;
  team_criteria: any;
  creator: string;
}

const Tournaments: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserDashboard>();
  const { fetchUsernameAndShortId } = useUsers();
  const [tournaments, setTournaments] = useState<tournaments[]>([]);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const handleCreateTournament = () => {
    navigate('/create-tournament');
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

  const handleSubscribeTournament = () => {
    navigate('/subscribe-tournament');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadingModal(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user?.id) {
          throw new Error('No se pudo obtener el ID del usuario');
        }

        const [userData, tournamentsData] = await Promise.all([
          fetchUsernameAndShortId(user.id),
          supabase
            .from('tournaments')
            .select('*')
            .eq('creator', user.id)
        ]);

        if (tournamentsData.error) {
          throw tournamentsData.error;
        }

        setUser(userData);
        setTournaments(tournamentsData.data || []);

      } catch (error) {
        console.error('Error fetching data:', error);

      } finally {
        setLoadingModal(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col mt-20">
        <div className="flex-grow p-4">
          <h1 className="text-5xl font-bold text-center text-[#11372A] mt-8">
            ¡BIENVENIDO, {user?.username?.toUpperCase() ?? 'USERNAME'}!
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto p-6 lg:p-12">
            <div className="flex flex-col gap-4">
              <div className="bg-[#FFF] p-8 rounded-lg">
                <h2 className="text-2xl font-bold text-[#11372A] mb-6 text-center">TU CUENTA</h2>
                <div className="flex items-center gap-4 mb-6">
                  <AccountCircleIcon style={{ fontSize: 60 }} className="mr-2 text-[#11372A]" />
                  <div>
                    <p className="text-lg font-semibold text-[#11372A]">{user?.username ?? 'Username'}</p>
                    <p className="text-sm text-[#11372A]">Código: {user?.short_id?.toUpperCase() ?? 'ID'}</p>
                  </div>
                </div>
                <button className="w-full bg-[#11372A] text-white py-3 rounded-full mb-4 hover:bg-green-700 transition-colors" onClick={handleEditProfile}>
                  Editar cuenta
                </button>
                <button className="w-full bg-[#11372A] text-white py-3 rounded-full hover:bg-red-700 transition-colors" onClick={handleLogout}>
                  Cerrar Sesión
                </button>
              </div>

              <button
                onClick={handleCreateTournament}
                className="w-full bg-[#6B9026] text-white py-3 rounded-full hover:bg-green-700 transition-colors shadow"
              >
                CREAR TORNEO NUEVO
              </button>
            </div>

            <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                LISTA DE TUS TORNEOS
              </h2>
              {tournaments.length > 0 ? (
              tournaments.map((tournament) => (
              <div key={tournament.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
                <p className="text-2xl font-semibold text-[#11372A]">{tournament.name}</p>
                <div className="flex flex-col items-end">
                  <button
                    className="text-[#11372A] underline py-1 hover:text-green-700 transition-colors"
                    onClick={handleSubscribeTournament}
                  >
                    Registrar Equipo o Juez
                  </button>
                  <button className="text-[#11372A] underline py-1 hover:text-green-700 transition-colors mt-2">
                    Vista de Administrador
                  </button>
                </div>
              </div>
              ))
            ) : (
              <p>No tienes torneos creados.</p>
            )}
            </div>

          </div>
        </div>
        {loadingModal && <LoadingModal />}
        <Footer />
      </div>
    </>
  );
};

export default Tournaments;