import { Body, Controller, Get, NotFoundException, Param, Query, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Authenticated } from 'src/auth/auth.decorator';
import { SheltersService } from './shelters.service';
import { ShelterDto } from './dtos/shelter.dto';
import { Page, PageType } from 'src/utils/page';
import { FindAllSheltersDto } from './dtos/find-all-shelters.dto';
import { GetSheltersToSendDonationsDto } from './dtos/get-shelters-to-send-donations';
import { GetSheltersToReceiveDonationsDto } from './dtos/get-shelters-to-receive-donations';

@ApiTags('shelters')
@Controller('/shelters')
export class SheltersController {
  constructor(private sheltersService: SheltersService) {}

  @Get(':id/shelters-to-send-donations')
  @Version('1')
  @ApiResponse({ type: ShelterDto })
  async getSheltersToSendDonations(@Param('id') id: string, @Query() body: GetSheltersToSendDonationsDto) {
    const page = await this.sheltersService.getSheltersToSendDonations({
      shelterId: id,
      page: body.page,
      perPage: body.perPage,
    });
    return {
      items: page.items.map((item) => ShelterDto.fromModel(item)),
      total: page.total,
    };
  }

  @Get(':id/shelters-to-receive-donations')
  @Version('1')
  @ApiResponse({ type: ShelterDto })
  async getSheltersToReceiveDonations(@Param('id') id: string, @Query() body: GetSheltersToReceiveDonationsDto) {
    const page = await this.sheltersService.getSheltersToReceiveDonations({
      shelterId: id,
      page: body.page,
      perPage: body.perPage,
    });
    return {
      items: page.items.map((item) => ShelterDto.fromModel(item)),
      total: page.total,
    };
  }

  @Get(':id')
  @Version('1')
  @ApiResponse({ type: ShelterDto })
  async getById(@Param('id') id: string) {
    const shelter = await this.sheltersService.getById(id);
    if (!shelter) throw new NotFoundException('Shelter not found');
    return ShelterDto.fromModel(shelter);
  }

  @Get()
  @Version('1')
  @Authenticated()
  @ApiResponse({ type: PageType(ShelterDto), isArray: true })
  async getShelters(@Query() body: FindAllSheltersDto): Promise<Page<ShelterDto>> {
    const page = await this.sheltersService.getShelters({
      latitude: body.latitude,
      longitude: body.longitude,
      search: body.search,
      page: body.page,
      perPage: body.perPage,
    });
    return {
      items: page.items.map((item) => ShelterDto.fromModel(item)),
      total: page.total,
    };
  }
}
