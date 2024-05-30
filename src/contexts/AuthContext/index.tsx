import { IconLoader } from '@tabler/icons-react';
import { createContext, useCallback, useEffect, useState } from 'react';

import { cn } from '@/lib/cn';
import { noop } from '@/lib/common';
import supabase from '@/lib/supabase';
import { User } from '@/types/user';

import NewUserForm from './NewUserForm';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: noop,
  logout: noop,
  loading: true,
});

type AuthContextProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(() => {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    // Get user data from the database
    const getUserData = async (id: string) => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select()
          .eq('id', id);
        if (error || data.length === 0) {
          throw error || new Error('User not found');
        }

        const [user] = data;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error: any) {
        console.error('Failed to load user:', error.message);
        setUser(null);
        localStorage.removeItem('user');
      }
    };

    // Get the latest user session
    // Can be trusted
    const loadUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setUser(null);
        setLoading(false);
        localStorage.removeItem('user');
        return;
      }
      await getUserData(data.user.id);
      setLoading(false);
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user;
      if (!user) {
        setUser(null);
        localStorage.removeItem('user');
        return;
      }
      getUserData(user.id);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      setUser(null);
      localStorage.removeItem('user');
      await supabase.auth.signOut();
    } catch (error) {
      // Ignore error
    }
    setLoading(false);
  }, []);

  if (loading)
    return (
      <div
        className={cn(
          'fixed inset-0 bg-white flex items-center justify-center',
        )}
      >
        <IconLoader size={40} className="animate-spin" />
      </div>
    );

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
      <NewUserForm />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
