import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  controllers: [StatusController],
  exports: [StatusService],
  imports: [DatabaseModule],
  providers: [StatusService],
})
export class StatusModule {}
