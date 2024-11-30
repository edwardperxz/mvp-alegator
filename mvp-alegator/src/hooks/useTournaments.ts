import { supabase } from '../supabaseClient';
import type { Tournament } from '../types/Tournaments';

export default () => {
    return {
        fetchTournamentById,
        fetchAllTournaments,
        createTournament,
    };
}

async function fetchTournamentById(tournamentId: string): Promise<Tournament> {
    const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', tournamentId)
        .single();

    if (error) {
        console.error('Error al obtener los datos del torneo:', error.message);
        throw error;
    }

    if (!data) {
        throw new Error('No se encontraron datos del torneo');
    }
    return data as Tournament;
}

async function fetchAllTournaments(): Promise<Tournament[]> {
    const { data, error } = await supabase
    .from('tournaments')
    .select('*');

    if (error) {
        console.error('Error al obtener todos los torneos:', error.message);
        throw error;
    }

    return data as Tournament[];
}

async function createTournament(tournament: Tournament): Promise<Tournament> {
    const { data, error } = await supabase
        .from('tournaments')
        .insert([tournament])
        .select().single();
    if (error) {
        console.error('Error al insertar los datos del torneo:', error.message);
        throw error;
    }
    if (!data) {
        throw new Error('No se encontraron datos del torneo');
    }
    return data as Tournament;
}