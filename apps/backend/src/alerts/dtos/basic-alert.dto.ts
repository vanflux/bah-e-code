import { ApiProperty } from '@nestjs/swagger';
import { Alert } from 'src/database/models/alert.model';

export class BasicAlertDto {
  @ApiProperty()
  alertId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  imageUrl!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  static fromModel(alert: Alert): BasicAlertDto {
    return {
      alertId: alert.alertId,
      title: alert.title,
      imageUrl: alert.imageUrl,
      city: alert.city ?? undefined,
      createdAt: alert.createdAt.toISOString(),
      updatedAt: alert.updatedAt.toISOString(),
    };
  }
}
