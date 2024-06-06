import supabase from '@/lib/supabase';

export const getUserById = (id: string) => {
  return supabase.from('users').select().eq('id', id).single();
};
