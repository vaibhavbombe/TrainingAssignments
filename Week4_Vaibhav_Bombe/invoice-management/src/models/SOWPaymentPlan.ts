import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import SOW from './SOW';
import { dbDebug } from '../config/debugger';

class SOWPaymentPlan extends Model {
  public id!: number;
  public sowId!: number;
  public customerId!: number;
  public plannedInvoiceDate!: Date;
  public totalActualAmount!: number;
}

SOWPaymentPlan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SOW,
        key: 'id',
      },
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plannedInvoiceDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalActualAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sow_payment_plans',
  }
);

export default SOWPaymentPlan;
