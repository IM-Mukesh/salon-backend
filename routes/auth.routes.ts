// src/routes/auth.routes.ts
import { Router } from "express";
import { googleLogin } from "../controllers/auth.controller";

const router = Router();

router.post("/google", googleLogin); // POST /api/auth/google

export default router;
