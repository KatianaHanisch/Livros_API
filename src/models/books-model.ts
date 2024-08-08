import { v4 as uuidv4 } from "uuid";

interface BookProps {
  id: string;
  name: string;
  author: string;
  quantityAvailable: number;
}

let books = [
  {
    id: "1",
    name: "Dom Casmurro",
    author: "Machado de Assis",
    quantityAvailable: 5,
  },
  {
    id: "2",
    name: "Nevernight",
    author: "Jay Kristoff",
    quantityAvailable: 5,
  },
];

const getAllBooks = () => books;

const getBookById = (id: string) => books.find((book) => book.id === id);

const createBook = (
  name: string,
  author: string,
  quantityAvailable: number
) => {
  const bookAlredyExists = books.find((book) => book.name === name);

  if (bookAlredyExists) return null;

  const newBook = {
    id: uuidv4(),
    name,
    author,
    quantityAvailable,
  };

  books.push(newBook);

  return newBook;
};
const updateBook = (id: string, updateBook: BookProps) => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) throw new Error("Book not found");

  books[bookIndex] = { ...books[bookIndex], ...updateBook };

  return books[bookIndex];
};

const deleteBook = (id: string) => {
  const bookIndex = books.findIndex((book) => book.id === id);

  if (bookIndex === -1) throw new Error("Book not found");

  const deletedBook = books[bookIndex];

  books = books.filter((book) => book.id !== id);

  return deletedBook;
};

export const booksModel = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
