import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, createProduct);
router.get("/get-all", isAuth, getAllProducts);
router.get("/get-product-by-id/:id", isAuth, getProductById);
router.delete("/delete/:id", isAuth, deleteProduct);
router.put("/update/:id", isAuth, updateProduct);

export default router;