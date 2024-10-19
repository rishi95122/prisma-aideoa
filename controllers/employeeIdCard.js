import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createEmployeeIdCard = async (req, res) => {
  try {
    const {
      name,
      userId,
      companyName,
      contactNo,
      address,
      employeePhoto,
      workingArea,
      employeeIdNo,
    } = req.body;

    const employeeIdCard = await prisma.employeeIdCard.create({
      data: {
        name,
        userId,
        companyName,
        contactNo,
        address,
        employeePhoto,
        workingArea,
        employeeIdNo,
      },
    });
    res.status(200).json({
      message: "Employee ID card created successfully",
      employeeIdCard,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeIdCards = async (req, res) => {
  try {
    const employeeIdCards = await prisma.employeeIdCard.findMany({
      include: {
        user: true,
      },
    });
    res.status(200).json(employeeIdCards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getEmployeeIdCardById = async (req, res) => {
  try {
    const employeeIdCard = await prisma.employeeIdCard.findUnique({
      where: { id: req.params.id },
      include: {
        user: true,
      },
    });
    if (!employeeIdCard)
      return res.status(404).json({ message: "Employee ID card not found" });
    res.status(200).json(employeeIdCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployeeIdCard = async (req, res) => {
  try {
    const updatedEmployeeIdCard = await prisma.employeeIdCard.update({
      where: { id: req.params.id },
      data: req.body,
    });
    res.status(200).json(updatedEmployeeIdCard);
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Employee ID card not found" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

export const deleteEmployeeIdCard = async (req, res) => {
  try {
    const deletedEmployeeIdCard = await prisma.employeeIdCard.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({
      message: "Employee ID card deleted successfully",
      deletedEmployeeIdCard,
    });
  } catch (error) {
    if (error.code === "P2025") {
      res.status(404).json({ message: "Employee ID card not found" });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};
