import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEmails = async (req, res) => {
  try {
    const emails = await prisma.notification.findMany();
    res.status(200).json(emails);
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};

// POST: Add a new email
export const addEmail = async (req, res) => {
  const { address } = req.body;
  try {
    const newEmail = await prisma.notification.create({
      data: { address },
    });
    res.status(201).json(newEmail);
  } catch (error) {
    console.error("Error adding email:", error);
    res.status(500).json({ error: "Failed to add email" });
  }
};
