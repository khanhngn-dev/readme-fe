import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import Authenticated from '@/components/Authenticated';
import RootLayout from '@/components/Layout/RootLayout';

import LoginPage from './auth';
import ErrorPage from './error';
import HomePage from './home';
import routes from './routes';

const router = createBrowserRouter([
  {
    // No path
    // Global error boundary
    errorElement: <ErrorPage />,
    element: <App />,
    children: [
      {
        path: routes.HOME,
        element: (
          <Authenticated>
            <RootLayout />
          </Authenticated>
        ),
        children: [
          {
            path: routes.HOME,
            element: <HomePage />,
          },
          {
            path: routes.ME,
            element: <div>Me</div>,
          },
          {
            path: routes.GOALS,
            element: <div>Goals</div>,
          },
          {
            path: routes.BOOKS,
            element: <div>Books</div>,
          },
        ],
      },
      {
        path: routes.AUTH,
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
