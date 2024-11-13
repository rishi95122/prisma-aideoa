import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMembers = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const skip = (page - 1) * limit; // Calculate the offset

    let members;
    let totalMembers;

    if (category) {
      // Fetch paginated members by category
      members = await prisma.ourTeamMember.findMany({
        where: {
          category: category,
        },
        skip: parseInt(skip),
        take: parseInt(limit),
      });
      
      // Get the total count of members in this category to calculate total pages
      totalMembers = await prisma.ourTeamMember.count({
        where: {
          category: category,
        },
      });
    } else {
      // Fetch all paginated members without category filter
      members = await prisma.ourTeamMember.findMany({
        skip: parseInt(skip),
        take: parseInt(limit),
      });

      // Get the total count of all members to calculate total pages
      totalMembers = await prisma.ourTeamMember.count();
    }

    const totalPages = Math.ceil(totalMembers / limit);

    res.status(200).json({
      members,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalMembers,
      },
    });
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Failed to fetch members" });
  }
};


export const createMember = async (req, res) => {
  const { name, category, mobileNumber, email, selfAddress, photo } = req.body;
  try {
    const newMember = await prisma.ourTeamMember.create({
      data: { name, category, mobileNumber, email, selfAddress, photo },
    });
    console.log(newMember)
    return res.status(200).json(newMember);
  } catch (error) {
    console.error("Error creating member:", error);
    res.status(500).json({ error: "Failed to create member" });
  }
};


export const updateMember = async (req, res) => {
  const { id } = req.params;
  const { name, category, mobileNumber, email, selfAddress, photo } = req.body;
  try {
    const updatedMember = await prisma.ourTeamMember.update({
      where: { id: parseInt(id) },
      data: { name, category, mobileNumber, email, selfAddress, photo },
    });
    res.status(200).json(updatedMember);
  } catch (error) {
    console.error("Error updating member:", error);
    res.status(500).json({ error: "Failed to update member" });
  }
};


export const deleteMember = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.ourTeamMember.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting member:", error);
    res.status(500).json({ error: "Failed to delete member" });
  }
};
