import express from "express";
import { register, login, logout, sendotpoapi } from "../controllers/authcontroller.js";
const router =express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-otp", sendotpoapi);

export default router;