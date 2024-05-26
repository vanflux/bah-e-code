import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/layouts/components';
import { HomePage } from '../pages/home';
import { NotFoundPage } from '../pages/not-found';
import { ShelterListPage } from '../pages/shelter-list';
import { routes } from './routes';
import WarnPage from '../pages/warn';
import { WarnList } from '../pages/warn-list/indes';

export function Router() {
  const router = useMemo(() => {
    return createBrowserRouter([
      {
        element: <Layout />,
        children: [{ path: routes.HOME(), element: <HomePage /> }],
      },
      {
        element: <Layout />,
        children: [{ path: routes.SHELTERS(), element: <ShelterListPage /> }],
      },
      {
        element: <Layout />,
        children: [{ path: '/alertas', element: <WarnList /> }],
      },
      {
        element: <Layout />,
        children: [{ path: '/alertas/:warnId', element: <WarnPage /> }],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ]);
  }, []);
  return <RouterProvider router={router} />;
}
