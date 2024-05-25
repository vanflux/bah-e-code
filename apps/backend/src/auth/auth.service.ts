import { Inject, Injectable } from '@nestjs/common';
import { AuthDto, AuthLoginDto, AuthResultDto } from './auth.dto';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Constants } from 'src/constants';
import { User } from 'src/database/models/user.model';

@Injectable()
export class AuthService {
  private jwtSecret = this.configService.getOrThrow('auth.jwtSecret');

  constructor(
    private configService: ConfigService,
    @Inject(Constants.USERS_REPOSITORY)
    private userRepo: typeof User,
  ) {}

  async login(input: AuthLoginDto, existentAuthDto?: AuthDto) {
    const [user] = await this.userRepo.upsert(
      {
        cpf: input.cpf,
      },
      {
        conflictFields: ['cpf'],
      },
    );
    if (!user?.cpf) {
    }
    const authDto: AuthDto = {
      ...existentAuthDto,
      userId: user.userId,
      version: 1,
    };
    const accessToken = this.encodeToken(authDto);
    const result: AuthResultDto = { accessToken };
    return result;
  }

  async decodeUser(token: string): Promise<AuthDto | undefined> {
    try {
      const payload = verify(token, this.jwtSecret) as AuthDto & JwtPayload;
      return {
        userId: payload.userId,
        version: 1,
      };
    } catch (exc: unknown) {}
  }

  private encodeToken(authDto: AuthDto): string {
    const token = sign(authDto, this.jwtSecret);
    return token;
  }
}
