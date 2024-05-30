import { Outlet } from 'react-router-dom';

import AuthProvider from './contexts/AuthContext';
import PomodoroProvider from './contexts/PomodoroContext';
import ThemeProvider from './contexts/ThemeContext';
import ToastProvider from './contexts/ToastContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <PomodoroProvider>
            <Outlet />
          </PomodoroProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
