import { Body, Controller, Post, Version } from '@nestjs/common';
import { AuthDto, AuthLoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from './auth.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @Version('1')
  async login(@Body() input: AuthLoginDto, @Auth() auth: AuthDto) {
    return this.authService.login(input, auth);
  }
}
