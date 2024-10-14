import employeeIdCardSchema from "../models/employeeIdCard.js";



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

  
    const employeeIdCard = new employeeIdCardSchema({
      name,
      userId,
      companyName,
      contactNo,
      address,
    
      workingArea,
      employeeIdNo,
    });
    await employeeIdCard.save();
    res.status(200).json({ message: 'Employee ID card created successfully', employeeIdCard });
  } catch (error) {

    res.status(400).json({ message: error.message });
  }
};


export const getEmployeeIdCards = async (req, res) => {
  try {
    const employeeIdCards = await employeeIdCardSchema.find();
    res.status(200).json(employeeIdCards);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getEmployeeIdCardById = async (req, res) => {
  try {
    const employeeIdCard = await employeeIdCardSchema.findById(req.params.id);
    if (!employeeIdCard) return res.status(404).json({ message: 'Employee ID card not found' });
    res.status(200).json(employeeIdCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEmployeeIdCard = async (req, res) => {
  try {
    const updatedEmployeeIdCard = await employeeIdCardSchema.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEmployeeIdCard) return res.status(404).json({ message: 'Employee ID card not found' });
    res.status(200).json(updatedEmployeeIdCard);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEmployeeIdCard = async (req, res) => {
  try {
    const deletedEmployeeIdCard = await employeeIdCardSchema.findByIdAndDelete(req.params.id);
    if (!deletedEmployeeIdCard) return res.status(404).json({ message: 'Employee ID card not found' });
    res.status(200).json({ message: 'Employee ID card deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
