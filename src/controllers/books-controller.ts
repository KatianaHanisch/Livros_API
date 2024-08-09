import { Request, Response } from "express";
import { booksModel } from "../models/books-model";

interface BookProps {
  id?: string;
  title: string;
  author: string;
  quantityAvailable: number;
}

const getAllBooks = (req: Request, res: Response) => {
  const books = booksModel.getAllBooks();
  res.status(200).json(books);
};

const getBookById = (req: Request, res: Response) => {
  const { id } = req.params;

  const book = booksModel.getBookById(id);

  res.status(200).json(book);
};

const createBook = (req: Request, res: Response) => {
  const { title, author, quantityAvailable } = req.body;

  if (
    typeof title !== "string" ||
    typeof author !== "string" ||
    typeof quantityAvailable !== "number"
  ) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const book = booksModel.createBook(title, author, quantityAvailable);

  if (!book) {
    return res.status(400).json({ message: "Book already exists" });
  }

  res.status(201).json(book);
};

const updateBook = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, quantityAvailable } = req.body;

  const fieldsToUpdate: BookProps = {
    title,
    author,
    quantityAvailable,
  };

  if (title) fieldsToUpdate.title = title;
  if (author) fieldsToUpdate.author = author;
  if (quantityAvailable) fieldsToUpdate.quantityAvailable = quantityAvailable;

  const updatedBook = booksModel.updateBook(id, fieldsToUpdate);

  return res.status(200).json(updatedBook);
};

const deleteBook = (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedBook = booksModel.deleteBook(id);

  return res.status(200).json(deletedBook);
};
export const booksController = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
