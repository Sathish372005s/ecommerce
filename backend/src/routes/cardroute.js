import express from "express";
const router = express.Router();
import { addtocart, getCart, removeFromCart } from "../controllers/cardcontroller.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";

router.post("/add", isAuthenticated ,addtocart);
router.get("/getcart", isAuthenticated ,getCart);
router.delete("/remove/:id", isAuthenticated ,removeFromCart);

export default router;