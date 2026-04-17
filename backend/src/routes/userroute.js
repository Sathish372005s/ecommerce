import express from "express";
import { getProfile, updateProfile, deleteProfile,addfcmtoken } from "../controllers/usercontroller.js";
const router = express.Router();
import { isAuthenticated } from "../middleware/auth.js";

router.get("/getprofile/:id", isAuthenticated, getProfile);
router.put("/updateprofile/:id", isAuthenticated, updateProfile);
router.delete("/deleteprofile/:id", isAuthenticated, deleteProfile);
router.patch("/fcmtoken", isAuthenticated, addfcmtoken);

export default router;