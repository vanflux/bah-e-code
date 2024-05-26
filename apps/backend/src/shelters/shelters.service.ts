import { Inject, Injectable, Logger } from '@nestjs/common';
import { Constants } from 'src/constants';
import { col, fn, where } from 'sequelize';
import { Shelter } from 'src/database/models/shelter.model';
import { FindAllSheltersDto } from './dtos/find-all-shelters.dto';
import { Op } from 'sequelize';
import { Page } from 'src/utils/page';

@Injectable()
export class SheltersService {
  private logger = new Logger('SheltersService');

  constructor(
    @Inject(Constants.SHELTERS_REPOSITORY)
    private shelterRepo: typeof Shelter,
  ) {}

  public async getShelters(body: FindAllSheltersDto): Promise<Page<Shelter>> {
    const { latitude, longitude, search, page = 1, perPage = 5 } = body;
    const whereQuery = search
      ? {
          [Op.or]: [{ name: { [Op.iLike]: search } }, { address: { [Op.iLike]: search } }],
        }
      : undefined;
    const items = await this.shelterRepo.findAll({
      attributes: {
        include: [[where(fn('point', latitude, longitude), '<@>', fn('point', col('latitude'), col('longitude'))) as any, 'distance']],
      },
      where: whereQuery,
      order: [['distance', 'asc']],
      limit: perPage,
      offset: (page - 1) * perPage,
    });
    const total = await this.shelterRepo.count({
      where: whereQuery,
    });
    return { items, total };
  }

  public async getById(shelterId: string) {
    const shelter = await this.shelterRepo.findByPk(shelterId);
    if (!shelter) return;
    return shelter;
  }
}
