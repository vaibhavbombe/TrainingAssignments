import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT';
import { getReviews, addReview, deleteReview } from '../controllers/reviewController';

const router = express.Router();

router.get('/books/:bookId/reviews', getReviews);
router.post('/books/:bookId/reviews', authenticateJWT, addReview);
router.delete('/reviews/:id', authenticateJWT, deleteReview);

export default router;
