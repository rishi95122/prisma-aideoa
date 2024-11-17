import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10
    const skip = (page - 1) * limit;

    const videos = await prisma.video.findMany({
      skip: parseInt(skip), // Skip items for pagination
      take: parseInt(limit), // Limit number of items
    });

    const totalVideos = await prisma.video.count(); // Total number of videos

    res.status(200).json({
      videos,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalVideos / limit),
      totalVideos,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
};

export const createVideo = async (req, res) => {

  const { title, link } = req.body;
  try {
    const newVideo = await prisma.video.create({
      data: { title, link }
    });
    res.status(200).json({message:"Video Added"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create video' });
  }
};

export const updateVideo = async (req, res) => {
  const { id } = req.params;
  const { title, link } = req.body;
  try {
    const updatedVideo = await prisma.video.update({
      where: { id: parseInt(id) },
      data: { title, link }
    });
    res.json(updatedVideo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update video' });
  }
};

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.video.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
};
