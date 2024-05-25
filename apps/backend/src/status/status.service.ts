import { Inject, Injectable } from '@nestjs/common';
import { QueryTypes, Sequelize } from 'sequelize';
import { Constants } from 'src/constants';

@Injectable()
export class StatusService {
  constructor(
    @Inject(Constants.SEQUELIZE)
    private sequelize: Sequelize,
  ) {}

  async dbStatus() {
    try {
      const rows = await this.sequelize.query<any>('SELECT 1 as x', { type: QueryTypes.SELECT });
      return rows?.[0]?.['x'] === 1;
    } catch {
      return false;
    }
  }
}
