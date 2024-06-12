import { Request, Response } from 'express';
import Review from '../models/Review';
import Book from '../models/Book';

export const getReviews = async (req: Request, res: Response) => {
  const reviews = await Review.findAll({ where: { bookId: req.params.bookId } });
  res.json(reviews);
};

export const addReview = async (req: Request, res: Response) => {
  const { content } = req.body;
  const newReview = await Review.create({
    userId: req.user.id,
    bookId: req.params.bookId,
    content,
  });
  res.status(201).json(newReview);
};

export const deleteReview = async (req: Request, res: Response) => {
  const review = await Review.findByPk(req.params.id);
  if (review) {
    if (req.user.role === 'admin' || req.user.id === review.userId) {
      await Review.destroy({ where: { id: req.params.id } });
      res.status(204).send();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } else {
    res.status(404).json({ error: 'Review not found' });
  }
};
