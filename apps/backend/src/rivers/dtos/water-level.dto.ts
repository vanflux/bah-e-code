import { ApiProperty } from '@nestjs/swagger';
import { WaterLevel } from 'src/database/models/water-level.model';

export class WaterLevelDto {
  @ApiProperty()
  date!: string;

  @ApiProperty()
  value!: number;

  static fromModel(waterLevel: WaterLevel): WaterLevelDto {
    return {
      date: waterLevel.date.toISOString(),
      value: waterLevel.value,
    };
  }
}
