import { IconBook, IconCheck, IconHome, IconPlus } from '@tabler/icons-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import User from '@/components/User';
import useAuth from '@/hooks/useAuth';
import { cn } from '@/lib/cn';

import routes from '../routes';

const NavbarItems = [
  {
    icon: <IconHome size={24} />,
    href: routes.HOME,
  },
  {
    icon: <IconCheck size={24} />,
    href: routes.GOALS,
  },
  {
    icon: (
      <IconPlus
        size={24}
        className="bg-blue8 text-white p-2 w-10 h-10 rounded-xl"
      />
    ),
    href: routes.NEW,
  },
  {
    icon: <IconBook size={24} />,
    href: routes.BOOKS,
  },
  {
    icon: <User />,
    href: routes.ME,
  },
];

const HomePage = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;
  return (
    <div className="max-w-3xl mx-auto min-h-lvh pb-14">
      <Outlet />
      <div className="fixed bottom-0 max-w-3xl h-14 flex items-stretch w-full bg-white rounded-t-xl border-[0.5px] border-black/10 justify-center ">
        {NavbarItems.map(({ href, icon }) => {
          const isActive = location.pathname === href;
          return (
            <Link
              key={href}
              to={href}
              className={cn(
                'flex-1 flex items-center justify-center transition-colors',
                isActive && 'text-blue8',
              )}
            >
              {icon}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
