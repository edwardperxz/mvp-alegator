import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://oicbcenosebcuhgjtzcb.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pY2JjZW5vc2ViY3VoZ2p0emNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA5OTA3MTAsImV4cCI6MjA0NjU2NjcxMH0.DI5XuVTqMfi5HJHL33T4jZJ11f9N-8StKF2BVf7i9p8';

export const supabase = createClient(supabaseUrl, supabaseKey);

