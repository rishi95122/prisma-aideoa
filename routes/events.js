import express from "express";
import {
  addEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/events.js";
const router = express.Router();

router.post("/add", addEvent);

router.get("/", getAllEvents);

router.put("/update/:id", updateEvent);

router.delete("/delete/:id", deleteEvent);

export default router;
