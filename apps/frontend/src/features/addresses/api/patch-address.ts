import { httpClient } from '../../../services/http-client';
import { AddressFormData } from '../components/address-form';
import { AddressDto } from '../dtos';

export async function patchAddress(id: string, body: AddressFormData) {
  return httpClient.patch<AddressDto[]>(`/v1/addresses/${id}`, body).then((res) => res.data);
}
