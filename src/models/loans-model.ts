import { HttpError } from "../errors/HttpError";
import { v4 as uuidv4 } from "uuid";
import { booksModel } from "./books-model";

interface BookProps {
  id: string;
  title: string;
  author: string;
  quantityAvailable: number;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface LoanProps {
  id: string;
  userId: string;
  bookId: string;
  loanDate: Date;
  returnDate: Date | null;
  isReturned: boolean;
  isLate: boolean;
}

const loans: LoanProps[] = [
  {
    id: "1",
    userId: "1",
    bookId: "1",
    loanDate: new Date("2024-01-01"),
    returnDate: null,
    isReturned: false,
    isLate: false,
  },
];

const allLoans = () => loans;

const getLoanById = (id: string) => loans.find((loan) => loan.id === id);

const createLoan = (user: UserProps, book: BookProps) => {
  if (!user || !book)
    throw new HttpError(400, "userId and bookId are required");

  if (book.quantityAvailable < 1)
    throw new HttpError(400, "Book not available");

  const today = new Date();
  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + 14);

  const newLoan = {
    id: uuidv4(),
    userId: user.id,
    bookId: book.id,
    loanDate: today,
    returnDate,
    isReturned: false,
    isLate: false,
  };

  loans.push(newLoan);

  booksModel.takeBook(book.id);

  return newLoan;
};

const returnLoan = (id: string) => {
  const loanIndex = loans.findIndex((loan) => loan.id === id);

  if (loanIndex === -1) throw new HttpError(404, "Loan not found");

  const loan = loans[loanIndex];

  if (loan.isReturned) return null;

  loan.isReturned = true;

  const today = new Date();
  const limitDate = new Date(loan.returnDate!);

  loan.isLate = today > limitDate;
  loan.returnDate = today;

  const book = booksModel.returnBook(loan.bookId);

  return book;
};

export const loansModel = {
  allLoans,
  getLoanById,
  createLoan,
  returnLoan,
};
