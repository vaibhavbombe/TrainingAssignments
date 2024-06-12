import express from 'express';
import authenticateJWT from '../middleware/authenticateJWT';
import { getAuthors, getAuthorById, createAuthor, updateAuthor, deleteAuthor } from '../controllers/authorController';

const router = express.Router();

router.get('/authors', getAuthors);
router.get('/authors/:id', getAuthorById);
router.post('/authors', authenticateJWT, createAuthor);
router.put('/authors/:id', authenticateJWT, updateAuthor);
router.delete('/authors/:id', authenticateJWT, deleteAuthor);

export default router;
