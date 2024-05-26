import { httpClient } from '../../../services/http-client';
import { AddressDto, CreateAddressDto } from '../dtos';

export async function createAddress(body: CreateAddressDto) {
  return httpClient.post<AddressDto>('/v1/addresses', body).then((res) => res.data);
}
