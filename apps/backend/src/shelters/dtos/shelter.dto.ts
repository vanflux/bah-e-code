import { ApiProperty } from '@nestjs/swagger';
import { Shelter } from 'src/database/models/shelter.model';
import { ShelterSupplyDto } from './shelter-supply.dto';

export class ShelterDto {
  @ApiProperty()
  shelterId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  pix?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  street?: string;

  @ApiProperty()
  streetNumber?: number;

  @ApiProperty()
  neighbourhood?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  contact?: string;

  @ApiProperty()
  zipCode?: string;

  @ApiProperty()
  capacity?: number;

  @ApiProperty()
  petFriendly?: boolean;

  @ApiProperty()
  shelteredPeople?: number;

  @ApiProperty()
  prioritySum!: number;

  @ApiProperty()
  verified!: boolean;

  @ApiProperty()
  latitude?: number;

  @ApiProperty()
  longitude?: number;

  @ApiProperty()
  actived!: boolean;

  @ApiProperty()
  category!: string;

  @ApiProperty()
  imageUrl?: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  @ApiProperty({ type: ShelterSupplyDto, isArray: true })
  shelterSupplies?: ShelterSupplyDto[];

  static fromModel(shelter: Shelter): ShelterDto {
    return {
      shelterId: shelter.shelterId,
      name: shelter.name,
      pix: shelter.pix ?? undefined,
      address: shelter.address,
      street: shelter.street ?? undefined,
      streetNumber: shelter.streetNumber ?? undefined,
      neighbourhood: shelter.neighbourhood ?? undefined,
      city: shelter.city ?? undefined,
      contact: shelter.contact ?? undefined,
      zipCode: shelter.zipCode ?? undefined,
      capacity: shelter.capacity ?? undefined,
      petFriendly: shelter.petFriendly ?? undefined,
      shelteredPeople: shelter.shelteredPeople ?? undefined,
      prioritySum: shelter.prioritySum,
      verified: shelter.verified,
      latitude: shelter.latitude ? Number(shelter.latitude) : undefined,
      longitude: shelter.longitude ? Number(shelter.longitude) : undefined,
      actived: shelter.actived,
      category: shelter.category,
      imageUrl: shelter.imageUrl ?? undefined,
      createdAt: shelter.createdAt.toISOString(),
      updatedAt: shelter.updatedAt.toISOString(),
      shelterSupplies: shelter.shelterSupplies ? shelter.shelterSupplies.map(ShelterSupplyDto.fromModel) : undefined,
    };
  }
}
