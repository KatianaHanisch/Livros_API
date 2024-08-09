import { Response, Request, NextFunction, ErrorRequestHandler } from "express";
import { HttpError } from "../errors/HttpError";

interface ErrorRequest extends ErrorRequestHandler {
  message: string;
}
export const errorMiddleware = (
  error: ErrorRequest,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error) {
    if (error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  } else {
    next();
  }
};
