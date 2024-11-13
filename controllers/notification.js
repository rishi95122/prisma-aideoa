import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEmails = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const skip = (page - 1) * limit; 
    const emails = await prisma.notification.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
    });
    const totalEmails = await prisma.notification.count();
    const totalPages = Math.ceil(totalEmails / limit);
    res.status(200).json({
      emails,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalEmails,
      },
    });
  } catch (error) {
    console.error("Error fetching emails:", error);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
};


export const addEmail = async (req, res) => {
  const {mail} = req.body;
  console.log(mail)
  try {
    const newEmail = await prisma.notification.create({
      data: { address:mail },
    });
   return res.status(200).json(newEmail);
  } catch (error) {
   if(error.code==='P2002')
    return  res.status(500).json({ error: "Mail already submitted" });
   return res.status(500).json({ error: "Failed to add email" });
  }
};
