import express from "express";

const router = express.Router();
import { isAuthenticated } from "../middleware/authmiddleware.js";
import { isAdmin } from "../middleware/adminmiddleware.js";
import { createOrder, getMyOrders, getAllOrders, changestatus,createCODOrder,getOrderById,cancelOrder } from "../controllers/ordercontroller.js";

router.post("/createorder", isAuthenticated,createOrder);
router.post("/createcodorder", isAuthenticated, createCODOrder);
router.get("/myorders", isAuthenticated, getMyOrders);
router.get("/order/:id", isAuthenticated, getOrderById);

router.get("/getallorders", isAuthenticated, isAdmin, getAllOrders);
router.put("/changestatus/:id", isAuthenticated, isAdmin, changestatus);
router.delete("/cancelorder/:id", isAuthenticated, cancelOrder);
export default router;