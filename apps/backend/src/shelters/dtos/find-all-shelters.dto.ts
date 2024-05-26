import { ApiProperty } from '@nestjs/swagger';

export class FindAllSheltersDto {
  @ApiProperty({ example: '-30.0623313' })
  latitude!: number;

  @ApiProperty({ example: '-51.1745819' })
  longitude!: number;

  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  perPage?: number;
}
