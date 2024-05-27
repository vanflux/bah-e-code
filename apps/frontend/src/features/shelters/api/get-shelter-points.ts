import { httpClient } from '../../../services/http-client';
import { ShelterPointDto } from '../dtos';

export const getShelterPoints = async () => {
  return httpClient.get<ShelterPointDto[]>(`/v1/shelters/points`).then((res) => res.data);
};
