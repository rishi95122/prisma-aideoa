import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.studentIdCard.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve students" });
  }
};

export const addStudent = async (req, res) => {
  const {
    name,
    userId,
    collegeName,
    contactNo,
    address,
    studentPhoto,
    universityId,
  } = req.body;

  try {
    const newStudent = await prisma.studentIdCard.create({
      data: {
        name,
        userId,
        collegeName,
        contactNo,
        address,
        studentPhoto,
        universityId,
      },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to add student" });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.studentIdCard.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student" });
  }
};

export const updateStudentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedStudent = await prisma.studentIdCard.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};
