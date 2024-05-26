import { Body, Controller, Delete, ForbiddenException, Get, NotFoundException, Param, Patch, Post, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Auth, Authenticated } from 'src/auth/auth.decorator';
import { AuthDto } from 'src/auth/auth.dto';
import { AddressesService } from './addresses.service';
import { AddressDto } from './dtos/address.dto';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UpdateAddressDto } from './dtos/update-address.dto';

@ApiTags('addresses')
@Controller('/addresses')
export class AddressesController {
  constructor(private addressesService: AddressesService) {}

  @Get(':id')
  @Version('1')
  @Authenticated()
  @ApiResponse({ type: AddressDto })
  async getById(@Param('id') id: string, @Auth() auth: AuthDto) {
    const address = await this.addressesService.getById(id);
    if (!address) throw new NotFoundException('Address not found');
    if (address.userId !== auth.userId) throw new ForbiddenException('This address is of another user');
    return AddressDto.fromModel(address);
  }

  @Get()
  @Version('1')
  @Authenticated()
  @ApiResponse({ type: AddressDto, isArray: true })
  async findAll(@Auth() auth: AuthDto) {
    const alerts = await this.addressesService.findAll({
      userId: auth.userId,
    });
    return alerts.map(AddressDto.fromModel);
  }

  @Post()
  @Version('1')
  @Authenticated()
  @ApiResponse({ type: AddressDto })
  async create(@Body() body: CreateAddressDto, @Auth() auth: AuthDto) {
    const input: CreateAddressDto = {
      ...body,
      userId: auth.userId,
    };
    const address = await this.addressesService.create(input);
    return AddressDto.fromModel(address);
  }

  @Patch(':id')
  @Version('1')
  @Authenticated()
  @ApiResponse({ type: AddressDto })
  async update(@Body() body: UpdateAddressDto, @Param('id') id: string, @Auth() auth: AuthDto) {
    const existentAddress = await this.addressesService.getById(id);
    if (!existentAddress) throw new NotFoundException('Address not found');
    if (existentAddress.userId !== auth.userId) throw new ForbiddenException('This address is of another user');
    const input: UpdateAddressDto = {
      ...body,
      addressId: id,
    };
    const address = await this.addressesService.update(input);
    return AddressDto.fromModel(address);
  }

  @Delete(':id')
  @Version('1')
  @Authenticated()
  @ApiResponse({ type: AddressDto })
  async delete(@Param('id') id: string, @Auth() auth: AuthDto) {
    const existentAddress = await this.addressesService.getById(id);
    if (!existentAddress) throw new NotFoundException('Address not found');
    if (existentAddress.userId !== auth.userId) throw new ForbiddenException('This address is of another user');
    await this.addressesService.delete(id);
    return AddressDto.fromModel(existentAddress);
  }
}
