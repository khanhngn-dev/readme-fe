import { IconLoader } from '@tabler/icons-react';
import { createContext, useCallback, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { cn } from '@/lib/cn';
import { noop } from '@/lib/common';
import supabase from '@/lib/supabase';
import routes from '@/pages/routes';
import { getUserById } from '@/services/user';
import { User } from '@/types/user';

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

  const location = useLocation();

  useEffect(() => {
    // Get user data from the database
    const getUserData = async (id: string) => {
      try {
        const { data: user, error } = await getUserById(id);
        if (error || !user) {
          throw error || new Error('user not found');
        }

        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
      } catch (error: any) {
        console.error('failed to load user:', error.message);
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

  if (user && !user.name && location.pathname !== routes.NEW_USER) {
    return <Navigate to={routes.NEW_USER} replace={true} />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
