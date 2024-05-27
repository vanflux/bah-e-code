import { httpClient } from '../../../services/http-client';
import { SupplyCategoryDto } from '../dtos';

export const getSupplyCategories = async () => {
  return httpClient.get<SupplyCategoryDto[]>('/v1/shelters/supply-categories').then((res) => res.data);
};
