export const routes = {
  HOME: () => '/',
  SHELTERS: () => '/abrigos',
  SHELTERS_TO_SEND_DOTATIONS: (shelterId: string) => `/abrigo/${shelterId}/abrigos-para-enviar-doacoes`,
  SHELTERS_TO_RECEIVE_DOTATIONS: (shelterId: string) => `/abrigo/${shelterId}/abrigos-para-receber-doacoes`,
  SHELTER: (shelterId: string) => `/abrigo/${shelterId}`,
  MY_ADDRESSES: () => '/enderecos',
  WARNS: () => `/alertas`,
  WARN: (warnId: string) => `/alertas/${warnId}`,
  NOTIFICATIONS: () => '/notificacoes',
  VOLUNTEERS: () => `/voluntarios`,
  DONATIONS: () => '/doacoes',
};
