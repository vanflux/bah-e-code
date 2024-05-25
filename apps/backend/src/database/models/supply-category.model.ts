import { InferAttributes, Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'supply_categories' })
export class SupplyCategory extends Model<InferAttributes<SupplyCategory>, Partial<InferAttributes<SupplyCategory>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  supplyCategoryId!: string;

  @Column({ type: DataType.UUID, allowNull: true })
  sosrsId?: string | null;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @CreatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  updatedAt!: Date;
}
