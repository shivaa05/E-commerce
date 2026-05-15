import express from "express";
import {
  getOrderById,
  myOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/order.controller.js";
import {isAuth} from "../middleware/isAuth.js";
const router = express.Router();

router.post("/place-order",isAuth, placeOrder);
router.get("/one/:id", isAuth, getOrderById);
router.get("/my-orders", isAuth, myOrders);
router.post("/update-status/:id", isAuth, updateOrderStatus);

export default router;
