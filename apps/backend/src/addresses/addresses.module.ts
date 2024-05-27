import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AddressesController],
  exports: [AddressesService],
  imports: [DatabaseModule, ConfigModule],
  providers: [AddressesService],
})
export class AddressesModule {}
