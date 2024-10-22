import express from "express";
import {
  getAllStudents,
  addStudent,
  deleteStudent,
  updateStudentStatus,
} from "../controllers/studentIdCard.js";

const router = express();

router.get("/", getAllStudents);
router.post("/", addStudent);
router.delete("/:id", deleteStudent);
router.put("/approve", updateStudentStatus);

export default router;
