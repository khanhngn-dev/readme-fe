import { DropdownMenu } from '@radix-ui/themes';
import {
  IconBook,
  IconCircleDashedCheck,
  IconPlayerPause,
  IconPlayerPlay,
  IconPlus,
} from '@tabler/icons-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import usePomodoro from '@/hooks/usePomodoro';
import { cn } from '@/lib/cn';
import routes from '@/pages/routes';

const NavbarAction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { startTimer, timerState, stopTimer } = usePomodoro();
  const isRunning = timerState === 'running';

  return (
    <DropdownMenu.Root
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) setIsOpen(v);
      }}
    >
      <DropdownMenu.Trigger className="flex-1 flex items-center justify-center transition-colors hover:bg-blue9/20 cursor-pointer">
        <a
          onClick={() => {
            setIsOpen((prev) => !prev);
          }}
        >
          <div className="bg-blue9 text-white p-2 w-10 h-10 rounded-xl">
            <IconPlus
              size={24}
              className={cn(
                'transition-transform',
                isOpen && 'rotate-[135deg]',
              )}
            />
          </div>
        </a>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        sideOffset={12}
        align="center"
        color="blue"
        variant="soft"
        className="min-w-40"
      >
        <DropdownMenu.Item
          className="flex items-center gap-2 cursor-pointer py-2 h-auto text-base"
          asChild
        >
          <button onClick={isRunning ? stopTimer : startTimer}>
            {isRunning ? (
              <IconPlayerPause size={24} />
            ) : (
              <IconPlayerPlay size={24} />
            )}
            {isRunning ? 'stop timer' : 'start timer'}
          </button>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="flex items-center gap-2 cursor-pointer py-2 h-auto text-base"
          asChild
        >
          <Link to={routes.CREATE.BOOK}>
            <IconBook size={24} />
            start a new book
          </Link>
        </DropdownMenu.Item>
        <DropdownMenu.Item
          className="flex items-center gap-2 cursor-pointer py-2 h-auto text-base"
          asChild
        >
          <Link to={routes.CREATE.GOAL}>
            <IconCircleDashedCheck size={24} />
            goal
          </Link>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default NavbarAction;
