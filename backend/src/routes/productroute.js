import express from "express";
const router = express.Router();
import { getProducts, getProductById, createProduct ,updateProduct, deleteProduct , getproductsbycategory } from "../controllers/productcontroller.js";
import { isAdmin } from "../middleware/adminmiddleware.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
import upload from "../middleware/upload.js";

router.get("/getproducts", getProducts);
router.get("/getproductbyid/:id", getProductById);
router.get("/getproductsbycategory/:category",getproductsbycategory);


router.post("/admin/createproduct", isAuthenticated, isAdmin, upload.array("images", 5), createProduct);
router.put("/admin/updateproduct/:id", isAuthenticated, isAdmin, upload.array("images", 5), updateProduct);
router.delete("/admin/deleteproduct/:id", isAuthenticated, isAdmin, deleteProduct);

export default router;