import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { SosRsShelter } from './dtos/shelter';
import { SosRsPageResponse } from './dtos/page-response';
import { Shelter } from 'src/database/models/shelter.model';
import { Constants } from 'src/constants';
import { ShelterSupply } from 'src/database/models/shelter-supply.model';
import { Supply } from 'src/database/models/supply.model';
import { SosRsSupply } from './dtos/supply';
import { SosRsResponse } from './dtos/response';
import { SosRsSupplyCategory } from './dtos/supply-category';
import { SupplyCategory } from 'src/database/models/supply-category.model';

@Injectable()
export class SosRsService {
  private logger = new Logger('SosRsService');
  private httpClient = axios.create({
    baseURL: 'https://api.sos-rs.com',
  });

  constructor(
    @Inject(Constants.SHELTERS_REPOSITORY)
    private shelterRepo: typeof Shelter,
    @Inject(Constants.SHELTERS_SUPPLIES_REPOSITORY)
    private shelterSupplyRepo: typeof ShelterSupply,
    @Inject(Constants.SUPPLIES_REPOSITORY)
    private supplyRepo: typeof Supply,
    @Inject(Constants.SUPPLY_CATEGORIES_REPOSITORY)
    private supplyCategoryRepo: typeof SupplyCategory,
  ) {}

  private async getShelters(page: number) {
    return this.httpClient
      .request<SosRsPageResponse<SosRsShelter>>({
        url: '/shelters',
        params: { page },
      })
      .then((res) => res.data);
  }

  private async getSupplies() {
    return this.httpClient
      .request<SosRsResponse<SosRsSupply[]>>({
        url: '/supplies',
      })
      .then((res) => res.data);
  }

  private async getSupplyCategories() {
    return this.httpClient
      .request<SosRsResponse<SosRsSupplyCategory[]>>({
        url: '/supply-categories',
      })
      .then((res) => res.data);
  }

  private async iterateShelters(onItem: (shelter: SosRsShelter) => Promise<boolean> | boolean) {
    for (let page = 1; page <= 1000; page++) {
      const data = await this.getShelters(page);
      if (data.statusCode !== 200) throw new Error('Get shelters from sos-rs failed');
      const pages = Math.ceil(data.data.count / data.data.perPage);
      this.logger.log(`Iterating shelters, pages: ${pages}, page: ${page}`);
      if (data.data.results) {
        for (const item of data.data.results) {
          if (!(await onItem(item))) return;
        }
      }
      if (page >= pages) break;
    }
  }

  private async syncSupplyCategories() {
    const theirSupplyCategoriesRes = await this.getSupplyCategories();
    if (theirSupplyCategoriesRes.statusCode !== 200) throw new Error('Failed to sync supply categories');
    const theirSupplyCategories = theirSupplyCategoriesRes.data;
    const ourSupplyCategories = await this.supplyCategoryRepo.findAll();
    for (const theirSupplyCategory of theirSupplyCategories) {
      const ourSupplyCategory = ourSupplyCategories.find((item) => item.sosrsId === theirSupplyCategory.id);
      if (ourSupplyCategory) {
        const changedName = ourSupplyCategory.name !== theirSupplyCategory.name;
        if (changedName) {
          await ourSupplyCategory.update({
            name: theirSupplyCategory.name,
          });
        }
      } else {
        const ourSupplyCategory = await this.supplyCategoryRepo.create({
          sosrsId: theirSupplyCategory.id,
          name: theirSupplyCategory.name,
        });
        ourSupplyCategories.push(ourSupplyCategory);
      }
    }
    return { supplyCategories: ourSupplyCategories };
  }

  private async syncSupplies(supplyCategories: SupplyCategory[]) {
    const theirSuppliesRes = await this.getSupplies();
    if (theirSuppliesRes.statusCode !== 200) throw new Error('Failed to sync supplies');
    const theirSupplies = theirSuppliesRes.data;
    const ourSupplies = await this.supplyRepo.findAll();
    for (const theirSupply of theirSupplies) {
      const ourSupply = ourSupplies.find((item) => item.sosrsId === theirSupply.id);
      const name = theirSupply.name;
      const supplyCategoryId = supplyCategories.find((item) => item.sosrsId === theirSupply.supplyCategory?.id)?.supplyCategoryId;
      if (ourSupply) {
        const changedName = ourSupply.name !== name;
        const changedCategory = ourSupply.supplyCategoryId !== supplyCategoryId;
        if (changedName || changedCategory) {
          await ourSupply.update({
            name,
            supplyCategoryId,
          });
        }
      } else {
        const ourSupply = await this.supplyRepo.create({
          sosrsId: theirSupply.id,
          name,
          supplyCategoryId,
        });
        ourSupplies.push(ourSupply);
      }
    }
    return { supplies: ourSupplies };
  }

  private async syncShelters(supplies: Supply[]) {
    const ourShelters = await this.shelterRepo.findAll({
      include: [{ model: ShelterSupply }],
    });
    await this.iterateShelters(async (theirShelter) => {
      this.logger.log(`Sync shelter, sosrs id: ${theirShelter.id}`);
      let ourShelter: Shelter | undefined = ourShelters.find((item) => item.sosrsId === theirShelter.id);
      const streetNumberAux = parseInt(theirShelter.streetNumber ?? '');
      const streetNumber = !isNaN(streetNumberAux) ? streetNumberAux : undefined;
      const body = {
        sosrsId: theirShelter.id,
        address: theirShelter.address,
        city: theirShelter.city ?? undefined,
        neighbourhood: theirShelter.neighbourhood ?? undefined,
        street: theirShelter.street ?? undefined,
        streetNumber,
        zipCode: theirShelter.zipCode ?? undefined,
        capacity: theirShelter.capacity ?? null,
        category: theirShelter.category,
        latitude: theirShelter.latitude ? String(theirShelter.latitude) : undefined,
        longitude: theirShelter.longitude ? String(theirShelter.longitude) : undefined,
        name: theirShelter.name,
        petFriendly: theirShelter.petFriendly,
        pix: theirShelter.pix,
        shelteredPeople: theirShelter.shelteredPeople,
        prioritySum: theirShelter.prioritySum,
        verified: theirShelter.verified,
        actived: theirShelter.actived,
      } as const;
      if (ourShelter) {
        this.shelterRepo.update(body, {
          where: { shelterId: ourShelter.shelterId },
        });
      } else {
        ourShelter = await this.shelterRepo.create(body);
        ourShelters.push(ourShelter);
      }
      const toDelete = new Set(ourShelter.shelterSupplies?.map((item) => item.supplyId));
      for (const shelterSupply of theirShelter.shelterSupplies) {
        const supply = supplies.find((item) => item.sosrsId === shelterSupply.supplyId);
        if (!supply) continue;
        if (toDelete.has(supply.supplyId)) {
          toDelete.delete(supply.supplyId);
        } else {
          await this.shelterSupplyRepo.create({
            priority: shelterSupply.priority,
            quantity: shelterSupply.quantity,
            supplyId: supply.supplyId,
            shelterId: ourShelter.shelterId,
          });
        }
      }
      return true;
    });
  }

  public async sync() {
    const { supplyCategories } = await this.syncSupplyCategories();
    const { supplies } = await this.syncSupplies(supplyCategories);
    await this.syncShelters(supplies);
  }

  @Cron('*/30 * * * *')
  private async autoSync() {
    //await this.sync();
  }
}
