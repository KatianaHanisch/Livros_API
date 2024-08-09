import { Router } from "express";

import { booksController } from "../controllers/books-controller";

export const apiRouter = Router();

apiRouter.get("/books", booksController.getAllBooks);
apiRouter.get("/books/:id", booksController.getBookById);

apiRouter.post("/books", booksController.createBook);
apiRouter.put("/books/:id", booksController.updateBook);
apiRouter.delete("/books/:id", booksController.deleteBook);
