import express from "express";
import {
  getAllStudents,
  addStudent,
  deleteStudent,
  updateStudentStatus,
  getIdCardById
} from "../controllers/studentIdCard.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express();

router.get("/", getAllStudents);
router.get("/:id", getIdCardById);
router.post("/",protectRoute, addStudent);
router.delete("/:id", deleteStudent);
router.put("/approve", updateStudentStatus);

export default router;
