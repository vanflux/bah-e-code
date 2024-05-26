import { ApiProperty } from '@nestjs/swagger';
import { Supply } from 'src/database/models/supply.model';
import { SupplyCategoryDto } from './supply-category.dto';

export class SupplyDto {
  @ApiProperty()
  supplyId!: string;

  @ApiProperty()
  supplyCategoryId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  supplyCategory?: SupplyCategoryDto;

  static fromModel(supply: Supply): SupplyDto {
    return {
      supplyId: supply.supplyId,
      supplyCategoryId: supply.supplyCategoryId,
      name: supply.name,
      supplyCategory: supply.supplyCategory ? SupplyCategoryDto.fromModel(supply.supplyCategory) : undefined,
    };
  }
}
