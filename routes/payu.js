import express from "express";
import { payu } from "../controllers/payu.js";

const router = express.Router();

router.post("/", payu);
router.post("/success", (req, res) => {
  res.send("Payment Success!");
});

router.post("/failure", (req, res) => {
  res.send("Payment Failed!");
});

export default router;
