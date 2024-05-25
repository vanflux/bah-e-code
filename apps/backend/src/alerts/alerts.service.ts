import { Inject, Injectable, Logger } from '@nestjs/common';
import { Alert } from 'src/database/models/alert.model';
import { FindAllInputDto } from './dtos/find-all.dto';
import { Constants } from 'src/constants';

@Injectable()
export class AlertsService {
  private logger = new Logger('DevService');

  constructor(
    @Inject(Constants.ALERTS_REPOSITORY)
    private alertRepo: typeof Alert,
  ) {}

  public async findAll({ userId }: FindAllInputDto) {
    // TODO: find alerts relevant to user
    const alerts = await this.alertRepo.findAll();
    return alerts;
  }

  public async getById(alertId: string) {
    const alert = await this.alertRepo.findByPk(alertId);
    if (!alert) return;
    return alert;
  }
}
