import { Inject, Injectable, Logger } from '@nestjs/common';
import { SaceClient } from './client';
import { WaterLevel } from 'src/database/models/water-level.model';
import { Constants } from 'src/constants';
import { Op, literal } from 'sequelize';
import { River } from 'src/database/models/rivers.model';

@Injectable()
export class RiversService {
  private logger = new Logger('RiversService');

  constructor(
    @Inject(Constants.RIVERS_REPOSITORY)
    private riverRepo: typeof River,
    @Inject(Constants.WATER_LEVELS_REPOSITORY)
    private waterLevelRepo: typeof WaterLevel,
  ) {}

  async getRivers() {
    return await this.riverRepo.findAll();
  }

  async getLastWaterLevels(riverId: string, days: number) {
    return this.waterLevelRepo.findAll({
      where: {
        riverId,
        date: {
          [Op.gte]: literal(`NOW() - INTERVAL '${Number(days)}d'`),
        },
      },
      order: [['date', 'asc']],
    });
  }

  async sync() {
    this.logger.log('Syncing rivers');
    const client = new SaceClient();
    const monitoringPoints = await client.getMonitoringPoints();
    this.logger.log(`Monitoring points: ${JSON.stringify(monitoringPoints)}`);
    const rivers = await this.riverRepo.findAll();
    for (const river of rivers) {
      const point = monitoringPoints.find((point) => point.city === river.city);
      const cityId = point?.id;
      if (cityId == null) {
        this.logger.error(`City id not found, riverId: ${river.riverId}, city: ${river.city}`);
        continue;
      }
      const graphic = await client.getGraphic(cityId);
      await river.update({
        alertValue: graphic.alertValue,
        floodValue: graphic.floodValue,
      });
      const graphicItem = graphic.items.find((item) => item.name.includes('Cota PCD (cm)'));
      for (const [time, value] of graphicItem?.data ?? []) {
        const date = new Date(time);
        await this.waterLevelRepo.upsert({ riverId: river.riverId, date, value }, { conflictFields: ['river_id' as any, 'date'] });
      }
    }
    this.logger.log('Rivers synced');
  }
}
