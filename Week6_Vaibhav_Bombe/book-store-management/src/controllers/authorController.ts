import { Request, Response } from 'express';
import { Author, Book } from '../models';

export const getAuthors = async (req: Request, res: Response) => {
  const authors = await Author.findAll({ include: [Book] });
  res.json(authors);
};

export const getAuthorById = async (req: Request, res: Response) => {
  const author = await Author.findByPk(req.params.id, { include: [Book] });
  if (author) {
    res.json(author);
  } else {
    res.status(404).json({ error: 'Author not found' });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  if (req.user && req.user.role === 'admin') {
    const newAuthor = await Author.create(req.body);
    res.status(201).json(newAuthor);
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  if (req.user && req.user.role === 'admin') {
    const updatedAuthor = await Author.update(req.body, { where: { id: req.params.id } });
    res.json(updatedAuthor);
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  if (req.user && req.user.role === 'admin') {
    await Author.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } else {
    res.status(403).json({ error: 'Unauthorized' });
  }
};
