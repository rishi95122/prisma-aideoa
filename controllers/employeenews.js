import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



// Get all news
export const getAllNews = async (req, res) => {
  console.log("employee")
  try {
    const newsList = await prisma.employeeNews.findMany();
    res.status(200).json(newsList);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch news' });
  }
};

// Create new news item
export const createNews = async (req, res) => {
  const { title, description, category } = req.body;

  try {
    const newNews = await prisma.employeeNews.create({
      data: {
        title,
        description,
        category,
      },
    });
    res.status(200).json({message:"News Added"});
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Unable to create news' });
  }
};

// Update a news item
export const updateNews = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;
  try {
    const updatedNews = await prisma.employeeNews.update({
      where: { id: Number(id) },
      data: { title, description, category },
    });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update news' });
  }
};

// Delete a news item
export const deleteNews = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.employeeNews.delete({
      where: { id: Number(id) },
    });
    res.status(204).json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete news' });
  }
};
