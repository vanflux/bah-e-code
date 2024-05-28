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
  alertValue?: number;

  @ApiProperty()
  floodValue?: number;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  static fromModel(river: River): RiverDto {
    return {
      riverId: river.riverId,
      name: river.name,
      city: river.city,
      alertValue: river.alertValue ?? undefined,
      floodValue: river.floodValue ?? undefined,
      createdAt: river.createdAt.toISOString(),
      updatedAt: river.updatedAt.toISOString(),
    };
  }
}
