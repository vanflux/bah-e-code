export const routes = {
  HOME: () => '/',
  SHELTERS: () => '/abrigos',
  MY_ADDRESSES: () => '/enderecos',
  WARNS: () => `/alertas`,
  WARN: (warnId: string) => `/alertas/${warnId}`,
};
