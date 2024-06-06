/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, json } from 'react-router-dom';

import App from '@/App';
import Authenticated from '@/components/Authenticated';
import RootLayout from '@/components/Layout/RootLayout';
import { getUserById } from '@/services/user';

import ErrorPage from './error';
import routes from './routes';

const router = createBrowserRouter([
  {
    // Providers
    element: <App />,
    // Global error boundary
    errorElement: <ErrorPage />,
    children: [
      {
        element: (
          <Authenticated>
            <RootLayout />
          </Authenticated>
        ),
        children: [
          {
            path: routes.HOME,
            lazy: async () => {
              const Component = await import('@/pages/home');
              return {
                Component: Component.default,
              };
            },
          },
          {
            path: routes.USER,
            lazy: async () => {
              const Component = await import('@/pages/user');
              return {
                Component: Component.default,
              };
            },
            loader: async ({ params }) => {
              const { id } = params;
              if (!id) throw new Response('missing user ID', { status: 404 });
              const user = await getUserById(id);
              if (!user) throw new Response('user not found', { status: 404 });
              return json(user.data);
            },
          },
          {
            path: routes.CURRENT_USER,
            lazy: async () => {
              const Component = await import('@/pages/current-user');
              return {
                Component: Component.default,
              };
            },
          },
          {
            path: routes.GOALS,
            element: <div>Goals</div>,
          },
          {
            path: routes.BOOKS,
            element: <div>Books</div>,
          },
          {
            path: routes.NEW_USER,
            lazy: async () => {
              const Component = await import('@/pages/new-user');
              return {
                Component: Component.default,
              };
            },
          },
        ],
      },
      // Does not use Authenticated and RootLayout
      {
        path: routes.AUTH,
        lazy: async () => {
          const Component = await import('@/pages/auth');
          return {
            Component: Component.default,
          };
        },
      },
    ],
  },
]);

export default router;
