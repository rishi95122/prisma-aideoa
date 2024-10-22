import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMembers = async (req, res) => {
  try {
    
    const { category } = req.query; 
      console.log("sd",category)
    let members;

    if (category) {
    
      members = await prisma.ourTeamMember.findMany({
        where: {
          category: category,
        },
      });
    } else {
     
      members = await prisma.ourTeamMember.findMany();
    }

    res.status(200).json(members);
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
