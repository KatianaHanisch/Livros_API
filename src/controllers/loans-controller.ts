import { booksModel } from "./../models/books-model";
import { Request, Response } from "express";

import { loansModel } from "../models/loans-model";
import { HttpError } from "../errors/HttpError";

type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

interface RequestAuth extends Request {
  user?: UserProps;
}

const getAllLoans = (req: Request, res: Response) => {
  const loans = loansModel.allLoans();

  return res.status(200).json(loans);
};

const getLoanById = (req: Request, res: Response) => {
  const { id } = req.params;

  const loan = loansModel.getLoanById(id);

  if (!loan) throw new HttpError(404, "Loan not found");

  return res.status(200).json(loan);
};

const createLoan = (req: RequestAuth, res: Response) => {
  const user = req.user;
  const { bookId } = req.body;

  if (typeof bookId !== "string") throw new HttpError(400, "Invalid data");

  const book = booksModel.getBookById(bookId);
  if (!book) throw new HttpError(404, "Book not found");

  const newLoan = loansModel.createLoan(user!, book);
  return res.status(201).json(newLoan);
};

const returnLoan = (req: RequestAuth, res: Response) => {
  const { id } = req.params;

  const loan = loansModel.returnLoan(id);

  res.status(200).json(loan);
};
export const loansController = {
  getAllLoans,
  getLoanById,
  createLoan,
  returnLoan,
};
