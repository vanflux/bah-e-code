import { Page } from '../../../dtos/page';
import { httpClient } from '../../../services/http-client';
import { ShelterDto } from '../dtos';
import { GetSheltersToReceiveDonationsDto } from '../dtos/get-shelters-to-receive-donations.dto';

export async function getSheltersToReceiveDonations({ id, ...body }: GetSheltersToReceiveDonationsDto) {
  return httpClient.get<Page<ShelterDto>>(`/v1/shelters/${id}/shelters-to-receive-donations`, { params: body }).then((res) => res.data);
}
