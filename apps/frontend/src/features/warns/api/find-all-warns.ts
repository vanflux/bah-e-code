import { httpClient } from '../../../services/http-client';
import { BasicWarnDto } from '../dtos';

export const findAllWarns = async () => {
  return httpClient.get<BasicWarnDto[]>('/v1/alerts').then((res) => res.data);
};
