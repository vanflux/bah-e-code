import { Controller, Post, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DevService } from './dev.service';

@ApiTags('dev')
@Controller('/dev')
export class DevController {
  constructor(private devService: DevService) {}

  @Post('drop-schema')
  @ApiOperation({
    description: 'Drop db schema',
  })
  @Version('1')
  async dropSchema() {
    return this.devService.dropSchema();
  }

  @Post('/create-schema')
  @ApiOperation({
    description: 'Create db schema',
  })
  @Version('1')
  async createSchema() {
    return this.devService.createSchema();
  }

  @Post('/migrate')
  @ApiOperation({
    description: 'Migrate db',
  })
  @Version('1')
  async migrate() {
    return this.devService.migrate();
  }

  @Post('/seed-test-data')
  @ApiOperation({
    description: 'Migrate db',
  })
  @Version('1')
  async seedTestData() {
    return this.devService.seedTestData();
  }

  @Post('/prepare-for-tests')
  @ApiOperation({
    description: 'Prepare DB and everything for running automated tests',
  })
  @Version('1')
  async prepareForTests() {
    return this.devService.prepareForTests();
  }
}
