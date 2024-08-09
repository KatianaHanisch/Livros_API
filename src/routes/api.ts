import { Router } from "express";

import { booksController } from "../controllers/books-controller";
import { loansController } from "../controllers/loans-controller";
import { ensureAuth } from "../middlewares/auth-middleware";

export const apiRouter = Router();

apiRouter.get("/books", booksController.getAllBooks);
apiRouter.get("/books/:id", booksController.getBookById);

apiRouter.post("/books", booksController.createBook);
apiRouter.put("/books/:id", booksController.updateBook);
apiRouter.delete("/books/:id", booksController.deleteBook);

apiRouter.get("/loans", loansController.getAllLoans);
apiRouter.get("/loans/:id", loansController.getLoanById);

apiRouter.post("/loans", ensureAuth, loansController.createLoan);
apiRouter.post("/loans/:id/return", loansController.returnLoan);
