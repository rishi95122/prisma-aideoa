import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createTransferPair = async (req, res) => {
  try {
    const { user1Id, user2Id, transferRequestId, transferDate, status } =
      req.body;

    const newTransferPair = await prisma.transferPair.create({
      data: {
        user1Id,
        user2Id,
        transferRequestId,
        transferDate: new Date(transferDate),
        status,
      },
    });

    res.status(201).json(newTransferPair);
  } catch (error) {
    console.error("Error creating transfer pair:", error);
    res.status(500).json({ error: "Failed to create transfer pair" });
  }
};

export const getAllTransferPairs = async (req, res) => {
  try {
    const transferPairs = await prisma.transferPair.findMany({
      include: {
        user1: true,
        user2: true,
        transferRequest: true,
      },
    });

    res.status(200).json(transferPairs);
  } catch (error) {
    console.error("Error fetching transfer pairs:", error);
    res.status(500).json({ error: "Failed to fetch transfer pairs" });
  }
};
