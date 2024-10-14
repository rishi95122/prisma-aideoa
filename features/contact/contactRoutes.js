import express from "express";
import { createContact, getAllContacts, getContactById, deleteContact } from "./contactController.js";

const router = express.Router();

// Route to submit the contact form (for the front-end form submission)
router.post("/contact-us", createContact);

// Route to get all contact submissions (admin access)
router.get("/contacts", getAllContacts);

// Route to get a specific contact by ID (admin access)
router.get("/contacts/:id", getContactById);

// Route to delete a contact submission (admin access)
router.delete("/contacts/:id", deleteContact);

export default router;
