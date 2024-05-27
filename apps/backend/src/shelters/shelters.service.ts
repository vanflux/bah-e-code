import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Constants } from 'src/constants';
import { Includeable, QueryTypes, Sequelize, WhereOptions, col, fn, where } from 'sequelize';
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
    @Inject(Constants.SUPPLY_CATEGORIES_REPOSITORY)
    private supplyCategoryRepo: typeof SupplyCategory,
    @Inject(Constants.SEQUELIZE)
    private sequelize: Sequelize,
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
    const total = await this.shelterRepo.count({ where: whereOptions });
    return { items, total };
  }

  public async getShelters(body: FindAllSheltersDto): Promise<Page<Shelter>> {
    const {
      latitude,
      longitude,
      search,
      needPsico = false,
      needVolunteers = false,
      needSupplyCategoryId = null,
      petFriendly,
      page = 1,
      perPage = 5,
    } = body;
    const and: WhereOptions[] = [];
    const whereOptions: WhereOptions | undefined = { [Op.and]: and };
    if (search) and.push({ [Op.or]: [{ name: { [Op.iLike]: search } }, { address: { [Op.iLike]: search } }] });
    if (petFriendly != null) and.push({ petFriendly });
    if (needPsico || needVolunteers || needSupplyCategoryId) {
      const rows = await this.sequelize.query<{ id: string }>(
        `
        select distinct s.shelter_id as id
        from shelters s
        join shelters_supplies ss ON ss.shelter_id = s.shelter_id
        join supplies sss on sss.supply_id = ss.supply_id
        join supply_categories sc on sc.supply_category_id = sss.supply_category_id
        where (
          ss.priority in (:needing, :urgent) and
          (not(:needPsico) or (sss.name ilike '%psicólog%' or sss.name ilike '%psicolog%')) and
          (not(:needVolunteers) or (sc.name ilike '%especialistas e profissionais%')) and
          (:needSupplyCategoryId is null or (sc.supply_category_id = :needSupplyCategoryId))
        )
      `,
        {
          replacements: {
            needing: SupplyPriority.Needing,
            urgent: SupplyPriority.Urgent,
            needPsico,
            needVolunteers,
            needSupplyCategoryId,
          },
          type: QueryTypes.SELECT,
        },
      );
      and.push({ shelterId: { [Op.in]: rows.map((row) => row.id) } });
    }
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

  public async getAllSupplyCategories() {
    const supplyCategories = await this.supplyCategoryRepo.findAll();
    return supplyCategories;
  }

  public async getSupplyCategoryById(supplyCategoryId: string) {
    const supplyCategory = await this.supplyCategoryRepo.findByPk(supplyCategoryId);
    if (!supplyCategory) return;
    return supplyCategory;
  }
}
