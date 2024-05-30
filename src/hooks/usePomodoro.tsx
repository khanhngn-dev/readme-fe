import { useContext } from 'react';

import { PomodoroContext } from '@/contexts/PomodoroContext';

const usePomodoro = () => {
  return useContext(PomodoroContext);
};

export default usePomodoro;
