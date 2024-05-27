import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Constants } from 'src/constants';
import { Address } from 'src/database/models/address.model';
import { FindAllAddressesDto } from './dtos/find-all-addresses.dto';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';
import { ConfigService } from '@nestjs/config';
import { Client } from '@googlemaps/google-maps-services-js';

@Injectable()
export class AddressesService {
  private logger = new Logger('AddressesService');
  private apiKey = this.configService.getOrThrow('google.maps.apiKey');

  constructor(
    @Inject(Constants.ADDRESSES_REPOSITORY)
    private addressRepo: typeof Address,
    private configService: ConfigService,
  ) {}

  private googleClient = new Client({});

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

  private async fetchLatLon(body: CreateAddressDto | UpdateAddressDto) {
    if (body.street && body.streetNumber != null && body.neighbourhood && body.city) {
      try {
        const res = await this.googleClient.geocode({
          params: {
            address: `${body.street}, ${body.streetNumber}, ${body.neighbourhood}, ${body.city}, Brasil`,
            language: 'pt-BR',
            key: this.apiKey,
          },
        });
        const location = res.data.results[0].geometry.location;
        if (!location) return {};
        return {
          latitude: location.lat,
          longitude: location.lng,
        };
      } catch (exc: unknown) {
        console.error(exc);
        this.logger.error('Failed to get geolocation');
      }
    }
    return {};
  }

  public async create(body: CreateAddressDto) {
    const { latitude, longitude } = await this.fetchLatLon(body);
    const address = await this.addressRepo.create({
      userId: body.userId,
      name: body.name ?? `Endereço sem nome`,
      city: body.city,
      neighbourhood: body.neighbourhood,
      street: body.street,
      streetNumber: body.streetNumber,
      zipCode: body.zipCode,
      latitude: latitude ? String(latitude) : undefined,
      longitude: longitude ? String(longitude) : undefined,
      alertsEnabled: body.alertsEnabled ?? true,
      donationsEnabled: body.donationsEnabled ?? false,
      volunteersEnabled: body.volunteersEnabled ?? false,
    });
    return address;
  }

  public async update(body: UpdateAddressDto) {
    if (!body.addressId) throw new BadRequestException('Undefined address id');
    const { latitude, longitude } = await this.fetchLatLon(body);
    const [_, addresses] = await this.addressRepo.update(
      {
        name: body.name ?? undefined,
        city: body.city ?? undefined,
        neighbourhood: body.neighbourhood,
        street: body.street,
        streetNumber: body.streetNumber,
        zipCode: body.zipCode,
        latitude: latitude ? String(latitude) : undefined,
        longitude: longitude ? String(longitude) : undefined,
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
