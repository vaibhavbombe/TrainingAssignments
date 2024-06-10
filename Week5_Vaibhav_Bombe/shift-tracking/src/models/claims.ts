import { Table, Column, Model, PrimaryKey, IsUUID, ForeignKey, DataType } from 'sequelize-typescript';
import { Employee } from './employee';

@Table
export class Claim extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @Column
  key!: string;

  @Column
  value!: string;

  @ForeignKey(() => Employee)
  @Column(DataType.UUID)
  employeeId!: string;
}
