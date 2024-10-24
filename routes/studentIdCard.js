import express from "express";
import {
  getAllStudents,
  addStudent,
  deleteStudent,
  updateStudentStatus,
  getIdCardById
} from "../controllers/studentIdCard.js";

const router = express();

router.get("/", getAllStudents);
router.get("/:id", getIdCardById);
router.post("/", addStudent);
router.delete("/:id", deleteStudent);
router.put("/approve", updateStudentStatus);

export default router;
