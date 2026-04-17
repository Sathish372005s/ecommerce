import express from "express";
const router = express.Router();
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from "../controllers/productcontroller.js";
import { isAdmin } from "../middleware/adminmiddleware.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";

router.get("/getproducts", getProducts);
router.get("/getproductbyid/:id", getProductById);

router.post("/createproduct", isAuthenticated() ,isAdmin() ,createProduct);
router.put("/updateproduct/:id", isAuthenticated() ,isAdmin() ,updateProduct);
router.delete("/deleteproduct/:id", isAuthenticated() ,isAdmin() ,deleteProduct);

export default router;