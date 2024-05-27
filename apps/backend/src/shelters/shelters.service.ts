import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Constants } from 'src/constants';
import { FindAttributeOptions, Includeable, Order, ProjectionAlias, WhereOptions, col, fn, where } from 'sequelize';
import { Shelter } from 'src/database/models/shelter.model';
import { FindAllSheltersDto } from './dtos/find-all-shelters.dto';
import { Op } from 'sequelize';
import { Page } from 'src/utils/page';
import { Supply } from 'src/database/models/supply.model';
import { SupplyCategory } from 'src/database/models/supply-category.model';
import { ShelterSupply } from 'src/database/models/shelter-supply.model';
import { GetSheltersToSendDonationsDto } from './dtos/get-shelters-to-send-donations';
import { SupplyPriority } from './enums/supply-priority.enum';
import { ShelterPointDto } from './dtos/shelter-point.dto';

@Injectable()
export class SheltersService {
  private logger = new Logger('SheltersService');

  constructor(
    @Inject(Constants.SHELTERS_REPOSITORY)
    private shelterRepo: typeof Shelter,
  ) {}

  private getShelterIncludes(): Includeable[] {
    return [
      {
        model: ShelterSupply,
        include: [
          {
            model: Supply,
            include: [
              {
                model: SupplyCategory,
              },
            ],
          },
        ],
      },
    ];
  }

  private async getSheltersBase(
    latitude: number,
    longitude: number,
    page: number,
    perPage: number,
    include: Includeable[],
    whereOptions?: WhereOptions,
  ) {
    const items = await this.shelterRepo.findAll({
      attributes: {
        include: [[where(fn('point', latitude, longitude), '<@>', fn('point', col('latitude'), col('longitude'))) as any, 'distance']],
      },
      where: whereOptions,
      order: [[col('distance'), 'asc']],
      include,
      limit: perPage,
      offset: (page - 1) * perPage,
    });
    const total = await this.shelterRepo.count({ where: whereOptions, include });
    return { items, total };
  }

  public async getShelters(body: FindAllSheltersDto): Promise<Page<Shelter>> {
    const { latitude, longitude, search, page = 1, perPage = 5 } = body;
    const whereOptions: WhereOptions | undefined = search
      ? {
          [Op.or]: [{ name: { [Op.iLike]: search } }, { address: { [Op.iLike]: search } }],
        }
      : undefined;
    return this.getSheltersBase(latitude, longitude, page, perPage, this.getShelterIncludes(), whereOptions);
  }

  public async getSheltersToSendDonations(body: GetSheltersToSendDonationsDto): Promise<Page<Shelter>> {
    const { shelterId, page = 1, perPage = 5 } = body;
    const shelter = await this.getById(shelterId);
    if (!shelter) throw new NotFoundException('Shelter not found');
    const latitude = shelter.latitude ? Number(shelter.latitude) : undefined;
    const longitude = shelter.longitude ? Number(shelter.longitude) : undefined;
    if (!latitude || !longitude) throw new BadRequestException('Shelter has no latitude or longitude');
    const donableSupplyIds = (shelter?.shelterSupplies ?? [])
      .filter((item) => SupplyPriority.Remaining === item.priority)
      .map((item) => item.supplyId);
    if (!donableSupplyIds.length) return { items: [], total: 0 };
    return this.getSheltersBase(latitude, longitude, page, perPage, [
      {
        model: ShelterSupply,
        where: {
          supplyId: {
            [Op.in]: donableSupplyIds,
          },
          priority: {
            [Op.in]: [SupplyPriority.Needing, SupplyPriority.Urgent],
          },
        },
        include: [
          {
            model: Supply,
            include: [
              {
                model: SupplyCategory,
              },
            ],
          },
        ],
      },
    ]);
  }

  public async getSheltersToReceiveDonations(body: GetSheltersToSendDonationsDto): Promise<Page<Shelter>> {
    const { shelterId, page = 1, perPage = 5 } = body;
    const shelter = await this.getById(shelterId);
    if (!shelter) throw new NotFoundException('Shelter not found');
    const latitude = shelter.latitude ? Number(shelter.latitude) : undefined;
    const longitude = shelter.longitude ? Number(shelter.longitude) : undefined;
    if (!latitude || !longitude) throw new BadRequestException('Shelter has no latitude or longitude');
    const receivableSupplyIds = (shelter?.shelterSupplies ?? [])
      .filter((item) => [SupplyPriority.Needing, SupplyPriority.Urgent].includes(item.priority))
      .map((item) => item.supplyId);
    if (!receivableSupplyIds.length) return { items: [], total: 0 };
    return this.getSheltersBase(latitude, longitude, page, perPage, [
      {
        model: ShelterSupply,
        where: {
          supplyId: {
            [Op.in]: receivableSupplyIds,
          },
          priority: {
            [Op.in]: [SupplyPriority.Remaining],
          },
        },
        include: [
          {
            model: Supply,
            include: [
              {
                model: SupplyCategory,
              },
            ],
          },
        ],
      },
    ]);
  }

  public async getSheltersPoints(): Promise<ShelterPointDto[]> {
    const shelters = await this.shelterRepo.findAll({
      attributes: ['shelterId', 'name', 'latitude', 'longitude'],
      where: {
        latitude: {
          [Op.not]: null,
        },
        longitude: {
          [Op.not]: null,
        },
      },
    });
    return shelters.map(ShelterPointDto.fromModel);
  }

  public async getById(shelterId: string) {
    const shelter = await this.shelterRepo.findByPk(shelterId, {
      include: this.getShelterIncludes(),
    });
    if (!shelter) return;
    return shelter;
  }
}
