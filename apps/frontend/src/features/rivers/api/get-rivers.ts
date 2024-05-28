import { httpClient } from '../../../services/http-client';
import { RiverDto } from '../dtos';

export const getRivers = async () => {
  return httpClient.get<RiverDto[]>('/v1/rivers').then((res) => res.data);
};
