import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVideos = async (req, res) => {
  try {
    const videos = await prisma.video.findMany();
    res.json(videos);
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
