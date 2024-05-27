import { Controller, Get, Logger, Post, Version } from '@nestjs/common';
import { SaceService } from './sace.service';
import { ApiTags } from '@nestjs/swagger';
import { WaterLevelDto } from './dtos/water-level.dto';
import { Cron } from '@nestjs/schedule';

@ApiTags('sace')
@Controller('/sace')
export class SaceController {
  private logger = new Logger('SaceController');

  constructor(private saceService: SaceService) {}

  @Get('/water-level')
  @Version('1')
  public async getWaterLevel() {
    const waterLevels = await this.saceService.getWaterLevel();
    return waterLevels.map(WaterLevelDto.fromModel);
  }

  @Post('/sync-water-level')
  @Version('1')
  public async syncWaterLevels() {
    await this.saceService.syncWaterLevels();
  }

  //@Cron('*/30 * * * *')
  private async autoSyncWaterLevels() {
    await this.syncWaterLevels();
  }
}
