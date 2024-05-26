import { ApiProperty } from '@nestjs/swagger';

export class GetSheltersToReceiveDonationsDto {
  shelterId!: string;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  perPage?: number;
}
