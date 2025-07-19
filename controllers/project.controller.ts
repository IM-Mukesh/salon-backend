import { Request, Response } from "express";
import Project from "../models/Project";

// Create a project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { title, description, thumbnail, images, href, techStack } = req.body;
    const project = await Project.create({
      title,
      description,
      thumbnail,
      images,
      href,
      techStack,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
};

// Get all projects
export const getAllProjects = async (_: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({ createdAt: 1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch project" });
  }
};
