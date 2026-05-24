import express from "express";
const router = express.Router();
import { razorpayWebhook } from "../controllers/paymentcontroller.js";

router.post("/webhook", razorpayWebhook);

export default router;
