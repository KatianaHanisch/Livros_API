import { Router, Request, Response } from "express";
import { authController } from "../controllers/auth-controller";

export const router = Router();

router.post("/auth/register", authController.register);

router.post("/auth/login", authController.login);
