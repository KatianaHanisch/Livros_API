import Jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { usersModel } from "../models/users-model";

type UserProps = {
  id: string;
  name: string;
  email: string;
  password: string;
};

interface AuthenticatedUser extends Request {
  authenticatedUser?: UserProps;
}

export const ensureAuth = (
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { id } = Jwt.verify(token, process.env.JWT_KEY as string) as {
      id: string;
    };

    const user = usersModel.getUserById(id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.authenticatedUser = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
