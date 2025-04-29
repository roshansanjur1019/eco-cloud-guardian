import { supabase } from './supabase';

export async function checkSupabaseConnection() {
  try {
    console.log('Checking Supabase connection...');
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('Supabase connection error:', error);
      return false;
    }

    console.log('Supabase connection successful:', {
      hasSession: !!data.session,
      url: import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set',
      key: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set'
    });
    
    return true;
  } catch (error) {
    console.error('Failed to check Supabase connection:', error);
    return false;
  }
} 