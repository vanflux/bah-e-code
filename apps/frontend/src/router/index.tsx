import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { NotFoundPage } from '../pages/not-found';
import { Layout } from '../components/layouts/components';
import { useMemo } from 'react';
import { HomePage } from '../pages/home';

export function Router() {
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        element: <Layout />,
        children: [{ path: routes.HOME(), element: <HomePage /> }],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]);
  }, []);
  return <RouterProvider router={router} />;
}
