import { Avatar } from '@radix-ui/themes';
import { useLoaderData } from 'react-router-dom';

import { User } from '@/types/user';

const UserPage = () => {
  const user = useLoaderData() as User;

  if (!user || !user.email) return null;

  return (
    <>
      <main className="p-5 flex flex-col gap-5 items-center">
        <Avatar
          src={user.avatar ?? undefined}
          alt={user.name ?? user.email[0].toUpperCase()}
          fallback={user.email[0].toUpperCase()}
          className="w-28 h-28 [--avatar-fallback-one-letter-font-size:2.5rem] rounded-full"
        />
        <div className="grid sm:grid-cols-2 gap-5">
          <p>
            <span className="text-sm font-medium">email</span>
            <span className="block">{user.email}</span>
          </p>
          <p>
            <span className="text-sm font-medium">name</span>
            <span className="block">{user.name ?? ''}</span>
          </p>
        </div>
      </main>
    </>
  );
};

export default UserPage;
