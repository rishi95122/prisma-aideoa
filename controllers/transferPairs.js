import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const createTransferPair = async (req, res) => {
  const { user1Id, user2Id, transferRequestId, transferDate, status } =
  req.body;
  try {
    const requestExist= await prisma.transferPair.findFirst({
      where:{transferRequestId}
    })
    if(requestExist)
    {   console.log("alreadry ") 
      return res.status(400).json({error:"Request already added"});}
  
    const newTransferPair = await prisma.transferPair.create({
      data: {
        user1Id,
        user2Id,
        transferRequestId,
    
        status,
      },
    });
console.log("request added")
   return  res.status(200).json({message:"Request Submitted"});
  } catch (error) {
    console.error("Error creating transfer pair:", error);
    return res.status(400).json({ error: "Failed to create transfer pair" });
  }
};
export const approveRequest = async (req, res) => {
  const { id } =
  req.body;
  try {
    const requestExist= await prisma.transferPair.findFirst({
      where:{id}
    })
    if(!requestExist)
    {   
      return res.status(400).json({error:"No request exists"});}
      if(requestExist.status==="completed")
        {   
          return res.status(400).json({error:"Request already approved"});}
    const newTransferPair = await prisma.transferPair.update({
     where:{id},
     data:{
      status:"completed"
     }
    });
console.log("request Approved",newTransferPair)
   return  res.status(200).json({message:"Request Approved"});
  } catch (error) {
    console.error("Error creating transfer pair:", error);
    return res.status(400).json({ error: "Failed to create transfer pair" });
  }
};
export const getAllTransferPairs = async (req, res) => {
  const {status}=req.query
  console.log(status)
  try {
    const transferPairs = await prisma.transferPair.findMany({
      where:{
        status:status
      },
      include: {
        user1: {
          select: {
            password: false,
            id:true,
            fullName:true,
            email:true
          },
        },
        user2: {
          select: {
            password: false,
            id:true,
            fullName:true,
            email:true
          },
        },
        transferRequest: true,
      },
    });
    
console.log(transferPairs)
    res.status(200).json(transferPairs);
  } catch (error) {
    console.error("Error fetching transfer pairs:", error);
    res.status(500).json({ error: "Failed to fetch transfer pairs" });
  }
};
