import { ApiProperty } from '@nestjs/swagger';
import { River } from 'src/database/models/rivers.model';

export class RiverDto {
  @ApiProperty()
  riverId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  severeFloodValue?: number;

  @ApiProperty()
  floodValue?: number;

  @ApiProperty()
  alertValue?: number;

  @ApiProperty()
  attentionValue?: number;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  static fromModel(river: River): RiverDto {
    return {
      riverId: river.riverId,
      name: river.name,
      city: river.city,
      severeFloodValue: river.severeFloodValue ?? undefined,
      floodValue: river.floodValue ?? undefined,
      alertValue: river.alertValue ?? undefined,
      attentionValue: river.attentionValue ?? undefined,
      createdAt: river.createdAt.toISOString(),
      updatedAt: river.updatedAt.toISOString(),
    };
  }
}
