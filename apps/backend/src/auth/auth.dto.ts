import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class AuthDto {
  userId!: string;
  version!: number;
}

export class AuthLoginDto {
  @ApiProperty({ example: '22558850008' })
  @IsString()
  @Length(11, 11)
  cpf!: string;
}

export class AuthResultDto {
  @ApiProperty()
  accessToken!: string;
}
