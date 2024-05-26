import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/layouts/components';
import { HomePage } from '../pages/home';
import { NotFoundPage } from '../pages/not-found';
import { ShelterListPage } from '../pages/shelter-list';
import { routes } from './routes';
import { WarnList } from '../pages/warn-list/indes';
import { WarnPage } from '../pages/warn';

export function Router() {
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        element: <Layout />,
        children: [
          { path: routes.HOME(), element: <HomePage /> },
          { path: routes.SHELTERS(), element: <ShelterListPage /> },
          { path: routes.WARNS(), element: <WarnList /> },
          { path: routes.WARN(':warnId'), element: <WarnPage /> },

        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]);
  }, []);
  return <RouterProvider router={router} />;
}
