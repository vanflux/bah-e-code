import { SupplyCategory } from 'src/database/models/supply-category.model';

export interface SosRsSupply {
  id: string;
  supplyCategoryId: string;
  supplyCategory?: SupplyCategory;
  name: string;
  createdAt: string;
  updatedAt?: string;
}
