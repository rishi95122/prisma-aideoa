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
    console.log(req.body)
    const employeeIdCard = await prisma.employeeIdCard.create({
      data: {
        name,
        userId:1,
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
    console.log(error)
    res.status(400).json({ message: error.message });
  }
};
export const getIdCardById = async (req, res) => {
  const {id}=req.params
  console.log(id)
  try {
    const employee = await prisma.employeeIdCard.findFirst({
      where:{userId:parseInt(id)}
    });
    if (!employee)
      return res.status(404).json({ message: "Employee ID card not found" });
    res.status(200).json(employee);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to retrieve Employee Id Card" });
  }
};
export const getEmployeeIdCards = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10
    const skip = (page - 1) * limit; // Calculate the offset

    // Fetch paginated employee ID cards
    const employeeIdCards = await prisma.employeeIdCard.findMany({
      skip: parseInt(skip),
      take: parseInt(limit),
      include: {
        user: true, // Include related user information
      },
    });

    // Get the total count of employee ID cards to calculate total pages
    const totalEmployeeIdCards = await prisma.employeeIdCard.count();
    const totalPages = Math.ceil(totalEmployeeIdCards / limit);

    res.status(200).json({
      employeeIdCards,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalEmployeeIdCards,
      },
    });
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
