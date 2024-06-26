export const routes = {
  HOME: () => '/',
  SHELTERS: () => '/abrigos',
  SHELTERS_NEED_DONATION_CATEGORY: (supplyCategoryId: string) => `/abrigo/precisa-de-doacoes/${supplyCategoryId}`,
  SHELTERS_NEED_VOLUNTEERS: () => `/abrigo/precisa-de-voluntarios`,
  SHELTERS_NEED_VOLUNTEERS_FOR_PET: () => `/abrigo/precisa-de-voluntarios-para-pet`,
  SHELTERS_NEED_VOLUNTEERS_FOR_PSICO: () => `/abrigo/precisa-de-psicologos`,
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
