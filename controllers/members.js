import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMembers = async (req, res) => {
  const {userType,searchTerm,page = 1, limit = 10}=req.query
  const type= userType==='Students'?'student':userType==='All'?{}:'employee'
  
  const skip = (page - 1) * limit;
  const take = parseInt(limit);

  const filter = {
    ...(searchTerm ? { fullName: { contains: searchTerm } } : {}),
  };
 
    try {
      const users = await prisma.user.findMany({
        where:{
          userType:type,
          ...filter
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
          skip,
          take,
      });
   
      const totalUsers = await prisma.user.count({
        where: {
          userType: type,
        },
      });
  
      res.status(200).json({
        users,
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: "Failed to retrieve users" });
    }
  };