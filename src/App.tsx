import { RouterProvider } from 'react-router-dom';

import AuthProvider from './contexts/AuthContext';
import ThemeProvider from './contexts/ThemeContext';
import ToastProvider from './contexts/ToastContext';
import router from './pages/router';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
