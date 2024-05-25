declare module '*.css';
declare const ENV: string | undefined;
declare const API_BASE_URL: string | undefined;
declare const BUILD_TIME: string | undefined;
declare interface Window {
  BUILD_TIME?: string;
}
