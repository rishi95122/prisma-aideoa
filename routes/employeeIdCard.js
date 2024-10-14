
import express from 'express';
import {
  createEmployeeIdCard,
  getEmployeeIdCards,
  getEmployeeIdCardById,
  updateEmployeeIdCard,
  deleteEmployeeIdCard,
} from '../controllers/employeeIdCard.js';

const router = express.Router();


router.post('/', createEmployeeIdCard);


router.get('/', getEmployeeIdCards);

router.get('/:id', getEmployeeIdCardById);


router.put('/:id', updateEmployeeIdCard);


router.delete('/:id', deleteEmployeeIdCard);

export default router;
