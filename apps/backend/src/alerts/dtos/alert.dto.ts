import { ApiProperty } from '@nestjs/swagger';
import { Alert } from 'src/database/models/alert.model';

export class AlertDto {
  @ApiProperty()
  alertId!: string;

  @ApiProperty()
  title!: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  body!: string;

  @ApiProperty()
  imageUrl!: string;

  @ApiProperty()
  createdAt!: string;

  @ApiProperty()
  updatedAt!: string;

  static fromModel(alert: Alert): AlertDto {
    return {
      alertId: alert.alertId,
      title: alert.title,
      body: alert.body,
      imageUrl: alert.imageUrl,
      city: alert.city ?? undefined,
      createdAt: alert.createdAt.toISOString(),
      updatedAt: alert.updatedAt.toISOString(),
    };
  }
}
