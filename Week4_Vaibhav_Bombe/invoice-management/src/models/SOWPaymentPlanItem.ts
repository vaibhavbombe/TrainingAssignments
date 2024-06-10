import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import SOWPaymentPlan from './SOWPaymentPlan';
import { dbDebug } from '../config/debugger';

class SOWPaymentPlanItem extends Model {
  public id!: number;
  public sowPaymentPlanId!: number;
  public sowId!: number;
  public orderId!: string;
  public particular!: string;
  public rate!: number;
  public unit!: number;
  public total!: number;
}

SOWPaymentPlanItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sowPaymentPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SOWPaymentPlan,
        key: 'id',
      },
    },
    sowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    particular: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'sow_payment_plan_items',
  }
);

export default SOWPaymentPlanItem;
