import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all news with pagination
export const getAllNews = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Extract page and limit from query parameters
  const skip = (page - 1) * limit; // Calculate the number of records to skip
  const take = parseInt(limit); // Convert limit to an integer

  try {
    // Fetch the paginated news list
    const newsList = await prisma.studentNews.findMany({
      skip,
      take,
    });

    // Get the total count of news records for pagination metadata
    const totalNews = await prisma.studentNews.count();

    res.status(200).json({
      news: newsList,
      pagination: {
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(totalNews / limit),
        totalNews,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to fetch news" });
  }
};


// Create new news item
export const createNews = async (req, res) => {
  const { title, description, category } = req.body;

  try {
    const newNews = await prisma.studentNews.create({
      data: {
        title,
        description,
        category,
      },
    });
    res.status(200).json({ message: "News Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to create news" });
  }
};

// Update a news item
export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  try {
    const updatedNews = await prisma.studentNews.update({
      where: { id: Number(id) },
      data: { title, description, category },
    });
    res.status(200).json({message:"News Updated"});
  } catch (error) {
    res.status(500).json({ error: "Unable to update news" });
  }
};

// Delete a news item
export const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.studentNews.delete({
      where: { id: Number(id) },
    });
    res.status(204).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete news" });
  }
};
