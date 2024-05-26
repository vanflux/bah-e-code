import { Inject, Injectable, Logger } from '@nestjs/common';
import { Alert } from 'src/database/models/alert.model';
import { Constants } from 'src/constants';
import { Address } from 'src/database/models/address.model';
import { Op, col, fn } from 'sequelize';
import { FindAllAlertsDto } from './dtos/find-all-alerts.dto';

@Injectable()
export class AlertsService {
  private logger = new Logger('AlertsService');

  constructor(
    @Inject(Constants.ALERTS_REPOSITORY)
    private alertRepo: typeof Alert,
    @Inject(Constants.ADDRESSES_REPOSITORY)
    private addressRepo: typeof Address,
  ) {}

  public async findAll({ userId }: FindAllAlertsDto) {
    const addresses = await this.addressRepo.findAll({
      where: { userId },
      attributes: [[fn('DISTINCT', col('city')), 'city']],
    });
    const cities = addresses.map((item) => item.city);
    const alerts = await this.alertRepo.findAll({
      where: { city: { [Op.in]: cities } },
    });
    return alerts;
  }

  public async getById(alertId: string) {
    const alert = await this.alertRepo.findByPk(alertId);
    if (!alert) return;
    return alert;
  }
}
