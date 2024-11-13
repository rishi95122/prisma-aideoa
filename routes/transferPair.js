import express from "express";
import {
  createTransferPair,
  getAllTransferPairs,
  approveRequest,
  getCompletedRequests
} from "../controllers/transferPairs.js";
import protectRoute from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/",protectRoute, createTransferPair);
router.post("/approve",protectRoute, approveRequest);

router.get("/", getAllTransferPairs);
router.get("/getCompletedRequests",protectRoute,getCompletedRequests);

export default router;
