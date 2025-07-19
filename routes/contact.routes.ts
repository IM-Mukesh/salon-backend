import { Router } from "express";
import {
  createContact,
  getAllContacts,
  deleteContact,
} from "../controllers/contact.controller";

const router = Router();

router.post("/", createContact); // POST /api/contact
router.get("/", getAllContacts); // GET /api/contact
router.delete("/:id", deleteContact);
export default router;
