import { InferAttributes, Sequelize } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { River } from './rivers.model';

@Table({ tableName: 'water_levels', timestamps: false })
export class WaterLevel extends Model<InferAttributes<WaterLevel>, Partial<InferAttributes<WaterLevel>>> {
  @Column({ type: DataType.UUID, primaryKey: true, defaultValue: Sequelize.fn('gen_random_uuid') })
  waterLevelId!: string;

  @ForeignKey(() => River)
  @Column({ type: DataType.UUID, allowNull: false })
  riverId!: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  value!: number;

  @Column({ type: DataType.DATE, allowNull: false })
  date!: Date;

  @BelongsTo(() => River)
  river?: River;
}
