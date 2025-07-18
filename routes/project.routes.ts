// import { Router } from "express";
// import {
//   createProject,
//   getAllProjects,
//   getProjectById,
// } from "../controllers/project.controller";

// const router = Router();

// router.post("/", createProject); // Add a new project
// router.get("/", getAllProjects); // Get all projects
// router.get("/:id", getProjectById);

// export default router;

// src/routes/project.routes.ts
import { Router } from "express";
import {
  createProject,
  getAllProjects,
  getProjectById,
} from "../controllers/project.controller";
const router = Router();

// Route to create a new project
router.post("/", createProject); // POST /api/projects

// Route to get all projects
router.get("/", getAllProjects); // GET /api/projects

// Safer route to get a project by ID
router.get("/id/:id", getProjectById); // GET /api/projects/id/:id

export default router;
