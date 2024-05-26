import { httpClient } from '../../../services/http-client';
import { HomeImageDto } from '../dtos';

export const findHomeImages = async () => {
  return httpClient.get<HomeImageDto[]>('/v1/alerts').then((res) => res.data);
};
