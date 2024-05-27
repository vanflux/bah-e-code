import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindAllSheltersDto {
  @ApiProperty({ example: '-30.0623313' })
  latitude!: number;

  @ApiProperty({ example: '-51.1745819' })
  longitude!: number;

  @ApiProperty({ required: false })
  search?: string;

  @ApiProperty({ required: false })
  @Transform(({ value }) => (value != null ? value === 'true' : undefined))
  needVolunteers?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => (value != null ? value === 'true' : undefined))
  needPsico?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => (value != null ? value === 'true' : undefined))
  petFriendly?: boolean;

  @ApiProperty({ required: false })
  supplyCategoryId?: string;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  perPage?: number;
}
