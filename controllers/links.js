import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addSocialMediaLink = async (req, res) => {
  console.log(req.body);
  try {
    const { title, url } = req.body;
    const newLink = await prisma.socialMediaLink.create({
      data: {
        title,
        url,
      },
    });
    res
      .status(200)
      .json({ message: "Social media link added successfully", data: newLink });
  } catch (error) {
    res.status(500).json({ error: "Failed to add social media link" });
  }
};

export const getAllSocialMediaLinks = async (req, res) => {
  try {
    const links = await prisma.socialMediaLink.findMany();
    res.status(200).json(links);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve social media links" });
  }
};

export const updateSocialMediaLink = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const updatedLink = await prisma.socialMediaLink.update({
      where: { id },
      data: { title, url },
    });

    res
      .status(200)
      .json({
        message: "Social media link updated successfully",
        data: updatedLink,
      });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Social media link not found" });
    } else {
      res.status(500).json({ error: "Failed to update social media link" });
    }
  }
};

export const deleteSocialMediaLink = async (req, res) => {
  try {
    const { id } = req.params;
   
    const deletedLink = await prisma.socialMediaLink.delete({
      where: { id:parseInt(id) },
    });

    res.status(200).json({ message: "Social media link deleted successfully" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ error: "Social media link not found" });
    } else {
      res.status(500).json({ error: "Failed to delete social media link" });
    }
  }
};
