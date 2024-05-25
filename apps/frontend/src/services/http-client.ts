import axios from 'axios';

const port = 4000;
const baseURL = API_BASE_URL ?? `${location.protocol}//${location.hostname}:${port}`;

export const httpClient = axios.create({
  baseURL,
});

httpClient.interceptors.request.use((request) => request);
