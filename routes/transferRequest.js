import express from "express";
import {
  addTransferRequest,
  getAllTransferRequests,
  getTransferRequestById,
} from "../controllers/transferRequest.js";

const router = express.Router();

router.get("/", getAllTransferRequests);

router.get("/:id", getTransferRequestById);

router.post("/", addTransferRequest);

export default router;
