import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'src/database/models/address.model';

export class AddressDto {
  @ApiProperty()
  addressId!: string;

  @ApiProperty()
  userId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  neighbourhood?: string;

  @ApiProperty()
  city!: string;

  @ApiProperty()
  streetNumber?: string;

  @ApiProperty()
  zipCode?: string;

  @ApiProperty()
  alertsEnabled!: boolean;

  @ApiProperty()
  donationsEnabled!: boolean;

  @ApiProperty()
  volunteersEnabled!: boolean;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  static fromModel(address: Address): AddressDto {
    return {
      addressId: address.addressId,
      userId: address.userId,
      name: address.name,
      city: address.city ?? undefined,
      neighbourhood: address.neighbourhood ?? undefined,
      street: address.street ?? undefined,
      streetNumber: address.streetNumber ?? undefined,
      zipCode: address.zipCode ?? undefined,
      alertsEnabled: address.alertsEnabled,
      donationsEnabled: address.donationsEnabled,
      volunteersEnabled: address.volunteersEnabled,
      createdAt: address.createdAt.toISOString(),
      updatedAt: address.updatedAt.toISOString(),
    };
  }
}
