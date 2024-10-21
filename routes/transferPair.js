import express from "express";
import {
  createTransferPair,
  getAllTransferPairs,
  approveRequest
} from "../controllers/transferPairs.js";

const router = express.Router();

router.post("/", createTransferPair);
router.post("/approve", approveRequest);

router.get("/", getAllTransferPairs);

export default router;
