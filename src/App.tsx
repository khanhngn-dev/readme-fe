import { Outlet } from 'react-router-dom';

import AuthProvider from './contexts/AuthContext';
import ToastProvider from './contexts/ToastContext';
import './index.css';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
