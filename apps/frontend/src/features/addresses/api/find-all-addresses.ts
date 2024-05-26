import { httpClient } from '../../../services/http-client';
import { AddressDto } from '../dtos';

export async function findAllAddresses() {
  return httpClient.get<AddressDto[]>('/v1/addresses').then((res) => res.data);
}
