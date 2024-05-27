import { InferAttributes, Sequelize } from 'sequelize';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'water_levels', timestamps: false })
export class WaterLevel extends Model<InferAttributes<WaterLevel>, Partial<InferAttributes<WaterLevel>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  waterLevelId!: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  city!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  value!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  date!: Date;
}
