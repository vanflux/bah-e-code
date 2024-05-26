import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Constants } from 'src/constants';
import { Address } from 'src/database/models/address.model';
import { FindAllAddressesDto } from './dtos/find-all-addresses.dto';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@Injectable()
export class AddressesService {
  private logger = new Logger('AddressesService');

  constructor(
    @Inject(Constants.ADDRESSES_REPOSITORY)
    private addressRepo: typeof Address,
  ) {}

  public async findAll({ userId }: FindAllAddressesDto) {
    const addresses = await this.addressRepo.findAll({
      where: { userId },
    });
    return addresses;
  }

  public async getById(addressId: string) {
    const address = await this.addressRepo.findByPk(addressId);
    if (!address) return;
    return address;
  }

  public async create(body: CreateAddressDto) {
    const address = await this.addressRepo.create({
      userId: body.userId,
      name: body.name ?? `Endereço sem nome`,
      city: body.city,
      neighbourhood: body.neighbourhood,
      street: body.street,
      streetNumber: body.streetNumber,
      zipCode: body.zipCode,
      alertsEnabled: body.alertsEnabled ?? true,
      donationsEnabled: body.donationsEnabled ?? false,
      volunteersEnabled: body.volunteersEnabled ?? false,
    });
    return address;
  }

  public async update(body: UpdateAddressDto) {
    if (!body.addressId) throw new BadRequestException('Undefined address id');
    const [_, addresses] = await this.addressRepo.update(
      {
        name: body.name ?? undefined,
        city: body.city ?? undefined,
        neighbourhood: body.neighbourhood,
        street: body.street,
        streetNumber: body.streetNumber,
        zipCode: body.zipCode,
        alertsEnabled: body.alertsEnabled ?? undefined,
        donationsEnabled: body.donationsEnabled ?? undefined,
        volunteersEnabled: body.volunteersEnabled ?? undefined,
      },
      {
        where: { addressId: body.addressId },
        returning: true,
      },
    );
    if (!addresses?.length) throw new NotFoundException('Address not found for update');
    return addresses[0];
  }

  public async delete(id: string) {
    await this.addressRepo.destroy({
      where: { addressId: id },
    });
  }
}
