import { Controller, Get, NotFoundException, Param, Version } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AlertsService } from './alerts.service';
import { AlertDto } from './dtos/alert.dto';
import { BasicAlertDto } from './dtos/basic-alert.dto';

@ApiTags('alerts')
@Controller('/alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get(':id')
  @Version('1')
  async getById(@Param('id') id: string) {
    const alert = await this.alertsService.getById(id);
    if (!alert) throw new NotFoundException('Alert not found');
    return AlertDto.fromModel(alert);
  }

  @Get()
  @Version('1')
  async findAll() {
    const alerts = await this.alertsService.findAll({});
    return alerts.map(BasicAlertDto.fromModel);
  }
}
