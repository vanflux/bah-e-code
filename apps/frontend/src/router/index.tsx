import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/layouts/components';
import { HomePage } from '../pages/home';
import { NotFoundPage } from '../pages/not-found';
import { ShelterListPage } from '../pages/shelter-list';
import { routes } from './routes';
import { WarnList } from '../pages/warn-list/indes';
import { WarnPage } from '../pages/warn';
import { ShelterDetails } from '../pages/shelter-details';
import { ShelterListToSendDonationsPage } from '../pages/shelter-list-to-send-donations';
import { ShelterListToReceiveDonationsPage } from '../pages/shelter-list-to-receive-donations';
import { AddressesPage } from '../pages/addresses';
import { VolunteersPage } from '../pages/volunteers';
import { ShelterListNeedVolunteersPage } from '../pages/shelter-list-need-volunteers';
import { ShelterListNeedVolunteersForPsicoPage } from '../pages/shelter-list-need-volunteers-for-psico';
import { ShelterListNeedVolunteersForPetPage } from '../pages/shelter-list-need-volunteers-for-pet';

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
          { path: routes.SHELTER(':shelterId'), element: <ShelterDetails /> },
          { path: routes.SHELTERS_NEED_VOLUNTEERS(), element: <ShelterListNeedVolunteersPage /> },
          { path: routes.SHELTERS_NEED_VOLUNTEERS_FOR_PET(), element: <ShelterListNeedVolunteersForPetPage /> },
          { path: routes.SHELTERS_NEED_VOLUNTEERS_FOR_PSICO(), element: <ShelterListNeedVolunteersForPsicoPage /> },
          { path: routes.SHELTERS_TO_SEND_DOTATIONS(':shelterId'), element: <ShelterListToSendDonationsPage /> },
          { path: routes.SHELTERS_TO_RECEIVE_DOTATIONS(':shelterId'), element: <ShelterListToReceiveDonationsPage /> },
          { path: routes.MY_ADDRESSES(), element: <AddressesPage /> },
          { path: routes.VOLUNTEERS(), element: <VolunteersPage /> },
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
