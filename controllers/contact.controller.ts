import { Request, Response } from "express";
import Contact from "../models/Contact";

// POST /api/contact
export const createContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, Email, and Message are required" });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    res.status(201).json({ message: "Message received successfully" });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/contact
export const getAllContacts = async (_: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Fetch contact error:", error);
    res.status(500).json({ error: "Failed to retrieve contacts" });
  }
};
