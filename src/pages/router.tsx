import { createBrowserRouter } from 'react-router-dom';

import Authenticated from '@/components/Authenticated';

import LoginPage from './auth';
import ErrorPage from './error';
import HomePage from './home';
import routes from './routes';

const router = createBrowserRouter([
  {
    // No path
    // Global error boundary
    errorElement: <ErrorPage />,
    children: [
      {
        path: routes.HOME,
        element: (
          <Authenticated>
            <HomePage />
          </Authenticated>
        ),
        children: [
          {
            path: routes.ME,
            element: <div>Me</div>,
          },
          {
            path: routes.GOALS,
            element: <div>Goals</div>,
          },
          {
            path: routes.NEW,
            element: <div>New</div>,
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
