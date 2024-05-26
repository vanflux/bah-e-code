import { ApiProperty } from '@nestjs/swagger';
import { SupplyCategory } from 'src/database/models/supply-category.model';

export class SupplyCategoryDto {
  @ApiProperty()
  supplyCategoryId!: string;

  @ApiProperty()
  name!: string;

  static fromModel(supply: SupplyCategory): SupplyCategoryDto {
    return {
      supplyCategoryId: supply.supplyCategoryId,
      name: supply.name,
    };
  }
}
