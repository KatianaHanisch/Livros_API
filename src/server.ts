import express from "express";
import dotenv from "dotenv";

import { authRouter } from "./routes/auth";
import { apiRouter } from "./routes/api";
import { errorMiddleware } from "./middlewares/error-middleware";

const app = express();
dotenv.config();

app.use(express.json());

app.use("/auth", authRouter);
app.use("/api", apiRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);
