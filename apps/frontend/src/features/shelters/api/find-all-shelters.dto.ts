import { Page } from '../../../dtos/page';
import { httpClient } from '../../../services/http-client';
import { ShelterDto } from '../dtos';
import { FindAllSheltersDto } from '../dtos/find-all-shelters.dto';

export async function findAllShelters(body: FindAllSheltersDto) {
  return httpClient.get<Page<ShelterDto>>('/v1/shelters', { params: body }).then((res) => res.data);
}
