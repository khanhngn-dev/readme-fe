import { Portal } from '@radix-ui/themes';
import {
  IconAlarm,
  IconBeach,
  IconDeviceGamepad,
  IconPlayerPause,
  IconPlayerPlay,
  IconProps,
  IconRefresh,
} from '@tabler/icons-react';
import { useRef, useState } from 'react';

import CircularProgress from '@/components/CircularProgress';
import useClickOutside from '@/hooks/useClickOutside.';
import usePomodoro from '@/hooks/usePomodoro';
import { cn } from '@/lib/cn';
import { toTimeString } from '@/lib/common';

import { PomodoroState } from '.';

const IconMap: Record<PomodoroState, React.FC<IconProps>> = {
  pomodoro: IconAlarm,
  shortBreak: IconDeviceGamepad,
  longBreak: IconBeach,
};

const PomodoroClock = () => {
  const [open, setOpen] = useState(false);
  const {
    pomodoroState,
    settings,
    countdown,
    timerState,
    startTimer,
    resetTimer,
    stopTimer,
  } = usePomodoro();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(containerRef, () => setOpen(false));

  const iconSize = open ? 48 : 22;

  const Icon = IconMap[pomodoroState];

  return (
    <Portal
      ref={containerRef}
      className={cn(
        'fixed max-w-3xl top-0 h-0 left-1/2 -translate-x-1/2 w-full',
      )}
      onClick={() => setOpen((prev) => !prev)}
    >
      <div
        className={cn(
          'absolute top-5 right-5 rounded-[48px] shadow-sm transition-all cursor-pointer duration-300 w-12 h-12 bg-white flex items-center justify-center flex-col space-y-0',
          open && 'rounded-xl w-40 h-60 shadow-xl space-y-2 cursor-auto',
        )}
      >
        <CircularProgress
          value={
            ((settings[pomodoroState] - countdown) / settings[pomodoroState]) *
            100
          }
          className={cn(
            'w-12 h-12 transition-all duration-300 rounded-[inherit]',
            open && 'w-28 h-28',
          )}
          classNames={{
            root: 'rounded-[inherit]',
          }}
          strokeWidth={4}
        >
          <Icon size={iconSize} className="transition-all duration-300" />
        </CircularProgress>
        <div
          className={cn(
            'h-0 overflow-clip text-lg font-medium transition-all',
            open && 'h-8',
          )}
        >
          {toTimeString(countdown)}
        </div>
        <div
          className={cn(
            'w-0 h-0 flex gap-4 items-center justify-center opacity-0 transition-all',
            open && 'w-full h-8 opacity-100',
          )}
        >
          {
            // Show refresh button only when timer is running
            timerState === 'paused' ? (
              <IconPlayerPlay
                className="opacity-80 hover:opacity-100 cursor-pointer text-blue9"
                onClick={startTimer}
              />
            ) : (
              <IconPlayerPause
                className="opacity-80 hover:opacity-100 cursor-pointer text-blue9"
                onClick={stopTimer}
              />
            )
          }
          <IconRefresh
            className="opacity-80 hover:opacity-100 cursor-pointer"
            onClick={resetTimer}
          />
        </div>
      </div>
    </Portal>
  );
};

export default PomodoroClock;
