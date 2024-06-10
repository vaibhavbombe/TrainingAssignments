import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import SOW from './SOW';
import SOWPaymentPlan from './SOWPaymentPlan';
import { dbDebug } from '../config/debugger';

class Invoice extends Model {
  public id!: number;
  public totalInvoiceValue!: number;
  public sowId!: number;
  public status!: string;
  public invoiceSentOn!: Date;
  public customerId!: number;
  public paymentReceivedOn!: Date;
  public invoiceVersionNumber!: number;
  public sowPaymentPlanId!: number;
}

Invoice.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    totalInvoiceValue: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    sowId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SOW,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    invoiceSentOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentReceivedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    invoiceVersionNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sowPaymentPlanId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SOWPaymentPlan,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'invoices',
  }
);

export default Invoice;
