
import express from 'express';
import {
  createEmployeeIdCard,
  getEmployeeIdCards,
  getIdCardById,
  updateEmployeeIdCard,
  deleteEmployeeIdCard,
} from '../controllers/employeeIdCard.js';
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router();


router.post('/',protectRoute, createEmployeeIdCard);


router.get('/', getEmployeeIdCards);

router.get('/:id', getIdCardById);


router.put('/:id', updateEmployeeIdCard);


router.delete('/:id', deleteEmployeeIdCard);

export default router;
