import { httpClient } from '../../../services/http-client';
import { FullWarn, Warn } from '../models';

export const getWarnList = async () => {
  const res: Warn[] = await httpClient.get('/alerts').then((res) => res.data);
  return res;
};

export const getWarn = async (id: string) => {
  const res: FullWarn = await httpClient.get(`/alerts/${id}`).then((res) => res.data);
  return res;
};
