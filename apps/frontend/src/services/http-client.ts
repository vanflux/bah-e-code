import axios from 'axios';
import { getAuthToken } from './auth';

const port = 4000;
const baseURL = 'https://api-bc.vanflux.dev/v1';

export const httpClient = axios.create({
  baseURL,
});

httpClient.interceptors.request.use((request) => {
  request.headers.Authorization = getAuthToken();
  return request;
});
