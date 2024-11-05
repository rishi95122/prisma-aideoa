// controllers/transferRequestController.mjs

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllTransferRequests = async (req, res) => {
  try {
    const { designationType, searchTerm, searchCriteria } = req.query;
    console.log(searchCriteria)
    // Parse searchCriteria from JSON if sent as a string
  

    // Build the filter object dynamically based on received parameters
    const filter = {
      ...(designationType ? { designationType } : {}),
      ...(searchTerm ? { name: { contains: searchTerm } } : {}),
      ...(searchCriteria.from ? { currentSubsidiary: searchCriteria.from } : {}),
      ...(searchCriteria.to ? { preferredTransferSubsidiary: searchCriteria.to } : {}),
    };

    console.log("Filter:", filter);

    const requests = await prisma.transferRequest.findMany({
      where: filter,
      include: {
        user: true,
      },
    });

    return res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching transfer requests:", error);
    res.status(500).json({ error: "Failed to fetch transfer requests" });
  }
};


export const getTransferRequestById = async (req, res) => {
  const { sub:id } = req.user

  try {
    const request = await prisma.transferRequest.findMany({
      where: { userId: parseInt(id) },
    });
    console.log("request,r",request)
    if (!request) {
      return res.status(404).json({ error: "Transfer request not found" });
    }
    console.log(request)
    return res.status(200).json(request);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to fetch transfer request" });
  }
};

export const addTransferRequest = async (req, res) => {
  const {
    name,
    designation,
    aideoaid,
    mobile,
    currentarea,
    currentsubsidiary,
    currentmine,
    grade,
    transfersubsidiary,
    transfermine,
    transferarea,
    designationType,
  } = req.body;
  const {sub,userType}=req.user
  if(userType!=='employee')
    throw new Error("You are not an employee")
  try {
    const newRequest = await prisma.transferRequest.create({
      data: {
        userId: parseInt(sub),
        name,
        designation,
        designationType,
        aideoaIdNo: aideoaid,
        currentPostedArea: currentarea,
        mobileNumber: mobile,
        currentSubsidiary: currentsubsidiary,
        currentMinesName: currentmine,
        grade,
        preferredTransferSubsidiary: transfersubsidiary,
        preferredTransferMine: transfermine,
        preferredTransferArea: transferarea,
      },
    });

    res.status(200).json({ message: "Submitted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add transfer request" });
  }
};
