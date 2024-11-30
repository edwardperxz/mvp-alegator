import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Tournament } from '../types/Tournaments';
import useTournaments from '../hooks/useTournaments';
import { supabase } from '../supabaseClient';

interface TournamentFormData {
  name: string;
  shortname: string;
  place: string;
  start_date: string;
  end_date: string;
  tournament_status: string;
  minimum_panel_score: number;
  missing_feedbacks: boolean;
  avoid_same_institution: boolean;
  check_in: boolean;
}

const CreateTournament: React.FC = () => {
  const navigate = useNavigate();
  const { createTournament } = useTournaments();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<TournamentFormData>({
    name: '',
    shortname: '',
    place: '',
    start_date: '',
    end_date: '',
    tournament_status: 'en preparación', // Default status
    minimum_panel_score: 0,
    missing_feedbacks: false,
    avoid_same_institution: false,
    check_in: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleDemoClick = () => {
    console.log('Creating demo tournament');
  }

  const handleBack = () => {
    navigate('/tournaments');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Authentication required');

      const tournamentData = {
        name: formData.name,
        shortname: formData.shortname,
        place: formData.place,
        start_date: formData.start_date,
        end_date: formData.end_date,
        tournament_status: formData.tournament_status,
        minimum_panel_score: formData.minimum_panel_score,
        missing_feedbacks: formData.missing_feedbacks,
        avoid_same_institution: formData.avoid_same_institution,
        check_in: formData.check_in,
        creator: user.id
      };

      await createTournament(tournamentData);
      navigate('/confirmation', { state: { context: 'createTournament' } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create tournament');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-[#ADBC9F] mt-32">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#11372A]">CREAR TORNEO NUEVO</h1>
        {/* Demo Section */}
        <div className="bg-[#657656] p-4 md:p-6 rounded-lg shadow-md mb-8 text-center w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
          <p className="text-[#FFE682] mb-2 text-sm md:text-base lg:text-lg text-left">Consejo:</p>
          <p className="mb-4 text-sm md:text-base lg:text-lg text-white text-justify">
            <strong>¿Eres nuevo en Alegator?</strong> Puedes crear un torneo de demostración que esté con una configuración preestablecida de equipos, jueces y salas.
          </p>
          <button
            onClick={handleDemoClick}
            className="bg-[#FFE682] text-[#11372A] px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-yellow-600 transition-colors"
          >
            Torneo Demo
          </button>
        </div>
        {/* Main Form */}
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
          <h2 className="text-xl md:text-2xl font-bold mb-6 text-center text-[#11372A]">INGRESE LOS SIGUIENTES DATOS</h2>
          {error && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-base mb-2">NOMBRE DE TORNEO</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-base focus:ring-2 focus:ring-[#657656] focus:border-[#657656]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base mb-2">SIGLAS</label>
              <input
                type="text"
                name="shortname"
                value={formData.shortname}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-base focus:ring-2 focus:ring-[#657656] focus:border-[#657656]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base mb-2">LUGAR</label>
              <input
                type="text"
                name="place"
                value={formData.place}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-base focus:ring-2 focus:ring-[#657656] focus:border-[#657656]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base mb-2">FECHA INICIO</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-base focus:ring-2 focus:ring-[#657656] focus:border-[#657656]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base mb-2">FECHA FIN</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg text-base focus:ring-2 focus:ring-[#657656] focus:border-[#657656]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-base mb-2">DESCRIPCIÓN</label>
              <textarea
                name="description_tournament"
                value={formData.description_tournament}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg text-base focus:ring-2 focus:ring-[#657656] focus:border-[#657656]"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-base mb-2">MINIMUM PANEL SCORE</label>
              <input
                type="number"
                name="minimum_panel_score"
                value={formData.minimum_panel_score}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 border rounded-lg text-base focus:ring-2 focus:ring-[#657656] focus:border-[#657656]"
              />
            </div>
          </div>
          {/* Checkboxes */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="avoid_same_institution"
                checked={formData.avoid_same_institution}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-[#657656] focus:ring-[#657656]"
              />
              <label className="ml-2 text-gray-700">Avoid Same Institution</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="missing_feedbacks"
                checked={formData.missing_feedbacks}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-[#657656] focus:ring-[#657656]"
              />
              <label className="ml-2 text-gray-700">Allow Missing Feedbacks</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="check_in"
                checked={formData.check_in}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-[#657656] focus:ring-[#657656]"
              />
              <label className="ml-2 text-gray-700">Enable Check-in</label>
            </div>
          </div>
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="bg-gray-500 text-white px-6 py-2 rounded-full hover:bg-gray-600 transition-colors w-full md:w-auto disabled:opacity-50"
            >
              Volver
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#6B9026] text-white px-6 py-2 rounded-full hover:bg-green-800 transition-colors w-full md:w-auto disabled:opacity-50 flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </>
              ) : 'Confirmar'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateTournament;