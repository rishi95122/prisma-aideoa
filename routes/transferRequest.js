import express from "express";
import {
  addTransferRequest,
  getAllTransferRequests,
  getTransferRequestById,
} from "../controllers/transferRequest.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/", getAllTransferRequests);

router.get("/getrequestbyme",protectRoute, getTransferRequestById);

router.post("/",protectRoute, addTransferRequest);

export default router;
