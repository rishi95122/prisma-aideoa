// controllers/transferRequestController.mjs

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTransferRequests = async (req, res) => {
  try {
    const requests = await prisma.transferRequest.findMany({
      include: {
        user: true,
      },
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transfer requests" });
  }
};

export const getTransferRequestById = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await prisma.transferRequest.findUnique({
      where: { id: parseInt(id) },
    });

    if (!request) {
      return res.status(404).json({ error: "Transfer request not found" });
    }

    res.json(request);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch transfer request" });
  }
};

export const addTransferRequest = async (req, res) => {
  const {
    userId,
    name,
    designation,
    aideoaIdNo,
    mobileNumber,
    currentSubsidiary,
    currentMinesName,
    grade,
    preferredTransferSubsidiary,
    preferredTransferMine,
    preferredTransferArea,
  } = req.body;

  try {
    const newRequest = await prisma.transferRequest.create({
      data: {
        userId,
        name,
        designation,
        aideoaIdNo,
        mobileNumber,
        currentSubsidiary,
        currentMinesName,
        grade,
        preferredTransferSubsidiary,
        preferredTransferMine,
        preferredTransferArea,
      },
    });

    res.status(201).json(newRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add transfer request" });
  }
};
