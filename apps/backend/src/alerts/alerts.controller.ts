import { Controller, Get, NotFoundException, Param, Version } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AlertsService } from './alerts.service';
import { AlertDto } from './dtos/alert.dto';
import { BasicAlertDto } from './dtos/basic-alert.dto';
import { Auth, Authenticated } from 'src/auth/auth.decorator';
import { AuthDto } from 'src/auth/auth.dto';

@ApiTags('alerts')
@Controller('/alerts')
export class AlertsController {
  constructor(private alertsService: AlertsService) {}

  @Get(':id')
  @Version('1')
  @ApiResponse({ type: AlertDto })
  async getById(@Param('id') id: string) {
    const alert = await this.alertsService.getById(id);
    if (!alert) throw new NotFoundException('Alert not found');
    return AlertDto.fromModel(alert);
  }

  @Get()
  @Version('1')
  @Authenticated()
  @ApiResponse({ type: AlertDto, isArray: true })
  async findAll(@Auth() auth: AuthDto) {
    const alerts = await this.alertsService.findAll({
      userId: auth?.userId,
    });
    return alerts.map(BasicAlertDto.fromModel);
  }
}
