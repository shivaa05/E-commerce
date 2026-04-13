import express from "express";
import { addToCart, createProduct, deleteProduct, getAllProducts, getCartItems, getProductById, removeFromCart, updateProduct } from "../controllers/product.controller.js";
import { isAuth } from "../middleware/isAuth.js";

const router = express.Router();

router.post("/create", isAuth, createProduct);
router.get("/get-all", isAuth, getAllProducts);
router.get("/get-product-by-id/:id", isAuth, getProductById);
router.delete("/delete/:id", isAuth, deleteProduct);
router.put("/update/:id", isAuth, updateProduct);
router.get("/add-to-cart/:id", isAuth, addToCart);
router.get("/get-cart-items", isAuth, getCartItems);
router.get("/remove-from-cart/:id", isAuth, removeFromCart);

export default router;