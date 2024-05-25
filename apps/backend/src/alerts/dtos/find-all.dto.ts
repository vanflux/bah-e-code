import { ApiProperty } from '@nestjs/swagger';

export class FindAllInputDto {
  @ApiProperty()
  userId?: string;
}
