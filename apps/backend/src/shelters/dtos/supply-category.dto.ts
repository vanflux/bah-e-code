import { ApiProperty } from '@nestjs/swagger';
import { SupplyCategory } from 'src/database/models/supply-category.model';

export class SupplyCategoryDto {
  @ApiProperty()
  supplyCategoryId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  icon?: string;

  static fromModel(supplyCategory: SupplyCategory): SupplyCategoryDto {
    return {
      supplyCategoryId: supplyCategory.supplyCategoryId,
      name: supplyCategory.name,
      icon: supplyCategory.icon ?? undefined,
    };
  }
}
