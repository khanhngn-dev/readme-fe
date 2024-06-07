import {
  IconBook,
  IconCircleDashedCheck,
  IconHome,
  IconUser,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { cn } from '@/lib/cn';
import routes from '@/pages/routes';

import NavbarAction from './NavbarAction';

type NavbarItem = {
  children: ({
    isActive,
    href,
  }: {
    isActive: boolean;
    href: string;
  }) => JSX.Element;
  href: string;
  name: string;
};

const NavbarLink = ({
  href,
  isActive,
  children,
}: {
  href: string;
  isActive: boolean;
  children?: React.ReactNode;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        'flex-1 flex items-center justify-center transition-colors hover:bg-blue9/20',
        isActive && 'text-blue9',
      )}
    >
      {children}
    </Link>
  );
};

const NavbarItems: NavbarItem[] = [
  {
    children: ({ isActive, href }) => (
      <NavbarLink href={href} isActive={isActive}>
        <IconHome size={24} />
      </NavbarLink>
    ),
    href: routes.HOME,
    name: 'Home',
  },
  {
    children: ({ href, isActive }) => (
      <NavbarLink href={href} isActive={isActive}>
        <IconCircleDashedCheck size={24} />
      </NavbarLink>
    ),
    href: routes.GOALS,
    name: 'Goals',
  },
  {
    children: NavbarAction,
    href: '#',
    name: 'Action',
  },
  {
    children: ({ href, isActive }) => (
      <NavbarLink href={href} isActive={isActive}>
        <IconBook size={24} />
      </NavbarLink>
    ),
    href: routes.BOOKS,
    name: 'Books',
  },
  {
    children: ({ href, isActive }) => (
      <NavbarLink href={href} isActive={isActive}>
        <IconUser size={24} />
      </NavbarLink>
    ),
    href: routes.CURRENT_USER,
    name: 'Profile',
  },
];

const Navbar = () => {
  const location = useLocation();
  const activeIndex = NavbarItems.findIndex(
    ({ href }) =>
      (href !== '/' && location.pathname.startsWith(href)) ||
      href === location.pathname,
  );
  const [hide, setHide] = useState(false);

  useEffect(() => {
    let prevScrollY = document.documentElement.scrollTop;

    const onScroll = (e: Event) => {
      const target = e.target as Document;
      const currentScrollY = target.documentElement.scrollTop;

      // Reached bottom show navbar
      if (
        currentScrollY + window.innerHeight >=
        target.documentElement.scrollHeight - 12 // bottom padding
      ) {
        setHide(false);
        return;
      }
      // Hide navbar when scrolling down more than 50px compared to the previous scroll
      if (currentScrollY > prevScrollY + 100) {
        setHide(true);
        prevScrollY = currentScrollY;
        return;
      }
      // Immediately show navbar when scrolling up
      if (currentScrollY < prevScrollY) {
        setHide(false);
        prevScrollY = currentScrollY;
      }
    };

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed bottom-0 max-w-3xl h-navbar w-full flex items-center transition-transform p-3',
        hide && 'translate-y-full',
      )}
    >
      <div className="flex items-stretch w-full justify-center bg-white/40 backdrop-blur rounded-xl overflow-clip shadow h-12">
        {NavbarItems.map(({ href, children: Children, name }, index) => {
          return (
            <Children key={name} isActive={activeIndex === index} href={href} />
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
