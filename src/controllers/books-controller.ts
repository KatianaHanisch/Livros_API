import { Request, Response } from "express";
import { booksModel } from "../models/books-model";

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

export const booksController = {
  getAllBooks,
  getBookById,
  createBook,
};
