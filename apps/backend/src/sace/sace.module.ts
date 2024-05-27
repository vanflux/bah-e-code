import { Module } from '@nestjs/common';
import { SaceService } from './sace.service';
import { SaceController } from './sace.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [SaceController],
  exports: [SaceService],
  imports: [DatabaseModule],
  providers: [SaceService],
})
export class SaceModule {}
