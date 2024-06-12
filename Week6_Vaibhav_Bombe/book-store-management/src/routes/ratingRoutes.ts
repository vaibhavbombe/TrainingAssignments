import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT';
import { getRatings, addRating } from '../controllers/ratingController';

const router = express.Router();

router.get('/books/:bookId/ratings', getRatings);
router.post('/books/:bookId/ratings', authenticateJWT, addRating);

export default router;
