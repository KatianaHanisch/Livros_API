import { HttpError } from "../errors/HttpError";
import { v4 as uuidv4 } from "uuid";

interface BookProps {
  id?: string;
  title?: string;
  author?: string;
  quantityAvailable?: number;
}

let books = [
  {
    id: uuidv4(),
    title: "Dom Casmurro",
    author: "Machado de Assis",
    quantityAvailable: 5,
  },
  {
    id: uuidv4(),
    title: "Nevernight",
    author: "Jay Kristoff",
    quantityAvailable: 5,
  },
];

const getAllBooks = () => books;

const getBookById = (id: string) => books.find((book) => book.id === id);

const createBook = (
  title: string,
  author: string,
  quantityAvailable: number
) => {
  const bookAlredyExists = books.find((book) => book.title === title);

  if (bookAlredyExists) return null;

  const newBook = {
    id: uuidv4(),
    title,
    author,
    quantityAvailable,
  };

  books.push(newBook);

  return newBook;
};
const updateBook = (id: string | undefined, updateBook: BookProps) => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) throw new HttpError(404, "Book not found");

  const book = books[bookIndex];

  if (updateBook.title !== undefined) {
    book.title = updateBook.title;
  }

  if (updateBook.author !== undefined) {
    book.author = updateBook.author;
  }

  if (updateBook.quantityAvailable !== undefined) {
    book.quantityAvailable = updateBook.quantityAvailable;
  }

  books[bookIndex] = book;

  return book;
};

const deleteBook = (id: string) => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) throw new HttpError(404, "Book not found");

  const deletedBook = books[bookIndex];

  books = books.filter((book) => book.id !== id);

  return deletedBook;
};

const takeBook = (id: string) => {
  const book = books.find((book) => book.id === id);

  if (!book) throw new HttpError(404, "Book not found");

  book.quantityAvailable -= 1;
};

const returnBook = (id: string) => {
  const book = books.find((book) => book.id === id);

  if (!book) throw new HttpError(404, "Book not found");

  book.quantityAvailable += 1;
};

export const booksModel = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  takeBook,
  returnBook,
};
