import { Avatar, Badge, DropdownMenu, IconButton } from '@radix-ui/themes';
import {
  IconChevronRight,
  IconDotsVertical,
  IconLogout,
  IconPencil,
} from '@tabler/icons-react';
import { useState } from 'react';

import useAuth from '@/hooks/useAuth';

const CurrentUserPage = () => {
  const { user, logout, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  if (!user || !user.email) return null;

  return (
    <>
      <div className="bg-white pt-5 px-5 relative">
        <div className="bg-blue4 absolute top-0 left-0 w-full h-20"></div>
        <Avatar
          src={user.avatar ?? undefined}
          alt={user.name ?? user.email[0].toUpperCase()}
          fallback={user.email[0].toUpperCase()}
          className="w-28 h-28 [--avatar-fallback-one-letter-font-size:2.5rem] rounded-full bg-blue2 relative"
        />
      </div>
      <div className="flex items-center gap-2 px-5 py-3 sticky top-0 bg-white">
        <span className="font-semibold text-xl">{user.name ?? ''}</span>
        <Badge size={'3'} className="rounded-xl">
          Rank
        </Badge>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger
            disabled={isEditing}
            className="disabled:opacity-50"
          >
            <IconButton
              variant="ghost"
              className="rounded-xl ml-auto cursor-pointer"
            >
              <IconDotsVertical size={20} className="text-gray12" />
            </IconButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            align="end"
            variant="soft"
            side="bottom"
            className="rounded-xl shadow-lg min-w-40"
          >
            <DropdownMenu.Item
              className="text-sm flex items-center cursor-pointer"
              asChild
              onClick={() => setIsEditing(true)}
            >
              <button>
                <IconPencil size={16} className="mr-2" />
                edit
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              className="text-sm flex items-center cursor-pointer"
              color="red"
              asChild
              onClick={logout}
              disabled={loading}
            >
              <button>
                <IconLogout size={16} className="mr-2" />
                log out
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <section className="grid grid-cols-1 sm:grid-cols-2 p-5">
        <div className="rounded-xl p-3 bg-white col-span-2 sm:col-span-1 transition flex flex-col gap-4 cursor-pointer">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-lg">achievements</h3>
            <button className="flex items-center gap-2">
              4 / 67
              <IconChevronRight size={18} />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div className="rounded-lg bg-blue2 w-full aspect-square"></div>
            <div className="rounded-lg bg-blue2 w-full aspect-square"></div>
            <div className="rounded-lg bg-blue2 w-full aspect-square"></div>
            <div className="rounded-lg bg-blue3 w-full aspect-square"></div>
          </div>
        </div>
        <div className="h-[200lvh]"></div>
      </section>
    </>
  );
};

export default CurrentUserPage;
