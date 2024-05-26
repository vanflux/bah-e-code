import { ApiProperty } from '@nestjs/swagger';

export class UpdateAddressDto {
  addressId!: string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  neighbourhood?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  streetNumber?: string;

  @ApiProperty()
  zipCode?: string;

  @ApiProperty()
  alertsEnabled?: boolean;

  @ApiProperty()
  donationsEnabled?: boolean;

  @ApiProperty()
  volunteersEnabled?: boolean;
}
