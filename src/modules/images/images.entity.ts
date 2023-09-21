import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class Images extends Model<Images> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image_url: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quality_control_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  work_id: number;
}
