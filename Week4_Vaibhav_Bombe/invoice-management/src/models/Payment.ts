import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Invoice from './Invoice';
import { dbDebug } from '../config/debugger';

class Payment extends Model {
  public id!: number;
  public paymentDate!: Date;
  public forExAmount!: number;
  public currency!: string;
  public indianAmount!: number;
  public invoiceId!: number;
  public isFullPayment!: boolean;
  public bankPaymentDetails!: string;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    forExAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    indianAmount: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    invoiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Invoice,
        key: 'id',
      },
    },
    isFullPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    bankPaymentDetails: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'payments',
  }
);

export default Payment;
