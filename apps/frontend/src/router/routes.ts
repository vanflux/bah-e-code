import { VolunteerIcon } from '../components/icons/types/volunteer';

export const routes = {
  HOME: () => '/',
  SHELTERS: () => '/abrigos',
  SHELTER: (shelterId: string) => `/abrigo/${shelterId}`,
  MY_ADDRESSES: () => '/enderecos',
  WARNS: () => `/alertas`,
  WARN: (warnId: string) => `/alertas/${warnId}`,
  NOTIFICATIONS: () => '/notificacoes',
  VOLUNTEERS: () => `/voluntarios`,
  DONATIONS: () => '/doacoes',
};
