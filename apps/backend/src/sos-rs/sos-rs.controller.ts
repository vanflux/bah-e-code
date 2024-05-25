import { Controller, Get, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SosRsService } from './sos-rs.service';

@ApiTags('sos-rs')
@Controller('/sos-rs')
export class SosRsController {
  constructor(private sosRsService: SosRsService) {}

  @Get('/sync')
  @Version('1')
  async sync() {
    return this.sosRsService.sync();
  }
}
