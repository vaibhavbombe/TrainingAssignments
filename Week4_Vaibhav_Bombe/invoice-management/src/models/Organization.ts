import sequelize from '../config/database';
import Organization from './Organization';
import Client from './Client';
import SOW from './SOW';
import SOWPaymentPlan from './SOWPaymentPlan';
import SOWPaymentPlanItem from './SOWPaymentPlanItem';
import Invoice from './Invoice';
import InvoiceLineItem from './InvoiceLineItem';
import Payment from './Payment';
import { dbDebug } from '../config/debugger';

Organization.hasMany(Client, { foreignKey: 'organizationId' });
Client.belongsTo(Organization, { foreignKey: 'organizationId' });

SOW.belongsTo(Client, { foreignKey: 'customerId' });
SOWPaymentPlan.belongsTo(SOW, { foreignKey: 'sowId' });
SOWPaymentPlanItem.belongsTo(SOWPaymentPlan, { foreignKey: 'sowPaymentPlanId' });

Invoice.belongsTo(SOW, { foreignKey: 'sowId' });
Invoice.hasMany(InvoiceLineItem, { foreignKey: 'invoiceId' });

Payment.belongsTo(Invoice, { foreignKey: 'invoiceId' });

const models = {
  Organization,
  Client,
  SOW,
  SOWPaymentPlan,
  SOWPaymentPlanItem,
  Invoice,
  InvoiceLineItem,
  Payment,
};

export { sequelize };
export default models;
