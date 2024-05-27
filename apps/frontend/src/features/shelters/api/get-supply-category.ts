import { httpClient } from '../../../services/http-client';
import { SupplyCategoryDto } from '../dtos';

export const getSupplyCategory = async (id: string) => {
  return httpClient.get<SupplyCategoryDto>(`/v1/shelters/supply-categories/${id}`).then((res) => res.data);
};
