import express from "express";
import {
  createTransferPair,
  getAllTransferPairs,
} from "../controllers/transferPairs.js";

const router = express.Router();

router.post("/", createTransferPair);

router.get("/", getAllTransferPairs);

export default router;
