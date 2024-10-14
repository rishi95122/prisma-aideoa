import studentIdCardSchema from '../models/StudentIdCardSchema.js'

export const getAllStudents = async (req, res) => {
  try {
    const students = await studentIdCardSchema.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students', error });
  }
};


export const getStudentById = async (req, res) => {
  try {
    const student = await studentIdCardSchema.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student', error });
  }
};


export const createStudent = async (req, res) => {

  try {
    const newStudent = new studentIdCardSchema({
      name: req.body.name,
      collegeName: req.body.collegeName,
      contactNo: req.body.contactNo,
      address: req.body.address,
      studentPhoto: req.body.studentPhoto, 
      universityIDCard: req.body.universityIDCard, 
    });
    const savedStudent = await newStudent.save();
    res.status(200).json({message:"IdCard Applied"});
  } catch (error) {
    res.status(500).json({ message: 'Error creating student', error });
  }
};


export const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentIdCardSchema.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      collegeName: req.body.collegeName,
      contactNo: req.body.contactNo,
      address: req.body.address,
      studentPhoto: req.body.studentPhoto,
      universityIDCard: req.body.universityIDCard,
      isApproved: req.body.isApproved
    }, { new: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json({ message: 'Error updating student', error });
  }
};


export const deleteStudent = async (req, res) => {
  try {
    const deletedStudent = await studentIdCardSchema.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting student', error });
  }
};
