import sequelize from '../config/database';
import Organization from './Organization';
import Client from './Client';
import OrganizationClient from './OrganizationClient';
import SOW from './SOW';
import SOWPaymentPlan from './SOWPaymentPlan';
import SOWPaymentPlanItem from './SOWPaymentPlanItem';
import Invoice from './Invoice';
import InvoiceLineItem from './InvoiceLineItem';
import Payment from './Payment';

Organization.belongsToMany(Client, { through: OrganizationClient, foreignKey: 'organizationId' });
Client.belongsToMany(Organization, { through: OrganizationClient, foreignKey: 'clientId' });

SOW.belongsTo(Client, { foreignKey: 'customerId' });
SOWPaymentPlan.belongsTo(SOW, { foreignKey: 'sowId' });
SOWPaymentPlanItem.belongsTo(SOWPaymentPlan, { foreignKey: 'sowPaymentPlanId' });

Invoice.belongsTo(SOW, { foreignKey: 'sowId' });
Invoice.hasMany(InvoiceLineItem, { foreignKey: 'invoiceId' });

Payment.belongsTo(Invoice, { foreignKey: 'invoiceId' });

const models = {
  Organization,
  Client,
  OrganizationClient,
  SOW,
  SOWPaymentPlan,
  SOWPaymentPlanItem,
  Invoice,
  InvoiceLineItem,
  Payment,
};

export { sequelize };
export default models;
