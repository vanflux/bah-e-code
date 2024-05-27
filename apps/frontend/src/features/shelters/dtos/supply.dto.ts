import { SupplyCategoryDto } from './supply-category.dto';

export interface SupplyDto {
  supplyId: string;
  supplyCategoryId: string;
  name: string;
  supplyCategory: SupplyCategoryDto;
}
