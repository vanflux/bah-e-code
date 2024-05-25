import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [AuthController],
  exports: [AuthService],
  imports: [ConfigModule, DatabaseModule],
  providers: [AuthService],
})
export class AuthModule {}
