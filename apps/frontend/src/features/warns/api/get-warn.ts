import { httpClient } from '../../../services/http-client';
import { WarnDto } from '../dtos';

export const getWarn = async (id: string) => {
  return httpClient.get<WarnDto>(`/v1/alerts/${id}`).then((res) => res.data);
};
