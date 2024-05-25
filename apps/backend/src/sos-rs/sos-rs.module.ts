import { Module } from '@nestjs/common';
import { SosRsService } from './sos-rs.service';
import { SosRsController } from './sos-rs.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SosRsController],
  imports: [DatabaseModule],
  providers: [SosRsService],
  exports: [SosRsService],
})
export class SosRsModule {}
