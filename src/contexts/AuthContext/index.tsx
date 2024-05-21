import { User } from '@supabase/supabase-js';
import { createContext, useEffect, useState } from 'react';

import useToast from '@/hooks/useToast';
import supabase from '@/lib/supabase';

type AuthContextType = {
  user: User | null;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  });
  const { toast: showToast } = useToast();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();
        if (error) {
          throw error;
        }

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error: any) {
        console.error('Failed to load user:', error.message);
        setUser(null);
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const user = session?.user ?? null;
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    });

    loadUser();

    return () => {
      subscription.unsubscribe();
    };
  }, [showToast]);

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
