import { Router } from "express";
import {getMembers } from "../controllers/members.js";

const router = Router();

router.get("/", getMembers);


export default router;
