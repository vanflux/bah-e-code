import { ApiProperty } from '@nestjs/swagger';
import { Shelter } from 'src/database/models/shelter.model';

export class ShelterPointDto {
  @ApiProperty()
  shelterId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  latitude!: number;

  @ApiProperty()
  longitude!: number;

  static fromModel(shelter: Shelter): ShelterPointDto {
    return {
      shelterId: shelter.shelterId,
      name: shelter.name,
      latitude: Number(shelter.latitude),
      longitude: Number(shelter.longitude),
    };
  }
}
