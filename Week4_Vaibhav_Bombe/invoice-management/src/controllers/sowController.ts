import { Request, Response } from 'express';
import SOW from '../models/SOW';
import { appDebug, dbDebug } from '../config/debugger';

export const createSOW = async (req: Request, res: Response): Promise<void> => {
  try {
    const { invoiceEmailAddresses, customerId, customerPONumber, title, customerSONumber, validityPeriod, totalValue, currency } = req.body;

    if (!invoiceEmailAddresses || !customerId || !customerPONumber || !title || !customerSONumber || !validityPeriod || !totalValue || !currency) {
      res.status(400).json({ success: false, error: 'Missing required fields' });
      return;
    }

    const sow = await SOW.create({
      invoiceEmailAddresses,
      customerId,
      customerPONumber,
      title,
      customerSONumber,
      validityPeriod,
      totalValue,
      currency,
    });

    res.status(201).json({ success: true, data: sow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getSOWs = async (req: Request, res: Response): Promise<void> => {
  try {
    const sows = await SOW.findAll();
    res.status(200).json({ success: true, data: sows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
