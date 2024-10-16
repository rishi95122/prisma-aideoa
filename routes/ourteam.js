// memberRoutes.mjs
import express from "express";
import {
  getAllMembers,
  createMember,
  updateMember,
  deleteMember,
} from "../controllers/ourteam.js";

const router = express.Router();

router.get("/", getAllMembers);

router.post("/", createMember);

router.put("/members/:id", updateMember);

router.delete("/members/:id", deleteMember);

export default router;
