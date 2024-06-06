import { Button, TextField } from '@radix-ui/themes';
import { IconLoader } from '@tabler/icons-react';
import { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import supabase from '@/lib/supabase';

import routes from '../routes';

const NewUserPage: React.FC = () => {
  const nameRef = useRef('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { setUser, user } = useAuth();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const trimmedName = nameRef.current.trim();
    if (!trimmedName) {
      setError('Name cannot be empty');
      return;
    }
    if (!trimmedName.match(/^[A-Za-z]+( {0,1}[A-Za-z]+)*$/g)) {
      setError('Name can only contain letters and spaces');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: trimmedName,
        })
        .eq('id', user.id);
      if (error) throw error;
      setUser({
        ...user,
        name: trimmedName,
      });
    } catch (error: any) {
      setError(error.message ?? 'Failed to update user');
    }
    setSubmitting(false);
  };

  if (user && user.name) {
    return <Navigate to={routes.HOME} />;
  }

  return (
    <div className="fixed inset-0 bg-white z-10 flex items-center justify-center">
      <div className="max-w-sm mx-auto">
        <h1 className="mb-1 text-2xl font-medium">Welcome to Readme</h1>
        <h2>Let's get started by setting up your profile</h2>
        <form className="w-full mt-12" onSubmit={onSubmit}>
          <label>
            <p className="mb-2 font-medium">How should we call you?</p>
            <TextField.Root
              placeholder="Awesome Name"
              onChange={(e) => {
                nameRef.current = e.target.value;
              }}
              className={cn(error && 'outline-red-500 ring-red-500 ring-1')}
            />
            {error && (
              <p className="text-red-500 font-light text-sm mt-1">{error}</p>
            )}
          </label>
          <Button className="w-full mt-4" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <IconLoader className="animate-spin" />
                Getting ready
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewUserPage;
