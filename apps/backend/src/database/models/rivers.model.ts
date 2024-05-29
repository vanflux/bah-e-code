import { InferAttributes, Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { WaterLevel } from './water-level.model';

@Table({ tableName: 'rivers', timestamps: false })
export class River extends Model<InferAttributes<River>, Partial<InferAttributes<River>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  riverId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  city!: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  severeFloodValue?: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  floodValue?: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  alertValue?: number | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  attentionValue?: number | null;

  @CreatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  updatedAt!: Date;

  @HasMany(() => WaterLevel)
  waterLevels?: WaterLevel[];
}
