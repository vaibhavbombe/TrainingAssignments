import { Request, Response } from 'express';
import Invoice from '../models/Invoice';
import InvoiceLineItem from '../models/InvoiceLineItem';
import SOWPaymentPlan from '../models/SOWPaymentPlan';
import SOWPaymentPlanItem from '../models/SOWPaymentPlanItem';
import { Op } from 'sequelize';
import { appDebug, dbDebug } from '../config/debugger';

export const generateInvoiceForSOW = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sowPaymentPlanId } = req.body;

    if (!sowPaymentPlanId) {
      res.status(400).json({ success: false, error: 'Missing required field: sowPaymentPlanId' });
      return;
    }

    const paymentPlan = await SOWPaymentPlan.findOne({
      where: { id: sowPaymentPlanId },
      include: [SOWPaymentPlanItem]
    });

    if (!paymentPlan) {
      res.status(404).json({ success: false, error: 'SOW Payment Plan not found' });
      return;
    }

    const invoiceData = {
      totalInvoiceValue: paymentPlan.totalActualAmount,
      sowId: paymentPlan.sowId,
      status: 'Generated',
      sowPaymentPlanId: paymentPlan.id,
      customerId: paymentPlan.customerId,
      invoiceSentOn: new Date(),
      paymentReceivedOn: null,
      invoiceVersionNo: 1, 
      paymentId: null, 
      invoiceAmount: paymentPlan.totalActualAmount,
      invoiceTaxAmount: 0, 
    };

    const invoice = await Invoice.create(invoiceData);

    for (const item of paymentPlan.SOWPaymentPlanItems) {
      const lineItemData = {
        invoiceId: invoice.id,
        orderNo: item.orderId,
        particular: item.particular,
        rate: item.rate,
        unit: item.unit,
        total: item.total,
      };

      await InvoiceLineItem.create(lineItemData);
    }

    await paymentPlan.update({ plannedInvoiceDate: new Date() });

    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
