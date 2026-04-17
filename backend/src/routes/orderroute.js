import express from "express";
const router = express.Router();
import { isAuthenticated } from "../middleware/auth.js";
import { isAdmin } from "../middleware/adminmiddleware.js";
import { createOrder, getMyOrders, getAllOrders, updateOrderStatus } from "../controllers/ordercontroller.js";

router.post("/createorder", isAuthenticated,createOrder);
router.get("/myorders", isAuthenticated, getMyOrders);

router.get("/getallorders", isAuthenticated, isAdmin, getAllOrders);
router.put("/updateorderstatus/:id", isAuthenticated, isAdmin, updateOrderStatus);

export default router;