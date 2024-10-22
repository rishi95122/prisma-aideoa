import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMissions = async (req, res) => {
  try {
    const missions = await prisma.mission.findMany();
    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving missions", error });
  }
};

export const addMission = async (req, res) => {
  const { title: mission } = req.body;
  console.log(mission);

  try {
    const newMission = await prisma.mission.create({
      data: { mission },
    });
    res.status(200).json({ message: "Mission Added", newMission });
  } catch (error) {
    res.status(500).json({ message: "Error creating mission", error });
  }
};

export const updateMission = async (req, res) => {
  const mission  = req.body;
  console.log(mission,req.params)
  try {
    const updatedMission = await prisma.mission.update({
      where: { id: parseInt(req.params.id) },
      data: { mission:mission.title },
    });
    console.log(updatedMission)
   return res.status(200).json({ message: "Mission updated" });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Mission not found" });
    } else {
      res.status(500).json({ message: "Error updating mission", error });
    }
  }
};

export const deleteMission = async (req, res) => {
  console.log(req.params.id )
  try {
    const deletedMission = await prisma.mission.delete({
      where: { id: parseInt(req.params.id) },
    });
    console.log(deletedMission)
   return res.status(200).json({ message: "Mission deleted", deletedMission });
  } catch (error) {
    console.log(error);
    if (error.code === "P2025") {
    return res.status(404).json({ message: "Mission not found" });
    } else {
     return res.status(500).json({ message: "Error deleting mission", error });
    }
  }
};
