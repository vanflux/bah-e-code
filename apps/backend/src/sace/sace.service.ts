import { Inject, Injectable, Logger } from '@nestjs/common';
import { SaceClient } from './client';
import { WaterLevel } from 'src/database/models/water-level.model';
import { Constants } from 'src/constants';
import { Op, literal } from 'sequelize';

@Injectable()
export class SaceService {
  private logger = new Logger('SaceService');

  constructor(
    @Inject(Constants.WATER_LEVELS_REPOSITORY)
    private waterLevelRepo: typeof WaterLevel,
  ) {}

  async getWaterLevel() {
    return this.waterLevelRepo.findAll({
      where: {
        city: 'Porto Alegre',
        date: {
          [Op.gte]: literal(`NOW() - INTERVAL '7d'`),
        },
      },
    });
  }

  async syncWaterLevels() {
    this.logger.log('Syncing water levels');
    const city = 'Porto Alegre';
    const client = new SaceClient();
    const monitoringPoints = await client.getMonitoringPoints();
    console.log('Monitoring points:', monitoringPoints);
    const graphicItems = await client.getGraphic();
    const graphicItem = graphicItems.find((item) => item.name.includes('Cota PCD (cm)'));
    for (const [time, value] of graphicItem?.data ?? []) {
      const date = new Date(time);
      await this.waterLevelRepo.upsert({ city, date, value }, { conflictFields: ['city', 'date'] });
    }
    this.logger.log('Water levels synced');
    return graphicItem;
  }
}
