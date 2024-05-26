import { InferAttributes, Sequelize } from 'sequelize';
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript';

@Table({ tableName: 'addresses' })
export class Address extends Model<InferAttributes<Address>, Partial<InferAttributes<Address>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  addressId!: string;

  @Column({ type: DataType.UUID, allowNull: false })
  userId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  name!: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  street?: string;

  @Column({ type: DataType.STRING(255), allowNull: true })
  neighbourhood?: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  city!: string;

  @Column({ type: DataType.INTEGER, allowNull: true })
  streetNumber?: string;

  @Column({ type: DataType.CHAR(11), allowNull: true })
  zipCode?: string;

  @Column({ type: DataType.DECIMAL(8, 6), allowNull: true })
  latitude?: string | null;

  @Column({ type: DataType.DECIMAL(9, 6), allowNull: true })
  longitude?: string | null;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  alertsEnabled!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  donationsEnabled!: boolean;

  @Column({ type: DataType.BOOLEAN, allowNull: false })
  volunteersEnabled!: boolean;

  @CreatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  createdAt!: Date;

  @UpdatedAt
  @Column({ allowNull: false, defaultValue: Sequelize.fn('now') })
  updatedAt!: Date;
}
