import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMembers = async (req, res) => {
  const {userType}=req.query
 const type= userType==='Students'?'student':'employee'
    try {
      const users = await prisma.user.findMany({
        where:{
          userType:type
        },
        select: {
            id: true,         
            email: true,   
            fullName:true,
            mobile:true,
            userType:true,
            password: false,
            createdAt:true
          },
      });
      console.log(users)
      res.status(200).json(users);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  };