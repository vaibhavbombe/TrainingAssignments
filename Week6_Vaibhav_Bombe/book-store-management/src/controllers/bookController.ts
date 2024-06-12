import { Request, Response } from 'express';
import { Book, Author, Review, Rating } from '../models';
import { fetchBookInfo } from '../services/googleBooksService';
import sequelize from '../config/database';

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll({
    include: [
      { model: Author, through: { attributes: [] } },
      { model: Review },
      { model: Rating }
    ]
  });
  res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
  const book = await Book.findByPk(req.params.id, {
    include: [
      { model: Author, through: { attributes: [] } },
      { model: Review },
      { model: Rating }
    ]
  });

  if (book) {
    const averageRating = await Rating.findAll({
      where: { bookId: book.id },
      attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'avgRating']]
    });
    res.json({ book, averageRating });
  } else {
    res.status(404).json({ error: 'Book not found' });
  }
};

export const createBook = async (req: Request, res: Response) => {
  if (req.user && req.user.role === 'admin') {
    const { externalId } = req.body;
    let googleBookInfo = null;
    if (externalId) {
      googleBookInfo = await fetchBookInfo(externalId);
    }

    const newBookData = {
      ...req.body,
      ...googleBookInfo && {
        title: googleBookInfo.title,
        description: googleBookInfo.description,
        publishedYear: googleBookInfo.publishedDate,
      }
    };

    const newBook = await Book.create(newBookData);
    if (req.body.authors) {
      await newBook.setAuthors(req.body.authors);
    }
    res.status(201).json(newBook);
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  if (req.user && req.user.role === 'admin') {
    const { externalId } = req.body;
    let googleBookInfo = null;
    if (externalId) {
      googleBookInfo = await fetchBookInfo(externalId);
    }

    const updatedBookData = {
      ...req.body,
      ...googleBookInfo && {
        title: googleBookInfo.title,
        description: googleBookInfo.description,
        publishedYear: googleBookInfo.publishedDate,
      }
    };

    const updatedBook = await Book.update(updatedBookData, { where: { id: req.params.id } });
    const book = await Book.findByPk(req.params.id);
    if (req.body.authors && book) {
      await book.setAuthors(req.body.authors);
    }
    res.json(updatedBook);
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  if (req.user && req.user.role === 'admin') {
    await Book.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};
