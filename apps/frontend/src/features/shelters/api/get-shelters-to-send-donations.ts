import { Page } from '../../../dtos/page';
import { httpClient } from '../../../services/http-client';
import { ShelterDto } from '../dtos';
import { GetSheltersToSendDonationsDto } from '../dtos/get-shelters-to-send-donations.dto';

export async function getSheltersToSendDonations({ id, ...body }: GetSheltersToSendDonationsDto) {
  return httpClient.get<Page<ShelterDto>>(`/v1/shelters/${id}/shelters-to-send-donations`, { params: body }).then((res) => res.data);
}
