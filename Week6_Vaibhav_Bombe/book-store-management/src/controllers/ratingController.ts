import { Request, Response } from 'express';
import Rating from '../models/Rating';

export const getRatings = async (req: Request, res: Response) => {
  const ratings = await Rating.findAll({ where: { bookId: req.params.bookId } });
  res.json(ratings);
};

export const addRating = async (req: Request, res: Response) => {
  const { rating } = req.body;
  const newRating = await Rating.create({
    userId: req.user.id,
    bookId: req.params.bookId,
    rating,
  });
  res.status(201).json(newRating);
};
