import { supabase } from '../supabaseClient';
import { UserDashboard, UserData } from '../types/Users';

export default () => {
    return {
        fetchUsernameAndShortId,
        fetchAllUsers,
        fetchUserbyShortId,
    };
}

async function fetchUsernameAndShortId(userId: string): Promise<UserDashboard> {
    const { data, error } = await supabase
        .from('users')
        .select('username, short_id')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error al obtener los datos del usuario:', error.message);
        throw error;
    }

    if (!data) {
        throw new Error('No se encontraron datos del usuario');
    }
    return data as UserDashboard;
}

async function fetchAllUsers(): Promise<UserData[]> {
    const { data, error } = await supabase
    .from('users')
    .select('*');

    if (error) {
        console.error('Error al obtener todos los usuarios:', error.message);
        throw error;
    }

    return data as UserData[];
}

async function fetchUserbyShortId(userId: string): Promise<UserData> {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

    if (error) {
        console.error('Error al obtener los datos del usuario:', error.message);
        throw error;
    }

    if (!data) {
        throw new Error('No se encontraron datos del usuario');
    }
    return data as UserData;
}