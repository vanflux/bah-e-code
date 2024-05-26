import { ApiProperty } from '@nestjs/swagger';

export class GetSheltersToSendDonationsDto {
  shelterId!: string;

  @ApiProperty({ required: false })
  page?: number;

  @ApiProperty({ required: false })
  perPage?: number;
}
