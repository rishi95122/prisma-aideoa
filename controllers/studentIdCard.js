import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
};

export const createStudent = async (req, res) => {
  const {
    name,
    collegeName,
    contactNo,
    address,
    studentPhoto,
    universityIDCard,
  } = req.body;

  try {
    const newStudent = await prisma.student.create({
      data: {
        name,
        collegeName,
        contactNo,
        address,
        studentPhoto,
        universityIDCard,
      },
    });

    res.status(200).json({ message: "IdCard Applied", newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error creating student", error });
  }
};

export const updateStudent = async (req, res) => {
  const {
    name,
    collegeName,
    contactNo,
    address,
    studentPhoto,
    universityIDCard,
    isApproved,
  } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id: req.params.id },
      data: {
        name,
        collegeName,
        contactNo,
        address,
        studentPhoto,
        universityIDCard,
        isApproved,
      },
    });

    res.status(200).json(updatedStudent);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.status(500).json({ message: "Error updating student", error });
    }
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await prisma.student.delete({
      where: { id: req.params.id },
    });
    res
      .status(200)
      .json({ message: "Student deleted successfully", deletedStudent });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Student not found" });
    } else {
      res.status(500).json({ message: "Error deleting student", error });
    }
  }
};
