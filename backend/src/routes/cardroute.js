import express from "express";
const router = express.Router();
import { addToCart, getCart, removeFromCart } from "../controllers/cardcontroller.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";

router.post("/add", isAuthenticated() ,addToCart);
router.get("/getcart", isAuthenticated() ,getCart);
router.delete("/remove/:id", isAuthenticated() ,removeFromCart);

export default router;