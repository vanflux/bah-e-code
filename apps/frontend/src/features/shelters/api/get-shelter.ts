import { httpClient } from '../../../services/http-client';
import { ShelterDto } from '../dtos';

export const getShelter = async (id: string) => {
  return httpClient.get<ShelterDto>(`/v1/shelters/${id}`).then((res) => res.data);
};
