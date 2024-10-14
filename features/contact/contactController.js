import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new contact submission
export const createContact = async (req, res) => {
  try {
    const { name, email, contactNo, message } = req.body;
    console.log("req.body", req.body);

    // Create a new contact record
    const newContact = await prisma.contactUs.create({
      data: {
        name,
        email,
        contactNo,
        message,
      },
    });
    console.log("newContact", newContact);

    // Send response
    res.status(201).json({
      message: "Message submitted successfully!",
      contact: newContact,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// Get all contact submissions (admin use)
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contactUs.findMany();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

// Get a specific contact submission by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await prisma.contactUs.findUnique({
      where: { id: req.params.id },
    });
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact", error });
  }
};

// Delete a contact submission (optional, for admin use)
export const deleteContact = async (req, res) => {
  try {
    const contact = await prisma.contactUs.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Contact not found" });
    } else {
      res.status(500).json({ message: "Error deleting contact", error });
    }
  }
};
