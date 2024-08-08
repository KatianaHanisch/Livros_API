import bcrypt from "bcrypt";
import { Request, Response } from "express";
import Jwt from "jsonwebtoken";

import { usersModel } from "../models/users-model";

const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const user = usersModel.createUser(name, email, password);

  if (!user) {
    return res.status(400).json({ message: "User already exists" });
  }

  res.status(201).json({ ...user, password: undefined });
};

const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return res.status(400).json({ message: "Invalid fields" });
  }

  const user = usersModel.getUserByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isValidPassword = bcrypt.compareSync(password, user.password);

  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const payload = {
    id: user.id,
    email: user.email,
  };

  const token = Jwt.sign(payload, process.env.JWT_KEY as string, {
    expiresIn: "1d",
  });

  res.status(200).json({ token });
};

export const authController = {
  register,
  login,
};
