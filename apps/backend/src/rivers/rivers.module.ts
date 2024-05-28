import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { RiversController } from './rivers.controller';
import { RiversService } from './rivers.service';

@Module({
  controllers: [RiversController],
  exports: [RiversService],
  imports: [DatabaseModule],
  providers: [RiversService],
})
export class RiversModule {}
