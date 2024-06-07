import { Outlet } from 'react-router-dom';

import PomodoroProvider from '@/contexts/PomodoroContext';

import Navbar from '../Navbar';

const RootLayout = () => {
  return (
    <PomodoroProvider>
      <div className="max-w-3xl mx-auto min-h-lvh pb-navbar">
        <Outlet />
        <Navbar />
      </div>
    </PomodoroProvider>
  );
};

export default RootLayout;
