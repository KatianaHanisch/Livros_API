// src/types.d.ts ou @types/types.d.ts

import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}
