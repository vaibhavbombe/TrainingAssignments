import { Model, DataTypes } from 'sequelize';
import sequelize from '../utils/db';
import { Employee } from './employee';

export class Shift extends Model {
  public id!: string;
  public employeeId!: string;
  public startTime!: Date;
  public endTime!: Date | null;
  public actualHours!: number;

  public static calculateActualHours(startTime: Date, endTime: Date | null): number {
    if (!endTime) return 0;
    const diffMs = endTime.getTime() - startTime.getTime();
    return diffMs / (1000 * 60 * 60); 
}

Shift.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    actualHours: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Shift',
    hooks: {
      beforeSave: (shift: Shift) => {
        if (shift.endTime) {
          shift.actualHours = Shift.calculateActualHours(shift.startTime, shift.endTime);
        }
      },
    },
  }
);

export default Shift;
