import { IconAlarm, IconBeach, IconDeviceGamepad } from '@tabler/icons-react';
import { createContext, useEffect, useRef, useState } from 'react';

import useAuth from '@/hooks/useAuth';
import useToast from '@/hooks/useToast';
import { noop } from '@/lib/common';

import PomodoroClock from './PomodoroClock';

export type PomodoroState = 'pomodoro' | 'shortBreak' | 'longBreak';
export type TimerState = 'running' | 'paused' | 'idle';

type PomodoroSettings = {
  interval: number;
} & Record<PomodoroState, number>;

type PomodoroContextType = {
  countdown: number;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  timerState: TimerState;
  pomodoroState: PomodoroState;
  updateSetting: (settings: PomodoroSettings) => void;
  settings: PomodoroSettings;
};

export const PomodoroContext = createContext<PomodoroContextType>({
  countdown: 0,
  pomodoroState: 'pomodoro',
  resetTimer: noop,
  startTimer: noop,
  stopTimer: noop,
  timerState: 'paused',
  settings: {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    interval: 4,
  },
  updateSetting: noop,
});

type PomodoroProviderProps = {
  children: React.ReactNode;
};

const PomodoroProvider: React.FC<PomodoroProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<PomodoroSettings>({
    pomodoro: 10,
    shortBreak: 5,
    longBreak: 15,
    interval: 4,
  });
  const [pomodoroState, setPomodoroState] = useState<PomodoroState>('pomodoro');
  const [countdown, setCountdown] = useState(settings[pomodoroState]);
  const [timerState, setTimerState] = useState<TimerState>('idle');

  const countdownRef = useRef<NodeJS.Timeout | null>(null);
  const interval = useRef(0);

  const { user } = useAuth();
  const { toast } = useToast();

  const startTimer = () => {
    if (timerState === 'running') {
      toast({
        title: 'Timer is already running',
        description: 'Please stop the timer before starting again',
      });
      return;
    }

    setTimerState('running');
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
  };

  const stopTimer = () => {
    setTimerState('paused');
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const resetTimer = () => {
    setTimerState('idle');
    setCountdown(settings[pomodoroState]);
    if (countdownRef.current) clearInterval(countdownRef.current);
  };

  const updateSetting = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
  };

  useEffect(() => {
    const countdown = countdownRef.current;
    return () => {
      if (countdown) clearInterval(countdown);
    };
  }, []);

  useEffect(() => {
    if (countdown > 0) return;

    // Stop timer if countdown reaches 0
    stopTimer();

    // Switch to break if current state is pomodoro
    if (pomodoroState === 'pomodoro') {
      const shouldLongBreak = interval.current >= settings.interval;

      // If interval is reached, switch to long break
      const nextState = shouldLongBreak ? 'longBreak' : 'shortBreak';
      interval.current = shouldLongBreak ? 0 : interval.current + 1;
      toast({
        title: `Time to take a ${shouldLongBreak ? 'long' : 'short'} break`,
        icon: shouldLongBreak ? (
          <IconBeach size={22} />
        ) : (
          <IconDeviceGamepad size={22} />
        ),
      });

      setPomodoroState(nextState);
      setCountdown(settings[nextState]);
      return;
    }

    // Switch to pomodoro if current state is break
    setPomodoroState('pomodoro');
    setCountdown(settings.pomodoro);
    toast({
      title: 'Time to get back to work',
      icon: <IconAlarm size={22} />,
    });
  }, [countdown, settings, pomodoroState, toast]);

  return (
    <PomodoroContext.Provider
      value={{
        countdown,
        pomodoroState,
        resetTimer,
        settings,
        startTimer,
        stopTimer,
        timerState,
        updateSetting,
      }}
    >
      {children}
      {user && timerState !== 'idle' ? <PomodoroClock /> : null}
    </PomodoroContext.Provider>
  );
};

export default PomodoroProvider;
