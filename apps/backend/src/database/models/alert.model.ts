import { InferAttributes, Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'alerts' })
export class Alert extends Model<InferAttributes<Alert>, Partial<InferAttributes<Alert>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  alertId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  title!: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  city?: string | null;

  @Column({ type: DataType.TEXT, allowNull: false })
  body!: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  imageUrl!: string;

  @CreatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  updatedAt!: Date;
}
