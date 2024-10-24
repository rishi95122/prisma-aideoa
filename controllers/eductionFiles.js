import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getFiles = async (req, res) => {
  try {
    const files = await prisma.file.findMany();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch files' });
  }
};

export const createFile = async (req, res) => {
  const { name, link } = req.body;
  try {
    const newFile = await prisma.file.create({
      data: { name, link }
    });
    res.status(200).json({message:"File Added"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to create file' });
  }
};

export const updateFile = async (req, res) => {
  const { id } = req.params;
  const { name, link } = req.body;
  try {
    const updatedFile = await prisma.file.update({
      where: { id: parseInt(id) },
      data: { name, link }
    });
    res.json(updatedFile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update file' });
  }
};

export const deleteFile = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.file.delete({
      where: { id: parseInt(id) }
    });
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete file' });
  }
};
