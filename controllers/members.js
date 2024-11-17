import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMembers = async (req, res) => {
  const { userType, page = 1, limit = 10 } = req.query;
  console.log(userType);
  const type =
    userType === "Students" ? "student" : userType === "All" ? {} : "employee";
  console.log(type);

  const skip = (page - 1) * limit;
  const take = parseInt(limit);

  try {
    const users = await prisma.user.findMany({
      where: {
        userType: type,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        mobile: true,
        userType: true,
        password: false,
        createdAt: true,
      },
      skip,
      take,
    });

    // Get the total count of users matching the filter for pagination metadata
    const totalUsers = await prisma.user.count({
      where: {
        userType: type,
      },
    });

    res.status(200).json({
      users,
      pagination: {
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(totalUsers / limit),
        totalUsers,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};
