import { InferAttributes, Sequelize } from 'sequelize';
import { BelongsTo, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Shelter } from './shelter.model';
import { Supply } from './supply.model';

@Table({ tableName: 'shelters_supplies' })
export class ShelterSupply extends Model<InferAttributes<ShelterSupply>, Partial<InferAttributes<ShelterSupply>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  shelterSupplyId!: string;

  @ForeignKey(() => Shelter)
  @Column({ type: DataType.UUID, allowNull: false })
  shelterId!: string;

  @ForeignKey(() => Supply)
  @Column({ type: DataType.UUID, allowNull: false })
  supplyId!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  priority!: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  quantity?: number | null;

  @CreatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  updatedAt!: Date;

  @BelongsTo(() => Shelter)
  shelter?: Shelter;

  @BelongsTo(() => Supply)
  supply?: Supply;
}
