import { Request, Response } from 'express';
import Payment from '../models/Payment';
import Invoice from '../models/Invoice';
import sequelize from '../config/database';
import { appDebug, dbDebug } from '../config/debugger';

export const makePayment = async (req: Request, res: Response): Promise<void> => {
  const transaction = await sequelize.transaction();
  try {
    const { paymentDate, forExAmount, currency, indianAmount, invoiceId, isFullPayment, bankPaymentDetails } = req.body;

    if (!paymentDate || !invoiceId || isFullPayment === undefined) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    const payment = await Payment.create(
      {
        paymentDate,
        forExAmount,
        currency,
        indianAmount,
        invoiceId,
        isFullPayment,
        bankPaymentDetails,
      },
      { transaction }
    );

    const invoice = await Invoice.findByPk(invoiceId, { transaction });
    if (!invoice) {
      res.status(404).json({ success: false, error: 'Invoice not found' });
      await transaction.rollback();
      return;
    }

    if (isFullPayment) {
      await invoice.update({ status: 'Paid' }, { transaction });
    } else {
      const remainingAmount = invoice.totalInvoiceValue - indianAmount;
      await invoice.update({ status: remainingAmount > 0 ? 'Partial' : 'Paid' }, { transaction });
    }

    await transaction.commit();
    res.status(201).json({ success: true, data: payment });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getPayments = async (req: Request, res: Response): Promise<void> => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({ success: true, data: payments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
