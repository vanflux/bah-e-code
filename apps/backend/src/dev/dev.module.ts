import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { DevController } from './dev.controller';
import { DevService } from './dev.service';

@Module({
  controllers: [DevController],
  exports: [],
  imports: [DatabaseModule],
  providers: [DevService],
})
export class DevModule {}
