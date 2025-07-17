import { Router } from "express";
import salonsRoute from "./salons";
import reviewRoutes from "./reviews";
import authRoutes from "./auth.routes";

const router = Router();

// Health check endpoint
router.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "API is running",
    timestamp: new Date().toISOString(),
  });
});

router.use("/salons", salonsRoute);
router.use("/auth", authRoutes);

router.use("/reviews", reviewRoutes);

export { router as apiRoutes };
