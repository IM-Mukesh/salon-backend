import type { Response, NextFunction } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";

export const protect = asyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const authHeader =
      req.headers.authorization || req.headers.get?.("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
    };

    const user = await User.findById(decoded.userId); // ✅ Corrected

    if (!user) return res.status(401).json({ error: "User not found" });

    req.user = user;
    next();
  }
);
