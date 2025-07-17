import jwt from "jsonwebtoken";
import { config } from "../config/env";
import type { IFounderJwtPayload, ILibraryJwtPayload } from "../types";
import type ms from "ms";
const JWT_SECRET = config.JWT_SECRET || "default_jwt_secret";

/**
/**
 * Verify JWT token
 */
export const verifyToken = (
  token: string
): IFounderJwtPayload | ILibraryJwtPayload => {
  return jwt.verify(token, JWT_SECRET) as
    | IFounderJwtPayload
    | ILibraryJwtPayload;
};

export const generateSalonToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
};
