import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';

@Module({
  controllers: [AddressesController],
  exports: [AddressesService],
  imports: [DatabaseModule],
  providers: [AddressesService],
})
export class AddressesModule {}
