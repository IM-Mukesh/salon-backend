import { Router } from "express";
import {
  createContact,
  getAllContacts,
} from "../controllers/contact.controller";

const router = Router();

router.post("/", createContact); // POST /api/contact
router.get("/", getAllContacts); // GET /api/contact

export default router;
