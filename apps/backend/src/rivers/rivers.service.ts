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
    return await this.riverRepo.findAll({
      order: [['name', 'asc']],
    });
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
    for (const point of monitoringPoints) {
      try {
        const cityId = point.id;
        const graphic = await client.getGraphic(cityId);
        const graphicItem = graphic.items.find((item) => item.type === 'WATER_LEVEL');
        if (graphicItem?.data.length) {
          const [river] = await this.riverRepo.upsert(
            {
              name: graphic.title,
              city: point.city,
              severeFloodValue: graphic.severeFloodValue,
              floodValue: graphic.floodValue,
              alertValue: graphic.alertValue,
              attentionValue: graphic.attentionValue,
            },
            {
              conflictFields: ['name'],
            },
          );
          for (const [time, value] of graphicItem.data) {
            const date = new Date(time);
            await this.waterLevelRepo.upsert({ riverId: river.riverId, date, value }, { conflictFields: ['river_id' as any, 'date'] });
          }
        }
      } catch {
        this.logger.error(`Failed to fetch river data of ${point.city} (${point.id})`);
      }
    }
    this.logger.log('Rivers synced');
  }
}
