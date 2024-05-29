import { BadRequestException, Controller, Get, Logger, Param, ParseIntPipe, Post, Query, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WaterLevelDto } from './dtos/water-level.dto';
import { RiversService } from './rivers.service';
import { RiverDto } from './dtos/river.dto';
import { Cron } from '@nestjs/schedule';

@ApiTags('rivers')
@Controller('/rivers')
export class RiversController {
  private logger = new Logger('RiversController');

  constructor(private riversService: RiversService) {}

  @Get('/:id/water-levels/last')
  @Version('1')
  public async getLastWaterLevels(@Param('id') id: string, @Query('days', ParseIntPipe) days: number) {
    if (days < 1 || days > 21) throw new BadRequestException();
    const waterLevels = await this.riversService.getLastWaterLevels(id, days);
    return waterLevels.map(WaterLevelDto.fromModel);
  }

  @Get()
  @Version('1')
  public async getRivers() {
    const rivers = await this.riversService.getRivers();
    return rivers.map(RiverDto.fromModel);
  }

  @Post('/sync')
  @Version('1')
  public async sync() {
    await this.riversService.sync();
  }

  //@Cron('*/30 * * * *')
  private async autoSync() {
    await this.riversService.sync();
  }
}
