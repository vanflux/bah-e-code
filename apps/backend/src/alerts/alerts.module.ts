import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AlertsService } from './alerts.service';
import { AlertsController } from './alerts.controller';

@Module({
  controllers: [AlertsController],
  exports: [AlertsService],
  imports: [DatabaseModule],
  providers: [AlertsService],
})
export class AlertsModule {}
