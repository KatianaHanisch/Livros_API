import { Router, Request, Response } from "express";
import { authController } from "../controllers/auth-controller";
import { ensureAuth } from "../middlewares/auth-middleware";

export const router = Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/test", ensureAuth, (req: Request, res: any) => {
  res.send("Hello World!");
});
