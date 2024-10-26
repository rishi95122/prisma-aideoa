import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addQuery = async (req, res) => {
  const { name, mobile, email, companyName, workingArea, query } = req.body;
  console.log(req.body);
  try {
    const queryForm = await prisma.query.create({
      data: {
        name,
        mobile,
        email,
        companyName,
        workingArea,
        query,
      },
    });
    return res
      .status(200)
      .json({ message: "Query submitted successfully", data: queryForm });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ message: "Failed to submit the form", error: error.message });
  }
};

export const getAllQuery = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const skip = (page - 1) * limit; // Calculate the offset

    // Fetch paginated queries
    const queries = await prisma.query.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
    });

    // Get the total count of queries to calculate total pages
    const totalQueries = await prisma.query.count();
    const totalPages = Math.ceil(totalQueries / limit);

    res.status(200).json({
      queries,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalQueries,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to retrieve query",
      error: error.message,
    });
  }
};


export const deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedForm = await prisma.query.delete({
      where: { id },
    });
    res
      .status(200)
      .json({ message: "Query deleted successfully", data: deletedForm });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Query not found" });
    }
    res
      .status(400)
      .json({ message: "Failed to delete the Query", error: error.message });
  }
};
