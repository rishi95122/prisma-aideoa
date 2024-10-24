import { Router } from "express";
import { addDonation, getDonations } from "../controllers/donation.js";

const router = Router();

router.post("/", addDonation);

router.get("/", getDonations);

export default router;
