import { Button, Dialog, TextField } from '@radix-ui/themes';
import { IconLoader } from '@tabler/icons-react';
import { useRef, useState } from 'react';

import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/cn';
import supabase from '@/lib/supabase';

const NewUserForm: React.FC = () => {
  const nameRef = useRef('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { setUser, user, loading } = useAuth();

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

  return (
    <Dialog.Root open={!!user && !user.name && !loading}>
      <Dialog.Content className="fixed inset-0 rounded-none max-w-full flex flex-col justify-center data-[state='open']:animate-in data-[state='closed']:animate-out data-[state='open']:fade-in-80 data-[state='closed']:fade-out-80 data-[state='open']:zoom-in-105 data-[state='closed']:zoom-out-105">
        <div className="max-w-3xl mx-auto">
          <Dialog.Title className="mb-1 text-2xl">
            Welcome to Readme
          </Dialog.Title>
          <Dialog.Description>
            Let's get started by setting up your profile
          </Dialog.Description>
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
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default NewUserForm;
