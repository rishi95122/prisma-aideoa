// emailRoutes.mjs
import express from "express";
import { getAllEmails, addEmail } from "../controllers/notification.js";

const router = express.Router();

router.get("/", getAllEmails);

router.post("/", addEmail);

export default router;
