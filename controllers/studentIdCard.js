import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllStudents = async (req, res) => {
  const {searchTerm}=req.query;
  console.log(searchTerm)
  const filter = {
    ...(searchTerm ? { name: { contains: searchTerm } } : {}),
  };

  try {
    const students = await prisma.studentIdCard.findMany({
      where:filter
    });

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve students" });
  }
};
export const getIdCardById = async (req, res) => {
  const {id}=req.params
  try {
    const students = await prisma.studentIdCard.findFirst({
      where:{userId:parseInt(id)}
    });
    
    if (!students)
      return res.status(404).json({ message: "Student ID card not found" });
  
    console.log(students)
    res.status(200).json(students);
  } catch (error) {
    console.log(error)
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
    universityIDCard,
  } = req.body;

console.log(req.user)

  try {
    const exist = await prisma.studentIdCard.findUnique({
      where:{
        userId:req.user
      }
    });
    if(exist)
    {
      await prisma.studentIdCard.update({
        where:{
          userId:parseInt(req.user)
        },
        data: {
          name,
          userId:parseInt(req.user),
          collegeName,
          contactNo,
          address,
          studentPhoto,
          universityId:universityIDCard,
          status:"pending"
        },
      });
    }
    else

  await prisma.studentIdCard.create({
      data: {
        name,
        userId:parseInt(req.user),
        collegeName,
        contactNo,
        address,
        studentPhoto,
        universityId:universityIDCard,
      },
    });

    res.status(200).json({message:"Added"});
  } catch (error) {
    console.log(error)
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
  const { id,status } = req.body;
  console.log(req.body)
  try {
    const updatedStudent = await prisma.studentIdCard.update({
      where: { id: parseInt(id) },
      data: { status },
    });
    res.status(200).json({message:`Id card ${status}`});
  } catch (error) {
    res.status(500).json({ error: "Failed to update status" });
  }
};
