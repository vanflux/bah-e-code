import { InferAttributes, Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, HasMany, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { ShelterSupply } from './shelter-supply.model';

@Table({ tableName: 'shelters' })
export class Shelter extends Model<InferAttributes<Shelter>, Partial<InferAttributes<Shelter>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  shelterId!: string;

  @Column({ type: DataType.UUID, allowNull: true })
  sosrsId?: string | null;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  pix?: string | null;

  @Column({ type: DataType.STRING(255), allowNull: false })
  address!: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  street?: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  streetNumber?: number | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  neighbourhood?: string | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  city?: string | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  contact?: string | null;

  @Column({ type: DataType.STRING(255), allowNull: true })
  zipCode?: string | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  capacity?: number | null;

  @Column({ type: DataType.BOOLEAN, allowNull: true })
  petFriendly!: boolean | null;

  @Column({ type: DataType.INTEGER, allowNull: true })
  shelteredPeople?: number | null;

  @Column({ type: DataType.INTEGER, allowNull: false })
  prioritySum!: number;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  verified!: boolean;

  @Column({ type: DataType.DECIMAL(8, 6), allowNull: true })
  latitude?: string | null;

  @Column({ type: DataType.DECIMAL(9, 6), allowNull: true })
  longitude?: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  actived!: boolean;

  @Column({ type: DataType.STRING(255), allowNull: false })
  category!: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  imageUrl?: string | null;

  @CreatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  updatedAt!: Date;

  @HasMany(() => ShelterSupply)
  shelterSupplies?: ShelterSupply[];
}
