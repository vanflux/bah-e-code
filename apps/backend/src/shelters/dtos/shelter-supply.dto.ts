import { ApiProperty } from '@nestjs/swagger';
import { SupplyDto } from './supply.dto';
import { ShelterSupply } from 'src/database/models/shelter-supply.model';

export class ShelterSupplyDto {
  @ApiProperty()
  shelterSupplyId!: string;

  @ApiProperty()
  shelterId!: string;

  @ApiProperty()
  supplyId!: string;

  @ApiProperty()
  priority!: number;

  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  supply?: SupplyDto;

  static fromModel(shelterSupply: ShelterSupply): ShelterSupplyDto {
    return {
      shelterSupplyId: shelterSupply.shelterSupplyId,
      shelterId: shelterSupply.shelterId,
      supplyId: shelterSupply.supplyId,
      priority: shelterSupply.priority,
      quantity: shelterSupply.quantity ?? undefined,
      supply: shelterSupply.supply ? SupplyDto.fromModel(shelterSupply.supply) : undefined,
    };
  }
}
