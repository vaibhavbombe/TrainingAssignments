import { Request, Response } from 'express';
import Payment from '../models/Payment';

const goCardless = require('gocardless-pro');

const client = new goCardless.Client({
  access_token: process.env.GOCARDLESS_ACCESS_TOKEN,
  environment: process.env.GOCARDLESS_ENVIRONMENT,
});

export const createPayment = async (req: Request, res: Response) => {
  const { bookId, amount } = req.body;
  const userId = req.user.id;

  try {
    const payment = await client.payments.create({
      params: {
        amount,
        currency: 'USD',
        links: { mandate: process.env.GOCARDLESS_MANDATE },
      },
    });

    const newPayment = await Payment.create({
      userId,
      bookId,
      amount,
      status: payment.status,
      createdAt: new Date(),
    });

    res.status(201).json(newPayment);
  } catch (error) {
    res.status(500).json({ error: 'Payment processing failed' });
  }
};

export const getPaymentById = async (req: Request, res: Response) => {
  const payment = await Payment.findByPk(req.params.id);
  if (payment) {
    res.json(payment);
  } else {
    res.status(404).json({ error: 'Payment not found' });
  }
};
