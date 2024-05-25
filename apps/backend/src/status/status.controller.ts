import { Controller, Get, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { StatusService } from './status.service';

@ApiTags('status')
@Controller('/status')
export class StatusController {
  constructor(private statusService: StatusService) {}

  @Get('/db')
  @Version('1')
  @ApiOperation({ description: 'Get database status' })
  async dbStatus() {
    const status = await this.statusService.dbStatus();
    return status ? 'OK' : 'ERROR';
  }
}
