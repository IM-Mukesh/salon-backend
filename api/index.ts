// for vercel deployment

// import express, { Request, Response, NextFunction } from "express";
// import cors from "cors";
// import { apiRoutes } from "../routes";
// import { connectDatabase } from "../config/database";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();

// app.use(cors({ origin: "*", credentials: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/api", apiRoutes);

// app.get("/", (req: Request, res: Response) => {
//   res.status(200).send("✅ Salon Backend API running via Vercel");
// });

// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error("❌ Server Error:", err.message);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// export default async function handler(req: any, res: any) {
//   await connectDatabase();
//   return app(req, res);
// }

//dev -server

import dotenv from "dotenv";
dotenv.config();

import { connectDatabase } from "../config/database";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { apiRoutes } from "../routes";
import http from "http";
import { config } from "../config/env";

const app = express();

app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("✅ Salon Backend API running locally");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("❌ Server Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

const server = http.createServer(app);

const startServer = async (): Promise<void> => {
  try {
    await connectDatabase();
    server.listen(config.PORT, () => {
      console.log(
        `🚀 Server running on port ${config.PORT} in ${config.NODE_ENV} mode`
      );
      console.log(`📚 Salon Backend API`);
      console.log(
        `🔗 Health check: http://localhost:${config.PORT}/api/health`
      );
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
