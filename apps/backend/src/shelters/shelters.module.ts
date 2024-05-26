import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';

@Module({
  controllers: [SheltersController],
  exports: [SheltersService],
  imports: [DatabaseModule],
  providers: [SheltersService],
})
export class SheltersModule {}
