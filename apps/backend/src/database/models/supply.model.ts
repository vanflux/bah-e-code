import { InferAttributes, Sequelize } from 'sequelize';
import { BelongsTo, BelongsToMany, Column, CreatedAt, DataType, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { SupplyCategory } from './supply-category.model';
import { Shelter } from './shelter.model';
import { ShelterSupply } from './shelter-supply.model';

@Table({ tableName: 'supplies' })
export class Supply extends Model<InferAttributes<Supply>, Partial<InferAttributes<Supply>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  supplyId!: string;

  @ForeignKey(() => SupplyCategory)
  @Column({ type: DataType.UUID, allowNull: false })
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

  @BelongsTo(() => SupplyCategory)
  supplyCategory?: SupplyCategory;

  @BelongsToMany(() => Shelter, () => ShelterSupply)
  shelterSupplies?: Array<Shelter & { ShelterSupply: ShelterSupply }>;
}
