import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = express.Router();

router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books', authenticateJWT, createBook);
router.put('/books/:id', authenticateJWT, updateBook);
router.delete('/books/:id', authenticateJWT, deleteBook);

export default router;
